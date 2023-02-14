# AutoCAR Platform

Welcome to the central monorepo for the AutoCAR Platform. This is a real-time collaboration web-based platform that allows CAR T-Cell therapy researchers to analyse, predict and present insights.

## Tech Stack

- Frontend: NextJS
- Data Model: TypeScript
- Backend Services:
  - User Authentication: Auth0 (external), User Worker (Cloudflare Workers)
  - Rooms: Rooms Worker (Cloudflare Workers) -> rooms are collaborative spaces for users in AutoCAR
  - Seurat Analytics: Plumber R Backend Application

## Todo List

- Room Creation -> immediately go into new room, editable title, ease of adding new people in
- Room -> get rid of the pinch and zoom, figure out how we can make the analysis pane dynamic in zoom/position etc
- Annotations -> movable, editable, deletable, attributable, time traceable
- Builds -> try remix and see if it works for deployment (I guess we can just do this in a branch)
