# Too Much Banger

The morning-after archive of Bangerlore. After the party, tech twitter exploded with unhinged opinions, FOMO, cringe, and copium. This is a satirical platform that collects the best (and worst) tweets from the chaos. Browse the wall of drama and vote on the most absurd ones. Leaderboards for Peak FOMO, Most Unhinged, and Cringe Hall of Fame.Too much banger. Zero filter.

Visit : toomuchbanger.in
 


---

## Technical Stack

- **Framework**: Next.js (App Router, React 19)
- **Styling**: Vanilla CSS (expressive typography, responsive masonry columns, wobbly tilts)
- **Database**: Supabase (PostgreSQL client integration)
- **Type Safety**: TypeScript

---

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the Supabase parameters if persistent reaction logging is required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to inspect the local server.

---

## Supabase Schema Configuration

If database integration is required, execute the database schema configuration in the Supabase SQL editor:
1. Run [schema.sql](file:///Users/gauravgupta/Developer/Obsidian/ai-brain/Areas/Lowerbasement/Projects/bangerlore/too-much-banger/supabase/schema.sql) to set up the `reactions` and `interest_submissions` tables.
2. Ensure the RPC function `increment_reaction` is declared to handle concurrent database increment transactions.

### Graceful Degradation (Offline Mode)
If Supabase variables are absent:
- **Card Reactions**: Interactive stickers run in local-only preview mode (badge counters update locally but reset on reload).
- **Submissions**: The interest form reports a localized submission note explaining that variables are unconfigured, preventing interface crashes.

---

## Project Structure

```
├── decisions/         # Architectural blueprint, audits, and checklists
├── public/            # Static image assets
├── src/
│   ├── app/           # Main page routing and API endpoints
│   ├── components/    # Reaction buttons and signup forms
│   ├── data/          # Mock database records
│   └── lib/           # Supabase client instantiation
└── supabase/          # Database migrations and tables schema
```

---

## Code Quality and Verification

Run linter, typecheck, and production Next.js build tests:
```bash
npm run typecheck
npm run lint
npm run build
```

Run layout rollback verification tests:
```bash
node decisions/rollback-and-test.mjs
```
