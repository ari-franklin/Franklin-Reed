type PreferenceStorage = Pick<Storage, "getItem" | "setItem">;
const key = "fr-signup-v1";
const dismissalDuration = 30 * 24 * 60 * 60 * 1000;

export function canShowSignup(storage: PreferenceStorage, now = Date.now()) {
  try {
    const saved: unknown = JSON.parse(storage.getItem(key) ?? "null");
    if (!saved || typeof saved !== "object") return true;
    if ("subscribed" in saved && saved.subscribed === true) return false;
    if (!("dismissedAt" in saved)) return true;
    const timestamp = saved.dismissedAt;
    return (
      typeof timestamp !== "number" ||
      !Number.isFinite(timestamp) ||
      timestamp < 0 ||
      timestamp > now ||
      now - timestamp >= dismissalDuration
    );
  } catch {
    return true;
  }
}

export function dismissSignup(storage: PreferenceStorage, now = Date.now()) {
  try {
    storage.setItem(key, JSON.stringify({ dismissedAt: now }));
  } catch {
    /* Preferences are best effort when browser storage is blocked. */
  }
}

export function markSubscribed(storage: PreferenceStorage) {
  try {
    storage.setItem(key, JSON.stringify({ subscribed: true }));
  } catch {
    /* A storage failure must not affect a confirmed signup. */
  }
}
