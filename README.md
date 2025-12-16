# | Cineva

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![NPM](https://img.shields.io/badge/NPM-F69220?style=for-the-badge&logo=npm&logoColor=white)](https://npmjs.com/)

Cineva is a modern movie web application for exploring and discovering films with a clean, fast, and user-friendly interface.  
Built using Next.js App Router and powered by The Movie Database (TMDB) API.

---


1. Clone the repository and move into the project directory.
    ```bash
    git clone https://github.com/Roti18/cineva.git
    cd cineva
    ```

2.  **Instal dependencies:**

    ```bash
    npm install
    ```

3.  **Edit the .env file and add your TMDB access token.**

    ```
    TMDB_ACCESS_TOKEN="YOUR_TMDB_ACCESS_KEYS"
    ```
    You can obtain the token from https://www.themoviedb.org


## Development

Start the development server.
```bash
npm dev
```

The application will be available at:
```bash
 http://localhost:3000
```

## Project Structure

```
.
├── app
│   ├── api                # API routes (TMDB proxy)
│   ├── movies/[slug]      # Movie detail pages
│   ├── movie/[id]         # Movie page by ID
│   ├── player/[id]        # Video player
│   ├── profile            # User profile
│   ├── search             # Search pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── components             # Reusable UI & app components
│   ├── ui                 # Radix-based UI primitives
│   └── movie-card.tsx
│
├── hooks                  # Custom React hooks
├── lib                    # Utilities & business logic
├── public                 # Static assets
├── styles                 # Global styles
└── package.json
