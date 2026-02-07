# AstroWatch - Cosmic Event Tracker

AstroWatch is a modern web application built with **Next.js** and **TypeScript** to track Near-Earth Objects (NEOs) and cosmic events. The app fetches data from NASA's Open APIs and presents it with a clean and user-friendly interface. Users can authenticate via **Supabase** to browse upcoming cosmic events, including NEOs, their characteristics, and potential hazards.

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Key Features](#key-features)
4. [Application Structure](#application-structure)
5. [API Integration](#api-integration)
6. [State Management](#state-management)
7. [Security Considerations](#security-considerations)
8. [EndPoints](#endpoints)
9. [Development Flow Highlights](#development-flow-highlights)
10. [Running the Project Locally](#running-the-project-locally)

---

## Overview

AstroWatch allows users to track NEOs and explore cosmic events via a seamless and responsive web interface. By leveraging **NASA's NeoWs API**, **Supabase** for authentication, and **Material UI** for the frontend, AstroWatch provides an intuitive platform to view NEOs, filter them based on potential hazard status, and view detailed information on each object.

---

## Technology Stack

- **Frontend Framework:** Next.js (React-based) with TypeScript for type safety
- **Styling:** Tailwind CSS for utility-based styling and Material UI for component-based design
- **Authentication:** Supabase React SDK (`@supabase/auth-helpers-react`) for managing user authentication
- **API Client:** Axios for making HTTP requests to NASA APIs
- **Routing:** Next.js file-based routing, including dynamic routes for event details
- **State Management:** React hooks (`useState`, `useEffect`, `useContext`) to manage NEO data, user authentication, and UI states

---

## Key Features

- **User Authentication:**
  - Secure login and logout via Supabase.
  - JWT-based sessions allow users to manage their account and track events.

- **NEO Data Fetching:**
  - Fetches NEOs from NASA's NeoWs API for the next 7 days by default.
  - Supports incremental loading to fetch additional data for future dates.

- **Event Listing:**
  - Displays NEOs grouped by date, showing:
    - NEO Name
    - Potential hazard status (highlighted in red)
    - Estimated diameter (km)
    - Closest approach date/time

- **Event Detail View:**
  - Dynamic page that shows detailed NEO information, including:
    - NASA JPL URL
    - Orbital data (optional)
    - Speed, orbit ID, and more.

- **Filtering & Sorting:**
  - Filters NEOs by "Potentially Hazardous" status.
  - Sorts NEOs by:
    - Approach date (ascending or descending)
    - NEO name (A-Z, Z-A)
    - NEO size (smallest to largest)

- **Loading & Error States:**
  - Clear and concise UI for loading states and errors during data fetching.

---

## Application Structure

```txt
.
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # TypeScript environment definitions
├── package-lock.json             # Package lock file for dependencies
├── postcss.config.mjs            # PostCSS configuration for Tailwind
├── public
│   ├── Logo.png                  # Logo image
│   └── Logo.svg                  # SVG Logo image
└── src
    ├── app
    │   ├── components
    │   │   ├── CallToAction.tsx  # Call to action section
    │   │   ├── CanvasBackground.tsx  # Background animation
    │   │   ├── FeaturesSection.tsx  # Features section
    │   │   ├── Footer.tsx        # Footer component
    │   │   ├── HeroSection.tsx   # Hero section with welcome message
    │   │   └── Navbar.tsx        # Navbar for navigation
    │   ├── favicon.ico            # Favicon
    │   ├── globals.css            # Global CSS for app-wide styles
    │   ├── home
    │   │   └── page.tsx          # Home page with NEO listing
    │   ├── layout.tsx             # Main layout for pages
    │   ├── login
    │   │   └── page.tsx          # Login page
    │   ├── page.tsx              # Default landing page
    │   └── signup
    │       └── page.tsx          # Signup page
    ├── components
    │   ├── loading.tsx           # Loading spinner component
    │   ├── NEOCard.tsx            # NEO summary card
    │   ├── NEODetailModal.tsx     # NEO detail modal
    │   ├── NEODisplay.tsx         # NEO display grid
    │   ├── NEOSearchForm.tsx      # NEO search form for filtering
    │   └── Providers.tsx          # Auth providers for Supabase
    ├── lib
    │   ├── nasa-api.ts           # NASA API client for NEO data fetching
    │   └── supabase
    │       ├── client.ts          # Supabase client initialization
    │       └── server.ts          # Server-side logic for Supabase authentication
    └── middleware.ts              # Middleware for session management
````

---

## API Integration

### NASA API

#### 1. **Fetch NEO Feed (List of NEOs)**

Endpoint:
`GET https://api.nasa.gov/neo/rest/v1/feed`

Parameters:

* `start_date` (YYYY-MM-DD) — The starting date for fetching NEOs.
* `end_date` (YYYY-MM-DD) — The end date for fetching NEOs.
* `api_key` — Your API key from NASA.

#### 2. **Fetch NEO Details (Individual NEO Information)**

Endpoint:
`GET https://api.nasa.gov/neo/rest/v1/neo/:id`

Parameters:

* `api_key` — Your API key from NASA.

---

## State Management

* **NEO Data:** Managed using `useState` for storing fetched data from NASA API.
* **User Authentication:** Supabase client session is used to manage user login and logout states.
* **Loading & Error States:** Global loading and error states are managed via React context and hooks.

---

## Security Considerations

* Supabase anon keys are **safe** to expose to the client.
* **NASA API keys** should be handled carefully:

  * For demo purposes, API keys can be exposed on the client.
  * For production apps, consider using **Next.js API routes** to keep your API keys private.

---

## Endpoints

### Frontend Endpoints

* **Landing Page (`/`):**

  * Displays the NEO list grouped by date.
  * Allows filtering by "Potentially Hazardous" and sorting by various attributes.

* **Event Detail Page (`/home`):**

  * Displays detailed information about a specific NEO, including its orbital data, velocity, and approach times.

* **Login Page (`/login`):**

  * Supabase-based login form for user authentication.

* **Signup Page (`/signup`):**

  * Supabase-based signup form for user registration.

### Backend Endpoints

* **NASA API Proxy (optional):**

  * Use Next.js API routes to proxy NASA API requests, ensuring security of API keys.

---

## Development Flow Highlights

1. **Initialize Project:**

   * Set up a new Next.js + TypeScript project, integrating Tailwind CSS and Material UI.

2. **Authentication:**

   * Integrate Supabase React SDK for handling login, signup, and JWT session management.

3. **NASA API Integration:**

   * Implement axios-based API calls to fetch NEO data.

4. **UI Design:**

   * Build reusable, responsive UI components using Material UI and Tailwind CSS.

5. **State Management:**

   * Use React hooks to handle state changes and manage loading, error, and user session states.

6. **Incremental Data Loading:**

   * Implement pagination to fetch additional NEO data for future dates.

7. **Error Handling:**

   * Gracefully handle loading states and errors in UI components.

---

## Running the Project Locally

To get the app running locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/dsaikiran01/AstroWatch.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Supabase credentials:

   * Go to the [Supabase dashboard](https://supabase.io) and create a new project.
   * Set up authentication and API keys in the `.env.local` file:

     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Run the development server:

   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to view the app locally.

