# ביטוח חיים — Insurance Lead-Generation Landing Page

A professional, mobile-first, Hebrew (RTL) insurance lead-generation landing page.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion · react-hook-form

---

## Prerequisites

- **Node.js** >= 18 — [nodejs.org](https://nodejs.org)
- **Python** >= 3.10 — [python.org](https://python.org)

## Run Locally

```bash
bash run.sh
```

This script will:
1. Create a Python virtual environment (`.venv/`) — reserved for future tooling
2. Install Node.js dependencies via `npm install`
3. Start the Vite dev server at **http://localhost:5173**

## Production Build

```bash
npm run build
```

Output goes to `dist/`. Serve with any static file host.

---

## Project Structure

```
src/
  components/
    steps/
      Step1BasicInfo.jsx     # Age, phone, insurance status, consent
      Step2AInsurance.jsx    # Policy file upload + health Q&A
      StepFinal.jsx          # Thank-you confirmation screen
    ui/
      Tooltip.jsx            # (?) hover/tap tooltip
      FloatingCTA.jsx        # Fixed bottom "אני רוצה שנציג יחזור אליי"
      Modal.jsx              # Confirmation modal
      ProgressBar.jsx        # Multi-step progress indicator
      FileUpload.jsx         # Drag-and-drop file upload
  App.jsx                    # Global state + step orchestration
  main.jsx                   # React entry point
  index.css                  # Tailwind + global RTL styles
index.html                   # dir="rtl" lang="he"
```

## Form Flow

```
Step 1 (Basic Info)
  ├── hasInsurance = YES → Step 2A (Policy details / Q&A)
  │                              └── Final Step
  └── hasInsurance = NO  → Final Step (direct)
```

## Form Data (Console Output)

On the Final step, the full collected data is logged to the browser console as structured JSON, ready for backend integration:

```json
{
  "age": 35,
  "phone": "050-1234567",
  "hasInsurance": true,
  "currentPayment": 200,
  "coverageAmount": 500000,
  "consent": true,
  "policyFile": { "name": "policy.pdf", "size": 102400, "type": "application/pdf" },
  "coveragePreferences": "נכות, מחלות קשות",
  "isSmoker": false,
  "healthConditions": "",
  "medicalProcess": "",
  "additionalInfo": "",
  "additionalDetails": "",
  "accuracyConsent": true
}
```

## Design System

- **Style:** Minimalism & Swiss Style (clean, functional, high contrast)
- **Colors:** Primary `#0369A1` · CTA `#F97316` · Background `#F0F9FF`
- **Font:** IBM Plex Sans (financial, trustworthy)
- **Animations:** Framer Motion — 280ms enter / 180ms exit, spring modals
