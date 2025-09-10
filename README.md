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
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)

---

## About

This web admin portal is the central control panel for the GreenSnap AI ecosystem. Administrators can view and filter incoming geo-tagged waste reports, assign tasks to workers, track supervisor activity and status, and export data. The backend uses a mobile-optimized inference model (**MobileNetV3 Large & YOLO v11 separately**) to validate images server-side; this portal consumes backend APIs for all operations.

---

## Key Features

* Dashboard with map & summary cards (total reports, pending, resolved).
* Real-time / polling feed of new reports with image preview, GPS, timestamp, and inferred label/confidence.
* Report lifecycle management: assign → in-progress → resolved.
* Worker & Supervisor CRUD (create,delete).
* Role-based access control (Admin / Supervisor /User).

---

## Tech Stack

* React (Vite) + React Router
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
* Click a report to view details: full image, location (open in map), uploaded EXIF/time, backend inference results, can permanent-resolve or reject the report based on the 10m strict location comparison between the reported location & resolved location.

**Map behaviour:**

* The portal uses Leaflet.js and the tile URL configured in `REACT_APP_OSM_TILE_URL`.
* Place proper attribution near the map (e.g. `© OpenStreetMap contributors`).
* If you expect significant traffic, replace the default tile URL with a paid provider or self-hosted tile server to avoid rate-limiting.

### Manage Workers & Supervisors

* Create new worker accounts (username, phone, assigned zone).
* Assign supervisors to specific workers.
* Assign tasks or re-route pending reports.
* Track worker attendance status.

### Manage Users

* View user profiles and submission history.

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

## Security & Privacy

* Only show PII and precise location data to authorized roles (Admin / Supervisor).
* Mask or pseudonymize PII in exports unless legally required.
* Enforce HTTPS, secure cookies, and short-lived JWT tokens (with refresh flow).

---

## License

This project is licensed under the **MIT License** — see the `LICENSE` file in the repository root for details.

---

*Last updated: 2025-09-10*
