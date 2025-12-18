<<<<<<< HEAD
# Equipment Manager (Leucine)

Simple single-page app (React + Express) to manage equipment with CRUD operations.

## How to run locally ✅

These instructions assume you have Node.js (16+) and npm installed.

1. From the project root, install dependencies (once):

   npm install

2. Start both server and client together (convenience script):

   npm start

This runs the server on http://localhost:4000 and the client (Vite) on http://localhost:5173 by default.

Alternative: run server and client separately:

**Server:**

   cd server
   npm install
   npm run dev   # or `npm start`

**Client:**

   cd client
   npm install
   npm run dev

If the client cannot reach the API, create `client/.env` with:

   VITE_API_BASE=http://localhost:4000/api/equipment

## API endpoints
- GET    /api/equipment
- POST   /api/equipment
- PUT    /api/equipment/:id
- DELETE /api/equipment/:id

## Assumptions (made while building this demo) 
- Data storage is a single JSON file at `server/data/equipment.json` for simplicity (no database).
- No authentication/authorization is required for demo purposes.
- The app is intended for local development and manual testing (not production-ready).
- Unique `id` values are used to identify equipment; some operations assume well-formed inputs.



## Notes
- Data is stored in `server/data/equipment.json` (simple JSON file for demo).
- This is a minimal example with basic validation and error handling.

## Security & dependency notes
- You may see `npm audit` warnings when installing. Try `npm audit fix` for non-breaking fixes.
- For aggressive fixes (may include breaking changes), use `npm audit fix --force` after reviewing.

## Troubleshooting
- If ports are in use, change the server `PORT` env var or the Vite dev server port.


---

Built as a small demo to satisfy CRUD requirements for equipment management.  


<!-- REPOSITORY: Add the GitHub repository URL here after pushing (e.g. https://github.com/<your-username>/leucine) -->
=======

