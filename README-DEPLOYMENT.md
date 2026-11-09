# WorkspaceHub deployment package

This package contains the React frontend and Spring Boot backend.

## Important safety change
The original `workspacehub.sql` contains `DROP TABLE IF EXISTS workspace_bookings`.
The production configuration disables automatic SQL script execution (`spring.sql.init.mode=never`) so a restart/deploy cannot drop existing bookings. Hibernate creates/updates the table using `spring.jpa.hibernate.ddl-auto=update`.

## Deploy order
1. Push both folders to one GitHub repository (do not commit `node_modules` or `target`).
2. Create a Railway MySQL service.
3. Deploy `workspacehub_backend` as a Railway service with root directory `workspacehub_backend`.
4. Set backend variables:
   - `DB_URL=jdbc:mysql://<MYSQLHOST>:<MYSQLPORT>/<MYSQLDATABASE>`
   - `DB_USERNAME=<MYSQLUSER>`
   - `DB_PASSWORD=<MYSQLPASSWORD>`
   - `FRONTEND_URL=http://localhost:3000` temporarily; replace with the Vercel URL after frontend deployment.
   Railway's MySQL service provides the host, port, database, username and password values. Use the private/internal host for services in the same Railway project.
5. Generate a public domain for the Railway backend. Confirm the service is healthy.
6. Deploy `workspacehub_frontend` to Vercel with root directory `workspacehub_frontend`.
   - Framework preset: Create React App
   - Build command: `npm run build`
   - Output directory: `build`
   - Environment variable: `REACT_APP_API_URL=https://<your-backend-domain>`
7. Copy the Vercel production URL into Railway backend variable `FRONTEND_URL`, then redeploy the backend.
8. Test adding and listing bookings.

## Local development
The frontend keeps using its `package.json` proxy (`http://localhost:8080`) when `REACT_APP_API_URL` is not set. Run the backend on port 8080 and frontend with `npm start`.

## Database initialization
If you need the sample rows from `workspacehub.sql`, import that SQL manually into a NEW/empty database only after reviewing it. Do not run the script against a database with bookings you want to keep.
