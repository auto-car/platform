# AutoCAR Platform

Welcome to the central monorepo for the AutoCAR Platform. This is a real-time collaboration web-based platform that allows CAR T-Cell therapy researchers to analyse, predict and present insights.

## Tech Stack

- Frontend: NextJS
- Data Model: TypeScript
- Backend Services:
  - User Authentication: Auth0 (external), User Worker (Cloudflare Workers)
  - Rooms: Rooms Worker (Cloudflare Workers) -> rooms are collaborative spaces for users in AutoCAR
  - Seurat Analytics: Plumber R Backend Application
