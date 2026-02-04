# Pokedex - Clean Architecture & GraphQL

A modern Pokedex application built with Angular 19+ (Signals) and NestJS (DDD + GraphQL).

## Features

- **Frontend**: Angular 19, Tailwind CSS v4, Signals Store (NgRx), Glassmorphism UI.
- **Backend**: NestJS, GraphQL, In-Memory Database (Seeded from PokeAPI), Domain-Driven Design.
- **Design**: Lucario Dark Theme, Geist Typography, Responsive & Animated.

## Tech Stack

- **Frontend**:
  - Angular 19
  - Tailwind CSS v4 (@tailwindcss/postcss)
  - Apollo Angular (GraphQL)
  - NgRx Signals
  - Biome (Linting/Formatting)

- **Backend**:
  - NestJS
  - GraphQL (Apollo Driver)
  - In-Memory Repository
  - Seeding Service (Axios)

## Setup & Run

### Prerequisites
- Node.js v16+ (Project config, though v18+ recommended)
- npm

### Installation

1. Install dependencies for both projects:
   ```bash
   npm install
   cd backend && npm install
   cd frontend && npm install
   ```

### Running the App

1. **Backend**:
   ```bash
   cd backend
   npm start
   ```
   Server runs on `http://localhost:3000`. GraphQL Playground at `http://localhost:3000/graphql`.
   *Note: On startup, the backend will fetch 150 Pokemon from PokeAPI. This might take a few seconds.*

2. **Frontend**:
   ```bash
   cd frontend
   npm start
   ```
   App runs on `http://localhost:4200`.

## Architecture Highlights

- **GraphQL First**: All data fetching is done via GraphQL queries.
- **In-Memory Storage**: Removed Firestore dependency. Data is seeded on startup and held in memory.
- **Zero Any**: Strict TypeScript typing across the stack.
- **Component Design**: Dumb UI components (Inputs/Outputs) + Smart Container/Layout components.
- **Search**: Advanced search with Name, Type, and Limit filters.

## Visuals

- **Glassmorphism**: Extensive use of backdrop-blur and transparency.
- **Typography**: Geist Sans for UI, Geist Mono for stats/numbers.
- **Animations**: Staggered fade-ins for grid items.
