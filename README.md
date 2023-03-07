# AutoCAR Platform

Welcome to the central monorepo for the AutoCAR Platform. This is a real-time collaboration web-based platform that allows CAR T-Cell therapy researchers to analyse, predict and present insights.

## Tech Stack

- Frontend: Remix
- Data Model: TypeScript
- Backend Services:
  - User Authentication: Auth0 (external), User Worker (Cloudflare Workers)
  - Team: Team Worker (Cloudflare Workers) -> teams are groups of users in AutoCAR that contain data collections and labs
  - Lab: Lab Worker (Cloudflare Workers) -> labs are collaborative spaces for users in AutoCAR
  - Analysis: Analysis Worker (Cloudflare Workers) -> data collection and dataset management, and data analysis. This talks to the Seurat Analytics server (where the information is stored)
  - Seurat Analytics: Plumber R Backend Application

## Todo List

- Team
  ~~- Create new team~~
  ~~- Add member to team~~
- Lab
  ~~- Create new lab~~
  ~~- Get labs for team~~
- Analysis
  ~~- Create dataset collection (CF)~~
  ~~- Get dataset collections for team (CF)~~
  ~~- Modify upload dataset endpoint parameter (CF)~~
  ~~- Create dataset collection (R)~~
  ~~- Modify upload dataset endpoint parameter (R)~~
  - Get QC image from thresholds (CF)
  - Get QC image from thresholds (R)
  - Modify UMAP endpoint to use QC thresholds (CF)
  - Modify UMAP endpoint to use QC thresholds (R)

<!-- - Annotations -> movable, editable, deletable, attributable, time traceable -->
