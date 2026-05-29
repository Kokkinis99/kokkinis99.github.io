# George Kokkinis
**Frontend Engineer**

hello@kokkin.is · kokkin.is · github.com/Kokkinis99 · Athens, Greece

---

## Summary

Frontend Engineer with 5+ years building production UIs where technical depth and design craft meet. I design and build things end-to-end, from Figma to deployment. My stack is Angular at the current edge of the framework (signals, control flow, standalone components) and the reactive model maps cleanly to any modern framework. I build things that feel good to use.

---

## Experience

### Covve - Frontend Engineer
*Athens, Greece · 2021 – Present*

Covve is the leading AI-powered business card scanning and CRM app, available on iOS and Android. As the sole frontend engineer on a cross-functional team, I own all UI implementation on the mobile app, and both design and implementation on the admin web portal.

**Mobile app: Ionic/Angular**

- **Rebranding (2026):** Led the complete migration of the color and typography system, updating every component, modal, and screen for a full product rebrand
- **Dark mode system:** Designed and implemented a full dark mode layer using CSS custom properties, creating a design token architecture spanning the entire application across every screen and component
- **eCard (digital business card):** Migrated Covve's digital business card product from another app, adapting the data model, reactive form architecture, UI, and animations, including "Set as Primary" functionality and cross-device sync
- **Onboarding & paywalls:** Ran UX research and led implementation of onboarding flows, upgrade screens, limited-time offer modals, and paywall logic. Research directly informed decisions that improved conversions
- **Performance:** Replaced Lottie animations with hand-crafted SVG animations for finer control over timing and visual quality

**Admin web portal: Angular 19 (2026)**

- **Designed in Figma, built zero to production as sole engineer:** Two product surfaces, full CI/CD via GitHub Actions → Docker → Azure Kubernetes Service, Sentry with release tracking and structured log forwarding.
- **Data-table primitive:** Core lead management surface built on TanStack Table v8, full-text search with inline highlights, CSV export with dynamic custom-field columns, column visibility, drag-to-reorder, and skeleton loading states.
- **UI & animation library:** Built a reusable component and animation library on top of ng-primitives, later extracted into my open-source toast library, Kodon.
- **Design system:** HSL neutral scale with light/dark mode and OKLCH upgrade via `@supports`.
- **Performance pass:** OnPush change detection across the board, async animation bootstrap, parallel save pipelines.

*Stack: Angular 19 · Ionic · TanStack Table · ng-primitives · Firebase · RxJS · Jest · Playwright · Sentry*

---

## Projects

### MoodTune
[moodtune.kokkin.is](https://moodtune.kokkin.is)

*Personal Project, Full-Stack Mobile App · Figma · Angular 18 · Firebase · Spotify API*

A mood diary that generates personalised Spotify playlists based on your emotional state. Designed end-to-end in Figma before implementation.

- **Full OAuth integration:** Implemented Spotify PKCE authentication flow with token refresh and deep link callback
- **Mood-adaptive theming:** App-wide theme system (happy/sad/calm/angry) with radial gradients, CSS variables, and dynamic app icons that update per mood
- **Spotify playlist generation:** Three recommendation modes (familiar/default/experimental) using mood-weighted audio features from the Reccobeats API, parsed and forwarded to Spotify to create personalised playlists
- **Achievement system:** 50+ achievements across rarity tiers, tracked with incremental counters for performance, no full-scan queries
- **Calendar & streaks:** Interactive mood calendar with streak tracking, broken-streak modals, and consecutive mood-week celebrations. Broken streak animation [featured in Josh Comeau's Whimsical Animations newsletter](https://www.joshwcomeau.com/email/wham-launch-009-student-showcase/)
- **Statistics dashboard:** Mood frequency charts, emotional personality insights, and artist suggestion breakdowns
- **Firebase backend:** Firestore with month-scoped partitioning, Cloud Functions for Spotify token exchange, Storage for entry images

*Stack: Angular 18 · Ionic · Capacitor · Firebase · Firestore · Cloud Functions · Spotify API · TypeScript · SCSS*

### Kodon
[kodon.kokkin.is](https://kodon.kokkin.is)

*Open Source, Angular Component Library*

Sonner-inspired toast notification system for Angular, built on ng-primitives. Endorsed by the ng-primitives author. Composable, animation-first, fully accessible.

### Portfolio · kokkin.is
*Angular 19 · TypeScript · SCSS*

A design engineering showcase built on Angular signals with a custom spring-physics animation system, interactive hover-to-expand components, live data integrations, dark/light mode, full keyboard accessibility and reduced-motion support.

---

## Skills

**Frontend**
Angular · TypeScript · Ionic · RxJS · Firebase · JavaScript · HTML · SCSS

**Design & UI**
Figma · Design systems · CSS animations · OKLCH · Dark mode · Accessibility · Responsive UI

**Testing & Platform**
Jest · Playwright · GitHub Actions · Docker · Capacitor · Sentry

---

## Education

**BSc, Informatics**
National and Kapodistrian University of Athens · Department of Informatics

---

## Continuous Learning

| Course | Provider | Status |
|---|---|---|
| Whimsical Animations | Josh Comeau | Completed, work featured in launch newsletter |
| InterfaceCraft | Josh Puckett | Completed, Founding Member |
| Animations on the Web | Emil Kowalski | Completed |
| CSS for JavaScript Developers | Josh Comeau | In Progress |
