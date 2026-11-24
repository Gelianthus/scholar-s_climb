# Scholar's Climb
Learn HTML, CSS and JavaScript. Lessons, then a progressive quiz, then the next tower unlocks.

```bash
npm install
npm run dev
```
Routes: `/` landing, `/signup`, `/login`, `/towers` (dashboard), `/tower/[slug]` (lessons + quiz).
Auth and progress are front-end only (localStorage, see `lib/auth.ts`); passwords are not stored. Replace with a real backend later.
Add or edit courses in `lib/towers.ts`.
