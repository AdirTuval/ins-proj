# CLAUDE.md — Insurance Lead-Gen Landing Page

## Commands
- `bash run.sh` — install deps + start dev server (http://localhost:5173)
- `npm run dev` — start dev server directly (after `npm install`)
- `npm run build` — production build to `dist/`

## Stack
React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion 11 · react-hook-form 7
No backend — form data logged to browser console as JSON on final step.

## Architecture
- `src/App.jsx` — owns all state: `formData`, `currentStep`, `modalOpen`
- Steps are dumb components: receive `initialData` + `onNext(data)` prop, call `onNext` to advance
- `goNext()` in App merges step data into `formData`, then routes: Step1→step2a (hasInsurance=true) or final; Step2A→final
- `AnimatePresence mode="wait"` wraps step rendering; each step uses `key=` prop for enter/exit

## Step Flow
```
step1 → hasInsurance=true  → step2a → final
step1 → hasInsurance=false → final
```

## formData Shape
```js
{ age, phone, hasInsurance, currentPayment, coverageAmount, consent,
  policyFile, coveragePreferences, isSmoker, healthConditions,
  medicalProcess, additionalInfo, additionalDetails, accuracyConsent }
```
`policyFile` is a browser `File` object — serialize before JSON.stringify (see StepFinal.jsx).

## Tailwind Color Tokens
Defined in `tailwind.config.js` under `theme.extend.colors`:
- `primary` / `primary-hover` — #0369A1 / #0284C7 (buttons, links)
- `accent` / `accent-hover` — #F97316 / #EA580C (floating CTA, submit)
- `foreground` — #0C4A6E (primary text)
- `muted` — #64748B (helper text, labels)
- `ins_border` — #BAE6FD (input borders, card borders) ⚠️ named `ins_border` not `border` to avoid collision with Tailwind's border-width utility
- `destructive` — #DC2626 (errors)
- `background` — #F0F9FF (page bg)

## RTL Conventions
- `dir="rtl"` on `<html>` in index.html; body has `direction: rtl` in index.css
- ₪ symbol is positioned with `absolute left-3` (visual left = LTR left = after the number in RTL)
- Arrow on "המשך" buttons uses `←` (left arrow = forward in Hebrew reading direction)
- Tooltip popover uses `bottom-full right-0` to anchor above the `?` icon
- `page-scroll-padding` class in index.css adds `padding-bottom: 90px` to clear the floating CTA

## Animation Patterns
- Step transitions: `initial={{ opacity:0, x:40 }}` enter from right, `exit={{ x:-40 }}` exit to left
- Enter: 280ms `ease [0,0,0.2,1]` (ease-out); Exit: 180ms `ease [0.4,0,1,1]` (ease-in) — exit faster
- Conditional field expand/collapse: `motion.div` with `height: 0→auto` + `overflow-hidden`
- Modal: spring `stiffness:300 damping:25`, scale 0.92→1
- Checkmark in StepFinal: `motion.path` with `pathLength 0→1`

## Form Validation
- react-hook-form `mode: 'onBlur'` — errors shown after field loses focus
- "המשך" button disabled by watching live values via `watch()` — `canProceed` derived each render
- Israeli phone regex: `/^05[0-9][-\s]?\d{7}$/` — accepts with/without dash or space
- Number inputs have spin buttons hidden via CSS in index.css

## Component Responsibilities
| File | Responsibility |
|---|---|
| `ui/Tooltip.jsx` | `?` button, popover anchored `bottom-full right-0` |
| `ui/FloatingCTA.jsx` | Fixed bottom bar, calls `onOpen` prop |
| `ui/Modal.jsx` | AnimatePresence fade+spring, closes on backdrop click |
| `ui/ProgressBar.jsx` | Shows 2 steps when `hasInsurance===false`, else 3 |
| `ui/FileUpload.jsx` | Drag-drop + hidden `<input type="file">`, File object passed up |
| `steps/Step2AInsurance.jsx` | When file uploaded: shows skip button that bypasses Q&A |

## Backend Integration Checklist (future)
- Replace `console.log` in `StepFinal.jsx` `useEffect` with a `fetch`/`POST`
- `policyFile` upload needs `FormData` (multipart), not JSON
- All other fields are plain JSON-serializable after converting `File` to null/metadata
