# GreenSnap AI — Web Admin Portal

> Web-based administration portal for **GreenSnap AI** — monitor incoming waste reports, manage field workers & supervisors, and provide downloads and links for the citizen mobile apps.  
> Live demo (deployed on Vercel) and source repository available. :contentReference[oaicite:1]{index=1}

---

## Table of Contents

- [About](#about)  
- [Quick Links](#quick-links)  
- [Key Features](#key-features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Environment (`.env`) — Template](#environment-env---template)  
- [Local Setup](#local-setup)  
- [Deploy (Vercel)](#deploy-vercel)  
- [Admin Guide](#admin-guide)  
  - [Monitoring Reports](#monitoring-reports)  
  - [Manage Workers & Supervisors](#manage-workers--supervisors)  
  - [Manage Users](#manage-users)  
  - [Download Mobile App / APKs](#download-mobile-app--apks)  
- [API & Endpoints (summary)](#api--endpoints-summary)  
- [Troubleshooting](#troubleshooting)  
- [Contributing](#contributing)  
- [License](#license)

---

## About

This web admin portal is the central control panel for the GreenSnap AI ecosystem. Administrators can view and filter incoming geo-tagged waste reports, assign tasks to workers, track supervisor activity and status, and export data. The backend uses a mobile-optimized inference model (MobileNetV3 Large) to validate images server-side; this portal consumes backend APIs for all operations. :contentReference[oaicite:2]{index=2}

---

## Quick Links

- Repository: `https://github.com/Muhammad5Ali/GS_Web_App`. :contentReference[oaicite:3]{index=3}  
- Live deployment (example): `web-admin-greensnap-zag8.vercel.app` (linked from repo). :contentReference[oaicite:4]{index=4}  
- Mobile frontend repo (citizen app): `https://github.com/MohammadAli-14/GreenSnap-Yolo-frontend` (or your mobile repo/releases). *(Replace if your mobile repo is at a different URL.)*

---

## Key Features

- Dashboard with map & summary cards (total reports, pending, resolved).  
- Real-time / polling feed of new reports with image preview, GPS, timestamp, and inferred label/confidence.  
- Report lifecycle management: assign → in-progress → resolved.  
- Worker & Supervisor CRUD (create, edit role, suspend/reactivate).  
- User management: block/unblock, view contributions, export activity logs.  
- Role-based access control (Admin / Supervisor / Worker / Viewer).  
- CSV / JSON export for reports & users.  
- Audit logs and basic activity timeline.  
- Download links to citizen mobile app (APK / App Store / Play Store links) and QR codes for easy installation.

---

## Tech Stack

- React (CRA or Vite) + React Router  
- Ant Design / Material UI (or custom UI library)  
- Leaflet / Mapbox or Google Maps (for visualising geo-tagged reports)  
- Axios for API requests  
- JWT-based authentication / session management  
- Node/Express or proxy backend (API consumed from production backend)  
- Deployments: Vercel (frontend) — see repo for the current live link. :contentReference[oaicite:5]{index=5}

---

## Prerequisites

- Node.js 16+ (recommended)  
- npm or yarn  
- An account with the backend (Admin credentials) or local backend running and reachable.  
- If using Maps: API key for Mapbox or Google Maps.

---

## Environment (`.env`) — Template

Create a `.env` file in the project root (do **not** commit this file):



REACT\_APP\_API\_BASE=[https://api.greensnap.example.com](https://api.greensnap.example.com)
REACT\_APP\_MAPBOX\_KEY=your\_mapbox\_key\_here
REACT\_APP\_SENTRY\_DSN=
REACT\_APP\_VERCEL\_ENV=production

````

Notes:
- Use `REACT_APP_` prefix (or the convention your build system expects) for client-side variables.
- Never store private keys in the client; keep anything secret server-side.

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
````

Open `http://localhost:3000` (or port shown in console) and sign in with your admin credentials.

---

## Deploy (Vercel)

This project is set up for Vercel. To deploy:

1. Connect the GitHub repository to Vercel (Import Project).
2. Set required environment variables inside Vercel Dashboard (same keys as `.env` but via the UI).
3. Choose the correct build command (e.g., `npm run build`) and output directory (`build` for CRA, `dist` for Vite).
4. Deploy — your site will be available at `<your-project>.vercel.app`. The repository root contains a link to the current demo. ([GitHub][1])

---

## Admin Guide

### Monitoring Reports

* Dashboard shows quick counts and a timeline of newest reports.
* Use filters: status (pending/in-progress/resolved), date range, label/confidence threshold, city/area, assigned worker.
* Click a report to view details: full image, location (open in map), uploaded EXIF/time, backend inference results (label + confidence from MobileNetV3 Large), and action buttons (Assign → Mark In-Progress → Resolve).

### Manage Workers & Supervisors

* Create new worker accounts (email, phone, assigned zone).
* Assign supervisors to regions or specific workers.
* Reassign tasks or re-route pending reports.
* Track worker status and recent activity logs.

### Manage Users

* View user profiles and submission history.
* Block/unblock abusive accounts.
* Export user activity for audit (CSV/JSON).


## Troubleshooting

* 403 / 401: verify admin credentials and that the backend's CORS policy allows this frontend origin.
* Map tiles not loading: verify `REACT_APP_MAPBOX_KEY` or Google Maps API key and allowed referrers.
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



[1]: https://github.com/Muhammad5Ali/GS_Web_App "GitHub - Muhammad5Ali/GS_Web_App: Green-Snap AI || Smart Waste & Intelligent Management System Main Eco-System Website"
