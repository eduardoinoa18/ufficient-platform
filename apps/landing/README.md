# Ufficient V1 (Single Next.js App)

A single Next.js app hosting the Landing, User PWA (onboarding + dashboard), Admin portal, and API routes with Prisma/Postgres.

## Features
- Landing: `/`
- Onboarding: `/start`
- User dashboard (protected): `/app/dashboard`
- Admin: `/admin/login` and `/admin` (protected)
- APIs: onboarding, auth, admin, contact, track
- Auth: JWT in HTTP-only cookie (bcrypt)
- DB: Prisma + Postgres
- PWA: next-pwa enabled

## Local Dev
1. Install deps
   - `npm install`
2. Start Postgres (Docker optional)
   - `docker-compose up -d`
3. Prisma
   - `npx prisma generate`
   - `npx prisma migrate dev --name init`
4. Run
   - `npm run dev`

## Env Vars (.env)
- `DATABASE_URL` (postgres connection string)
- `JWT_SECRET` (long random string)
- `NEXT_PUBLIC_SITE_NAME` (optional)

## Vercel Deploy
- Create a new project from this repo
- Set env vars in Vercel project settings
- Use hosted Postgres (Neon/Supabase)
- Postinstall runs `prisma generate`
- Run `npx prisma migrate deploy` once against the hosted DB

## Notes
- To make a user an admin: `npx prisma studio` → User → set `isAdmin = true`
- Logout: POST `/api/auth/logout`
