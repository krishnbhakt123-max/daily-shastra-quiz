# 🪷 Daily Shastra Quiz — Production Architecture

> Duolingo for Vedic Wisdom · Built with Next.js, Tailwind, Google Apps Script

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animation | Framer Motion |
| Backend | Google Apps Script Web App |
| Database | Google Sheets |
| Hosting | Netlify |
| Auth | Username-based (localStorage + GAS validation) |

---

## 📁 Folder Structure

```
daily-shastra-quiz/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + metadata
│   │   ├── page.tsx                # Landing page (/)
│   │   ├── dashboard/page.tsx      # User dashboard
│   │   ├── quiz/[lessonId]/page.tsx# Quiz engine
│   │   ├── leaderboard/page.tsx    # Rankings
│   │   └── profile/page.tsx        # User profile
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── XPToast.tsx
│   │   ├── quiz/
│   │   │   ├── QuizEngine.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── OptionButton.tsx
│   │   │   ├── FeedbackCard.tsx
│   │   │   └── ResultScreen.tsx
│   │   └── gamification/
│   │       ├── StreakDisplay.tsx
│   │       ├── XPBar.tsx
│   │       ├── Leaderboard.tsx
│   │       └── Confetti.tsx
│   ├── lib/
│   │   ├── api.ts                  # GAS API client
│   │   ├── questions.ts            # Static question bank
│   │   ├── xp.ts                   # XP calculation logic
│   │   └── storage.ts              # localStorage helpers
│   ├── hooks/
│   │   ├── useQuiz.ts
│   │   ├── useUser.ts
│   │   └── useLeaderboard.ts
│   └── styles/
│       └── globals.css             # Design tokens
├── scripts/
│   └── gas-backend.js              # Google Apps Script code
├── public/
│   ├── og-image.jpg
│   └── manifest.json
├── next.config.js
├── tailwind.config.ts
├── netlify.toml
└── README.md
```

---

## 🚀 Deployment Guide

### 1. Clone & Install
```bash
git clone https://github.com/yourorg/daily-shastra-quiz
cd daily-shastra-quiz
npm install
```

### 2. Google Sheets Setup

Create a Google Sheet with these tabs:

**Users** (columns A–G):
`Username | XP | Level | Badge | Streak | LastActive | TotalQuizzes`

**Questions** (columns A–I):
`LessonID | Question | OptionA | OptionB | OptionC | OptionD | CorrectAnswer | Explanation | Difficulty`

**Attempts** (columns A–F):
`Username | LessonID | Score | Accuracy | XP | Timestamp`

**Leaderboard** (columns A–E):
`Username | Rank | XP | Badge | Streak`

### 3. Deploy Google Apps Script

1. Open Google Sheets → Extensions → Apps Script
2. Paste the contents of `scripts/gas-backend.js`
3. Deploy → New Deployment → Web App
4. Set "Execute as: Me", "Who has access: Anyone"
5. Copy the deployment URL

### 4. Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/YOUR_ID/exec
NEXT_PUBLIC_APP_URL=https://dailyshastraquiz.com
```

### 5. Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=out
```

Or connect GitHub repo to Netlify for auto-deployments.

---

## 🎮 XP System

| Action | XP Reward |
|--------|-----------|
| Complete a lesson | +50 XP |
| Correct answer | +20 XP |
| Perfect score | +50 bonus XP |
| 7-day streak | +100 XP |
| 30-day streak | +500 XP |
| First quiz | +25 XP |
| Daily challenge | +75 XP |

## 🏆 Level System

| Level | Title | XP Required |
|-------|-------|-------------|
| 1 | Seeker | 0 |
| 2 | Student | 200 |
| 3 | Disciple | 500 |
| 4 | Sadhaka | 1,000 |
| 5 | Devotee | 1,800 |
| 6 | Bhakta | 3,000 |
| 7 | Scholar | 5,000 |
| 8 | Dharma Scholar | 8,000 |
| 9 | Acharya | 12,000 |
| 10 | Guru | 20,000 |

## 💎 Badge System

| Badge | Requirement |
|-------|------------|
| 🥉 Bronze Seeker | First quiz completed |
| 🥈 Silver Devotee | 7-day streak |
| 🥇 Gold Scholar | 30-day streak OR 5,000 XP |
| 💎 Diamond Guru | 100-day streak OR 20,000 XP |
| 🔥 On Fire | 5 perfect scores |
| 🕉 Atma Jnani | All modules completed |
