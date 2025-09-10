# GreenSnap AI — Web Admin Portal

> Web-based administration portal for **GreenSnap AI** — monitor incoming waste reports, manage field workers & supervisors, and provide downloads and links for the citizen mobile apps.

---

## Table of Contents

* [About](#about)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Local Setup](#local-setup)
* [Deploy (Vercel)](#deploy-vercel)
* [Admin Guide](#admin-guide)

  * [Monitoring Reports](#monitoring-reports)
  * [Manage Workers & Supervisors](#manage-workers--supervisors)
  * [Manage Users](#manage-users)
  * [Download Mobile App / APKs](#download-mobile-app--apks)
* [API & Endpoints (summary)](#api--endpoints-summary)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)

---

## About

This web admin portal is the central control panel for the GreenSnap AI ecosystem. Administrators can view and filter incoming geo-tagged waste reports, assign tasks to workers, track supervisor activity and status, and export data. The backend uses a mobile-optimized inference model (**MobileNetV3 Large**) to validate images server-side; this portal consumes backend APIs for all operations.

---

## Key Features

* Dashboard with map & summary cards (total reports, pending, resolved).
* Real-time / polling feed of new reports with image preview, GPS, timestamp, and inferred label/confidence.
* Report lifecycle management: assign → in-progress → resolved.
* Worker & Supervisor CRUD (create, edit role, suspend/reactivate).
* User management: block/unblock, view contributions, export activity logs.
* Role-based access control (Admin / Supervisor / Worker / Viewer).
* CSV / JSON export for reports & users.
* Audit logs and basic activity timeline.
* Download links to citizen mobile app (APK / App Store / Play Store links) and QR codes for easy installation.

---

## Tech Stack

* React (CRA or Vite) + React Router
* Ant Design / Material UI (or custom UI library)
* **Leaflet.js + OpenStreetMap (OSM) / other open-source map tiles** for visualising geo-tagged reports

  * Example tile URL: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
  * IMPORTANT: follow tile provider usage policy and include proper attribution in the UI (`© OpenStreetMap contributors`).
* Axios for API requests
* JWT-based authentication / session management
* Node/Express or proxy backend (API consumed from production backend)
* Deployments: Vercel (frontend)

---

## Prerequisites

* Node.js 16+ (recommended)
* npm or yarn
* An account with the backend (Admin credentials) or local backend running and reachable.
* If using maps: none required for OSM tiles, but if you use a third-party tile provider (OpenMapTiles, Stadia, MapTiler Cloud, etc.) follow their signup and quota rules.

---

## Local Setup

```bash
# 1. Clone
git clone https://github.com/Muhammad5Ali/GS_Web_App.git
cd GS_Web_App

# 2. Install
npm install
# or
yarn install

# 3. Create .env from template above

# 4. Run dev server
npm start
# or
yarn start
```

Open `http://localhost:3000` (or port shown in console) and sign in with your admin credentials.

---

## Deploy (Vercel)

This project is set up for Vercel. To deploy:

1. Connect the GitHub repository to Vercel (Import Project).
2. Set required environment variables inside Vercel Dashboard (same keys as `.env` but via the UI).
3. Choose the correct build command (e.g., `npm run build`) and output directory (`build` for CRA, `dist` for Vite).
4. Deploy — your site will be available at `<your-project>.vercel.app`.

---

## Admin Guide

### Monitoring Reports

* Dashboard shows quick counts and a timeline of newest reports.
* Use filters: status (pending/in-progress/resolved), date range, label/confidence threshold, city/area, assigned worker.
* Click a report to view details: full image, location (open in map), uploaded EXIF/time, backend inference results (label + confidence from MobileNetV3 Large), and action buttons (Assign → Mark In-Progress → Resolve).

**Map behaviour:**

* The portal uses Leaflet.js and the tile URL configured in `REACT_APP_OSM_TILE_URL`.
* Place proper attribution near the map (e.g. `© OpenStreetMap contributors`).
* If you expect significant traffic, replace the default tile URL with a paid provider or self-hosted tile server to avoid rate-limiting.

### Manage Workers & Supervisors

* Create new worker accounts (email, phone, assigned zone).
* Assign supervisors to regions or specific workers.
* Reassign tasks or re-route pending reports.
* Track worker status and recent activity logs.

### Manage Users

* View user profiles and submission history.
* Block/unblock abusive accounts.
* Export user activity for audit (CSV/JSON).

### Download Mobile App / APKs

* Provide links to the official citizen mobile app (Play Store / App Store) once published.
* For testing, add signed APK(s) to the mobile repo Releases or a secure object storage (S3) and link from this portal.
* Display QR codes that point to Play Store / direct APK links for convenience.

---

## API & Endpoints (summary)

> The portal communicates with the GreenSnap backend API. Update paths to match your backend.

* `GET /api/reports` — list & filter reports
* `GET /api/reports/:id` — single report details
* `POST /api/reports/:id/assign` — assign report to worker
* `POST /api/reports/:id/status` — update report status
* `GET /api/users` — list users
* `PUT /api/users/:id` — update user (block/unblock)
* `GET /api/workers` — list workers
* `POST /api/auth/login` — admin login (returns JWT)

**Auth:** attach `Authorization: Bearer <token>` to protected requests.

---

## Troubleshooting

* 403 / 401: verify admin credentials and that the backend's CORS policy allows this frontend origin.
* Map tiles not loading: verify `REACT_APP_OSM_TILE_URL` and that the tile provider allows your usage; check attribution and rate limits.
* Images not loading: check storage (S3 / object storage) permissions and URLs returned by backend.
* Realtime delays: if using polling adjust interval; if using sockets ensure socket server is reachable.

---

## Contributing

* Fork → create feature branch → open PR with clear changelog.
* Keep UI components small and covered by unit tests where practical.
* Add migrations and seed scripts if the backend expects new fields.
* **Never commit** production secret keys or `.env` files.

---

## Releases & Downloads

* Publish app releases (web & mobile) to the GitHub Releases section and include signed APKs and instructions for installation/testing.
* Add checksums (sha256) to each release asset for integrity verification.

---

## Security & Privacy

* Only show PII and precise location data to authorized roles (Admin / Supervisor).
* Mask or pseudonymize PII in exports unless legally required.
* Enforce HTTPS, secure cookies, and short-lived JWT tokens (with refresh flow).

---

## License

This project is licensed under the **MIT License** — see the `LICENSE` file in the repository root for details.

---

*Last updated: 2025-09-10*
