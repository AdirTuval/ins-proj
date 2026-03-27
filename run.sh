#!/usr/bin/env bash
set -e

echo ""
echo "╔══════════════════════════════════════╗"
echo "║    ביטוח חיים — Lead Gen App         ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ── Python virtual environment (for future tooling) ──────────────────────────
if ! [ -d ".venv" ]; then
  echo "▶ Creating Python virtual environment..."
  python3 -m venv .venv
  echo "✓ Virtual environment created at .venv/"
else
  echo "✓ Python virtual environment already exists"
fi

source .venv/bin/activate

# ── Node.js dependencies ──────────────────────────────────────────────────────
echo ""
echo "▶ Installing Node.js dependencies..."
npm install
echo "✓ Dependencies installed"

# ── Start Vite dev server ─────────────────────────────────────────────────────
echo ""
echo "▶ Starting Vite dev server..."
echo "  → Open http://localhost:5173 in your browser"
echo ""

npm run dev
