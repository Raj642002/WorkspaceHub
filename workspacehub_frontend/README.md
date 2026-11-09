# WorkspaceHub Frontend

React frontend for the Workspace Booking Management system.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- Spring Boot backend running at `http://localhost:8080`

---

## How to Run

### Step 1 — Start the Spring Boot Backend

Make sure your Spring Boot application is running on port **8080** before starting the frontend.
You can start it from your IDE (Run as Spring Boot App) or via Maven:

```bash
mvn spring-boot:run
```

### Step 2 — Install Frontend Dependencies

Open a terminal, navigate to the project folder, and install dependencies (only needed once):

```bash
cd workspacehub_frontend
npm install
```

### Step 3 — Start the React Development Server

```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000).

> The dev server proxies all API calls to `http://localhost:8080`, so the backend must be running for the Add Booking and View Bookings features to work.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Runs the app in development mode at http://localhost:3000 |
| `npm test` | Launches the test runner |
| `npm run build` | Builds the app for production into the `build/` folder |

---

## API Endpoints Used

| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/addWorkspaceBooking` | Add a new workspace booking |
| `GET` | `/getAllWorkspaceBookings` | Retrieve all workspace bookings |

---

## Features

- **Add Booking** — Form with client-side validation (required fields, name length 3–50 chars, booking date must be today or future, end time must be after start time)
- **View Bookings** — Table listing all bookings with colour-coded status badges (PENDING / CONFIRMED / CANCELLED)
- After a booking is successfully added, the app automatically switches to the View Bookings tab
