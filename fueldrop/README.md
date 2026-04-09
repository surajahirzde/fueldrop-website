# 🚛 FuelDrop — Doorstep Energy Delivery Website

A complete, production-grade React website for a doorstep fuel delivery company, inspired by FuelBuddy with a premium redesign.

## 🚀 Setup Instructions

### Step 1: Create a new React app
```bash
npx create-react-app fueldrop-app
cd fueldrop-app
```

### Step 2: Replace src/ folder
Delete the existing `src/` folder and replace it with the `src/` folder from this zip.

### Step 3: Replace public/index.html
Replace `public/index.html` with the one provided.

### Step 4: Install & Start
```bash
npm start
```
Your site will open at **http://localhost:3000**

---

## 📁 Project Structure

```
src/
├── App.jsx / App.css          → Main app with state-based router
├── index.js / index.css       → Entry point + global styles
├── components/
│   ├── Navbar/                → Responsive navbar with dropdowns
│   └── Footer/                → Full footer with links
└── pages/
    ├── Home/                  → Hero slider + all homepage sections
    ├── About/                 → Company story & values
    ├── Team/                  → Team members grid
    ├── Careers/               → Job listings with apply flow
    ├── Solutions/             → Overview + individual product pages
    │   ├── BuddyCan.jsx       → Buddy Can product
    │   ├── SmartTank.jsx      → Smart Tank product
    │   ├── DOT.jsx            → Diesel on Tap product
    │   └── FBVault.jsx        → FB-Vault enterprise product
    ├── Blog/                  → News & articles
    ├── Awards/                → Recognition page
    ├── Contact/               → Contact form
    └── Order/                 → Complete 6-step order flow
```

## ✨ Features

- **Homepage Hero Slider** — Auto-sliding full-screen images with CTAs
- **All Navbar Links Clickable** — Every link opens its own page
- **Complete Order Flow (6 steps)**:
  1. Select fuel type (Diesel/Petrol/LPG/CNG)
  2. Select vehicle type + quantity (min 150L, auto price calc)
  3. Full address form (state, city, pincode, mobile)
  4. Delivery date & time slot
  5. Order review
  6. Payment (COD → shows delivery person | UPI)
- **Order Confirmation** — Shows fake delivery executive details with ETA
- **Real Pricing** — Live per-litre × quantity calculation
- **Responsive** — Works on mobile, tablet, desktop
- **Premium Fonts** — Syne (headings) + DM Sans (body)

## 🎨 Design

- **Brand Colors**: Deep Dark Navy + Vibrant Green (#16a34a)
- **Fonts**: Syne (display) + DM Sans (body) from Google Fonts
- **Style**: Premium / Luxury industrial aesthetic

---
Made with ❤️ using React 18
