# IGB Landing Page Implementation Plan

> **For Claude:** Execute this plan using `/superbuild` skill.
> Each phase includes Definition of Done criteria that must pass before proceeding.

> Generated: 2026-04-26
> Status: Draft
> Author: Codex
> Last Updated: 2026-04-26

**Goal:** Build an SEO-optimized marketing site with a single polished landing page and a placeholder `About` page, visually derived from `IG Teaser.PNG`.

**Architecture:** Create a greenfield Next.js App Router site using static-first rendering, semantic content, file-based metadata, and a small reusable design system. Keep the information architecture shallow, the codebase easy to extend, and the SEO layer explicit from day one.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4, `next/font`, pnpm, Vitest, React Testing Library, Playwright.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Requirements](#requirements)
4. [Research & Best Practices](#research--best-practices)
5. [Architecture](#architecture)
6. [Implementation Phases](#implementation-phases)
7. [Testing Strategy](#testing-strategy)
8. [Assumptions & Known Unknowns](#assumptions--known-unknowns)
9. [Appendix](#appendix)

---

## Executive Summary

### One-Line Summary
Launch a minimal but production-grade brand site that turns the teaser image into a modern, crawlable, extensible web presence.

### Goals
- [ ] **Primary Goal**: Publish a strong landing page with a premium visual system based on the teaser image.
- [ ] **Secondary Goal**: Add a crawlable placeholder `About` page and metadata foundation for future expansion.
- [ ] **Success Metric**: The site passes build, lint, typecheck, tests, and exposes indexable metadata, sitemap, robots rules, and social preview assets.

### Non-Goals (Explicitly Out of Scope)
- ❌ CMS integration
- ❌ Contact form, newsletter, checkout, or authentication
- ❌ Blog, multi-locale support, analytics dashboard, or admin tooling
- ❌ Custom backend APIs beyond metadata route handlers
- ❌ Betting on unofficial AI-discovery files as a substitute for semantic HTML and structured data

### Key Decisions Made
| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| Use Next.js App Router | Best fit for SEO, metadata, static pages, image optimization, and future subpages | Astro, Remix, plain Vite |
| Use a static-first site | Fast pages, minimal operational complexity, straightforward crawling | SSR-only runtime, CMS-first architecture |
| Use teaser-led editorial design | The provided image already establishes color, tone, and typography direction | Generic SaaS layout, high-color marketing template |
| Use JSON-LD only where page-visible content supports it | Aligns with Google structured data guidance and avoids spammy markup | Over-marking every page with speculative schema |

### Phase Overview (with Poker Estimates)

| Phase | Name | Depends On | Parallel With | Estimate | Status |
|-------|------|------------|---------------|----------|--------|
| 0 | Bootstrap Site Foundation | - | - | 5 | ✅ |
| 1 | Brand System and Content Model | 0 | - | 3 | ✅ |
| 2A | Landing Page Experience | 1 | 2B, 2C | 5 | ✅ |
| 2B | SEO, Metadata, and Crawlability | 1 | 2A, 2C | 5 | ✅ |
| 2C | About Page and Shared Navigation | 1 | 2A, 2B | 3 | ✅ |
| 3 | Integration, QA, and Release Readiness | 2A, 2B, 2C | - | 5 | ⬜ |

**Total Estimate**: 26 points

**Legend**: ⬜ Not Started | 🔄 In Progress | ✅ Complete | ⏸️ Blocked | ⏭️ Skipped

**PARALLEL EXECUTION**: Phases `2A`, `2B`, and `2C` are independent after Phase 1 and should be executed in parallel if using `/superbuild`.

---

## Technology Stack

### Languages
- **Primary**: TypeScript
- **Secondary**: CSS via Tailwind utilities and global CSS tokens

### Frameworks
| Framework | Version | Purpose |
|-----------|---------|---------|
| Next.js | current stable at implementation time | App framework, routing, metadata, image optimization |
| React | bundled with Next.js stable | UI rendering |
| Tailwind CSS | current stable at implementation time | Design tokens and styling |
| Vitest | current stable at implementation time | Unit and component tests |
| Playwright | current stable at implementation time | E2E smoke tests |

### Build Tools
| Tool | Version | Purpose |
|------|---------|---------|
| pnpm | current stable at implementation time | Package manager |
| TypeScript | current stable at implementation time | Type checking |

### Quality Tools Status

| Tool Type | Status | Config File | Command |
|-----------|--------|-------------|---------|
| Linter | ❌ | N/A yet | `pnpm lint` |
| Formatter | ❌ | N/A yet | `pnpm format:check` |
| Type Checker | ❌ | N/A yet | `pnpm typecheck` |
| Test Framework | ❌ | N/A yet | `pnpm test` |

### Bootstrap Required?

- [x] **Yes** - Missing tools detected, include Phase 0: Bootstrap
- [ ] **No** - All quality tools present, skip Phase 0

### Best Practices Research Targets

Based on the selected stack, research and apply:
- Google Search Central guidance for title links, snippets, structured data, links, and image SEO
- Next.js metadata, `robots`, and `sitemap` file conventions
- Semantic HTML and accessible content patterns for marketing pages

---

## Requirements

### Original Story/Request

```text
I want to build an SEO optimized landing page. I want it to feature the IGb teaser image with matching modern design scheme. Subpages include About at the moment. Please superplan it.

Clarifications:
1. Simple landing page. Placeholder about page.
2. Out of scope: your recommendation.
3. Stack: modern, flexible tools. your recommendation.
4. Mainly just SEO optimized. Maybe agent optimized and best practice metadata.
5. Testing: best practice testing.
6. Use IG Teaser.PNG for font and color guidance.
```

**Source**: Verbal user request

### Acceptance Criteria

- [ ] **AC-1**: Home page renders a polished landing experience using the teaser image and a matching modern editorial design language.
- [ ] **AC-2**: `About` page exists, is reachable via crawlable links, and clearly indicates it is a placeholder.
- [ ] **AC-3**: Site exposes high-quality title, description, canonical, Open Graph, Twitter, robots, sitemap, and favicon metadata.
- [ ] **AC-4**: Site uses semantic headings, internal links, image alt text, and visible copy that support search understanding.
- [ ] **AC-5**: Site includes appropriate structured data only where it matches visible page content.
- [ ] **AC-6**: Site passes lint, formatting, typecheck, unit/component tests, E2E smoke test, and production build.

### Clarifications from Interview

| Question | Answer | Implication |
|----------|--------|-------------|
| What is the MVP? | Simple landing page plus placeholder `About` page | Keep scope tight and static-first |
| What is out of scope? | Recommended by planner | Exclude CMS, forms, blog, auth, analytics complexity |
| Which stack should be used? | Planner recommendation | Choose Next.js-based greenfield setup |
| Which quality target matters most? | SEO optimization and metadata best practices | Prioritize crawlability, titles, snippets, social previews, image treatment |
| What testing standard is expected? | Best-practice testing | Add lint, types, unit/component, and one E2E smoke journey |
| What drives visual style? | `IG Teaser.PNG` | Use deep black, warm champagne, editorial serif, and restrained motion |

### Constraints

- **Technical**: Greenfield repo with no existing framework or package setup
- **Performance**: Default to static rendering, optimized images, and minimal client JS
- **Security**: No user data collection in MVP; do not add unnecessary third-party scripts
- **Timeline**: Optimize for a fast first launch while preserving extension paths for future subpages

---

## Research & Best Practices

> Research conducted: 2026-04-26
> Sources:
> - Google title links: https://developers.google.com/search/docs/advanced/appearance/title-link
> - Google snippets: https://developers.google.com/search/docs/appearance/snippet
> - Google structured data intro: https://developers.google.com/search/docs/guides/intro-structured-data
> - Google structured data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
> - Google image SEO: https://developers.google.com/search/docs/appearance/google-images
> - Google crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
> - Next.js metadata: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
> - Next.js metadata files: https://nextjs.org/docs/app/api-reference/file-conventions/metadata
> - Next.js robots: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
> - Next.js sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

### Industry Standards

#### Search Metadata

**Current Recommendation (as of 2026-04-26):**
Each page should have a descriptive title, visible primary heading aligned with page purpose, useful snippet-worthy body copy, and canonical metadata. Titles should not be generic like "Home".

**Why It Applies Here:**
The first launch only has two pages, so every page must carry clear intent and avoid thin or ambiguous metadata.

**Implementation Note:**
Use route-level metadata exports with page-specific titles/descriptions and a site-wide metadata base.

#### Structured Data

**Current Recommendation (as of 2026-04-26):**
Use JSON-LD and only mark up content that is visible and representative of the page. Structured data improves understanding but does not guarantee rich results.

**Why It Applies Here:**
A new landing page benefits from organization and website signals, but speculative or misleading markup would be counterproductive.

**Implementation Note:**
Start with `Organization` and `WebSite` JSON-LD if the visible copy supports it. Add `BreadcrumbList` to the `About` page only if breadcrumb UI is rendered.

#### Image SEO

**Current Recommendation (as of 2026-04-26):**
Images should be discoverable, relevant to the landing page, meaningfully described, and placed on pages with useful surrounding content.

**Why It Applies Here:**
The teaser image is the core brand asset and likely the strongest visual search/social-share signal in v1.

**Implementation Note:**
Serve the image with optimized dimensions, descriptive alt text, stable file naming, and supporting text content around it.

### Technology-Specific Findings

#### Next.js App Router

**Key Findings**:
- File-based metadata conventions cleanly support `robots`, `sitemap`, OG images, and icons.
- Static-first App Router pages are a strong fit for low-complexity marketing sites.
- Metadata exports in server components keep SEO declarations close to each route.

**Gotchas to Avoid**:
- Do not hide core content behind client-only rendering.
- Do not rely on JavaScript-only navigation patterns that break crawlable anchor links.
- Do not create metadata that promises content not visible on the page.

### Patterns to Apply

| Pattern | Where to Use | Benefit |
|---------|--------------|---------|
| Semantic sectioning | Home and About pages | Better accessibility and search understanding |
| Shared content config | Site metadata, nav labels, future page expansion | Reduces duplication and drift |
| Design tokens in CSS variables | Colors, spacing, typography, shadows | Faster theming and image-aligned polish |
| Static asset pipeline | Teaser image, icon, OG image source | Good caching and predictable deploy behavior |

### Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | What to Do Instead |
|--------------|--------------|-------------------|
| Generic "coming soon" page with no context | Weak SEO and low information value | Add real headings, positioning copy, and internal navigation |
| Metadata stuffing | Search engines may rewrite or ignore it | Keep titles and descriptions concise and page-specific |
| Fake AI optimization via nonstandard files only | Not a substitute for crawlable, semantic HTML | Prioritize metadata, structure, and readable content |
| Overusing client components | Increases JS cost and complexity | Keep the site mostly server-rendered |

---

## Architecture

### System Context Diagram

```text
┌───────────────────────────────────────────────────────────────────┐
│                           SYSTEM CONTEXT                         │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User Browser                                                     │
│      │                                                            │
│      ▼                                                            │
│  Next.js App Router Site                                          │
│  ├── /                Landing page                                │
│  ├── /about           Placeholder about page                      │
│  ├── /robots.txt      Crawl rules                                 │
│  ├── /sitemap.xml     URL discovery                               │
│  └── metadata files   OG/Twitter/icon/canonical declarations      │
│      │                                                            │
│      ▼                                                            │
│  Static Assets                                                    │
│  ├── IG teaser image                                              │
│  ├── favicon / app icons                                          │
│  └── optional OG image derivatives                                │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

### Component Tree

```text
RootLayout
├── SiteHeader
│   ├── BrandMarkOrWordmark
│   └── PrimaryNav
├── HomePage
│   ├── HeroSection
│   │   ├── Eyebrow
│   │   ├── Headline
│   │   ├── SupportingCopy
│   │   ├── CTAGroup
│   │   └── TeaserImagePanel
│   ├── BrandPromiseSection
│   ├── PreviewSection
│   └── Footer
└── AboutPage
    ├── PageHero
    ├── PlaceholderCopy
    └── Footer
```

### Data Flow: Home Page Request

```text
1. User requests `/`
2. Next.js serves statically rendered HTML with route metadata
3. Browser loads optimized teaser image and fonts
4. Crawlers parse semantic content, anchor links, JSON-LD, robots, sitemap references
5. Social scrapers use OG/Twitter metadata and preview image
```

### Visual System Direction

- Background: near-black, approximately `#0b0b0b`
- Primary text/accent: warm champagne, approximately `#d6bd98`
- Typography: high-contrast editorial serif for headings, restrained supporting sans for utility text
- Motion: sparse fade/slide reveals only where they do not block content or SEO
- Layout mood: luxury editorial, centered hero, generous negative space, strong contrast, minimal chrome

### Proposed File/Route Shape

```text
app/
  layout.tsx
  page.tsx
  about/page.tsx
  sitemap.ts
  robots.ts
  globals.css
components/
  site-header.tsx
  footer.tsx
  home/
  about/
content/
  site.ts
public/
  images/ig-teaser.png
  icons/...
tests/
  unit/
  e2e/
```

### Refactor/Rewrite Assessment

**Confidence Level:** LOW

There is no existing app code to refactor. Proceed directly with greenfield architecture and bootstrap quality tooling first.

---

## Implementation Phases

## Phase 0: Bootstrap Site Foundation

**Estimate:** 5

**Objective:** Create the Next.js project, install quality tooling, and establish the minimum project skeleton.

**Tasks**

**Task: Scaffold the app and scripts**

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Test: `tests/unit/app-shell.test.tsx`

**Step 1: Write the failing test**
```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('app shell', () => {
  it('renders the main landmark and primary heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails (MANDATORY)**
- Command: `pnpm vitest run tests/unit/app-shell.test.tsx`
- Expected:
  ```text
  FAIL tests/unit/app-shell.test.tsx
  Error: Cannot find module '@/app/page'
  ```

**Step 3: Write minimal implementation**
- Scaffold the app with alias support and a minimal `HomePage` returning semantic `<main>` content.
- Add scripts: `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`, `format`, `format:check`.

**Step 4: Run test to verify it passes (MANDATORY)**
- Command: `pnpm vitest run tests/unit/app-shell.test.tsx`
- Expected:
  ```text
  PASS tests/unit/app-shell.test.tsx
  Test Files  1 passed
  ```

**Step 5: Stage for commit**
```bash
git add package.json tsconfig.json next.config.ts app/layout.tsx app/page.tsx app/globals.css tests/unit/app-shell.test.tsx
```

### Definition of Done
- [x] Code passes linter
- [x] Code passes formatter
- [x] Code passes type checker
- [x] All new tests pass
- [x] All existing tests pass
- [x] Test coverage >= 80% for new code
- [x] No new warnings introduced

### Quality Gate Results
| Check | Command | Result |
|-------|---------|--------|
| Lint | `pnpm lint` | ✅ exit code 0 |
| Format | `pnpm format:check` | ✅ All matched files use Prettier code style |
| Types | `pnpm typecheck` | ✅ exit code 0 |
| Tests | `pnpm test` | ✅ 1 test passed, 0 failed |
| Build | `pnpm build` | ✅ production build succeeds |

- [x] **CHECKPOINT: Run `/compact focus on: Phase 0 complete, Next.js project and quality tooling created, Phase 1 needs design tokens and content model`**

## Phase 1: Brand System and Content Model

**Estimate:** 3

**Objective:** Convert the teaser image direction into reusable tokens and centralize site copy and metadata defaults.

**Code Deltas**
- `content/site.ts (CREATE)` - site name, page copy, nav items, metadata defaults, teaser alt text
- `app/globals.css (MODIFY)` - CSS variables for color, spacing, surfaces, and typography
- `lib/seo.ts (CREATE)` - shared metadata helpers and JSON-LD serializers
- `tests/unit/site-content.test.ts (CREATE)` - validates required copy and metadata fields exist

### Definition of Done
- [x] Code passes linter
- [x] Code passes formatter
- [x] Code passes type checker
- [x] All new tests pass
- [x] All existing tests pass
- [x] Test coverage >= 80% for new code
- [x] No new warnings introduced

- [x] **CHECKPOINT: Run `/compact focus on: Phase 1 complete, brand tokens and site content config created, Phase 2A/2B/2C can proceed independently`**

## Phase 2A: Landing Page Experience

**Estimate:** 5

**Objective:** Build the premium home page UI around the teaser image and real crawlable copy.

**Code Deltas**
- `app/page.tsx (MODIFY)` - semantic home page composition
- `components/home/hero-section.tsx (CREATE)` - hero with image, headline, supporting copy, CTA links
- `components/home/brand-promise-section.tsx (CREATE)` - concise supporting section
- `components/footer.tsx (CREATE)` - shared footer with crawlable internal links
- `tests/unit/home-page.test.tsx (CREATE)` - verifies visible page content and link structure

**TDD Focus**
- Test that the page renders one `<h1>`, teaser image alt text, and crawlable links to `/about`
- Test that CTA and supporting sections render meaningful copy, not empty placeholders

### Definition of Done
- [x] Code passes linter
- [x] Code passes formatter
- [x] Code passes type checker
- [x] All new tests pass
- [x] All existing tests pass
- [x] Test coverage >= 80% for new code
- [x] No new warnings introduced

- [x] **CHECKPOINT: Run `/compact focus on: Phase 2A complete, landing page sections and teaser-driven UI built, Phase 3 will integrate with metadata and about page`**

## Phase 2B: SEO, Metadata, and Crawlability

**Estimate:** 5

**Objective:** Implement site-wide and route-level metadata, crawl rules, structured data, and social preview support.

**Tasks**

**Task: Add route metadata and crawl files**

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `tests/unit/metadata.test.ts`

**Step 1: Write the failing test**
```ts
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('metadata routes', () => {
  it('allows crawling and includes the about page in the sitemap', async () => {
    const robotsConfig = robots();
    const sitemapEntries = await sitemap();

    expect(robotsConfig.rules).toMatchObject({ userAgent: '*', allow: '/' });
    expect(sitemapEntries.some((entry) => entry.url.endsWith('/about'))).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails (MANDATORY)**
- Command: `pnpm vitest run tests/unit/metadata.test.ts`
- Expected:
  ```text
  FAIL tests/unit/metadata.test.ts
  Error: Cannot find module '@/app/robots'
  ```

**Step 3: Write minimal implementation**
- Add `metadataBase`, default title template, description, canonical handling, OG/Twitter fields, and route metadata.
- Implement `robots.ts` and `sitemap.ts`.
- Add `Organization` and `WebSite` JSON-LD only if visible content supports the declared entity and site purpose.

**Step 4: Run test to verify it passes (MANDATORY)**
- Command: `pnpm vitest run tests/unit/metadata.test.ts`
- Expected:
  ```text
  PASS tests/unit/metadata.test.ts
  Test Files  1 passed
  ```

**Step 5: Stage for commit**
```bash
git add app/layout.tsx app/robots.ts app/sitemap.ts tests/unit/metadata.test.ts
```

### Definition of Done
- [x] Code passes linter
- [x] Code passes formatter
- [x] Code passes type checker
- [x] All new tests pass
- [x] All existing tests pass
- [x] Test coverage >= 80% for new code
- [x] No new warnings introduced

- [x] **CHECKPOINT: Run `/compact focus on: Phase 2B complete, metadata routes and JSON-LD added, Phase 3 will validate rendered output and share previews`**

## Phase 2C: About Page and Shared Navigation

**Estimate:** 3

**Objective:** Add a placeholder `About` page that fits the brand and strengthens site structure.

**Code Deltas**
- `app/about/page.tsx (CREATE)` - placeholder about page with honest, indexable copy
- `components/site-header.tsx (CREATE)` - shared nav
- `tests/unit/about-page.test.tsx (CREATE)` - verifies heading, copy, and internal links

**Implementation Notes**
- The page should not be empty or a dead-end.
- Copy should acknowledge the page is early but still say what the brand/project is about in plain language.
- Navigation must use standard anchor links via Next `Link`.

### Definition of Done
- [x] Code passes linter
- [x] Code passes formatter
- [x] Code passes type checker
- [x] All new tests pass
- [x] All existing tests pass
- [x] Test coverage >= 80% for new code
- [x] No new warnings introduced

- [x] **CHECKPOINT: Run `/compact focus on: Phase 2C complete, about page and shared navigation added, Phase 3 will verify full crawlable site experience`**

## Phase 3: Integration, QA, and Release Readiness

**Estimate:** 5

**Objective:** Verify the combined site meets quality, build, and SEO baseline expectations.

**Code Deltas**
- `tests/e2e/site-smoke.spec.ts (CREATE)` - home page and about page smoke flow
- `README.md (CREATE)` - local run/test commands and deployment notes
- `public/` assets (CREATE/MODIFY) - final image placement, favicon, optional OG derivative

**Verification Scope**
- Build succeeds in production mode
- Home page and About page are linked both ways or through shared nav/footer
- Metadata is present in rendered HTML
- `robots.txt` and `sitemap.xml` respond as expected
- Lighthouse-style concerns are reviewed manually even if not automated in v1

### Definition of Done
- [ ] Code passes linter
- [ ] Code passes formatter
- [ ] Code passes type checker
- [ ] All new tests pass
- [ ] All existing tests pass
- [ ] Test coverage >= 80% for new code
- [ ] No new warnings introduced

- [ ] **CHECKPOINT: Run `/compact focus on: Phase 3 complete, landing site production-ready with metadata and tests, next work would be copy refinement or additional subpages`**

---

## Testing Strategy

### Testing Pyramid

- **Unit/Component Tests (~80%)**
  - Metadata helpers
  - Content config
  - Header/footer rendering
  - Home and About route content structure
- **Integration Tests (~15%)**
  - Metadata routes (`robots`, `sitemap`)
  - Layout metadata composition
- **E2E Tests (~5%)**
  - Load `/`
  - Navigate to `/about`
  - Confirm visible headings and links

### Required Commands

| Check | Command | Expected Output |
|-------|---------|-----------------|
| Lint | `pnpm lint` | exit code 0 |
| Format | `pnpm format:check` | exit code 0 |
| Typecheck | `pnpm typecheck` | exit code 0 |
| Unit/Component | `pnpm test` | all tests pass |
| E2E | `pnpm test:e2e` | smoke spec passes |
| Build | `pnpm build` | production build succeeds |

### Manual QA Checklist

- [ ] Home page remains readable on mobile widths
- [ ] Teaser image displays crisply and does not cause layout shift
- [ ] Headline hierarchy is sensible with a single `h1`
- [ ] Page titles and descriptions differ appropriately between `/` and `/about`
- [ ] Internal links are standard crawlable anchors
- [ ] Structured data matches visible content

---

## Assumptions & Known Unknowns

### Assumptions

- The teaser image may be reused on the site and in derived preview assets.
- Exact brand name, launch copy, and CTA wording can be placeholder content in v1.
- No data backend is needed for launch.
- Deployment target can be decided later; the plan does not depend on Vercel-specific APIs.

### Known Unknowns

- Final public domain is unknown, so canonical/metadata base will use an environment-backed site URL.
- Exact typography pairing is not fixed; implementation should choose a refined serif/sans combination that matches the teaser rather than copying an unavailable font.
- Whether a branded OG image should be generated dynamically or shipped as a static derivative can be decided during Phase 3.

---

## Appendix

### Recommended Copy Direction

- Keep the hero concise and confident.
- Avoid empty "coming soon" filler; use short brand-positioning text instead.
- Make the About page explicit that it is early while still useful.

### Conventional Commit Guidance Per Phase

```text
PHASE [X] COMPLETE - Conventional Commit Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

feat(site): [phase summary]

[Short description of what was completed]

Files changed:
- [list of created/modified files]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  DO NOT COMMIT - User will handle git operations
```
