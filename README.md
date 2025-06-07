# Task Manager Application

**Full-Stack Application** built with React (frontend) and Node.js + Express (backend), with PostgreSQL as the database.

## Tech Stack
- **Backend**: Node.js, Express, Sequelize (ORM), PostgreSQL, JWT Authentication, Multer (file uploads)
- **Frontend**: React, Redux Toolkit (state), React Router v6, TailwindCSS, Axios
- **Dev Tools**: Docker, Docker Compose, Jest (tests), Swagger (API docs)

## Prerequisites
- Docker & Docker Compose installed (recommended)
- Alternatively: Node.js (v18.x LTS), npm/yarn, PostgreSQL locally installed

## Setup Using Docker Compose
1. Clone this repository:
   ```
   git clone https://github.com/your-username/task-manager-app.git
   cd task-manager-app
   ```
2. Copy environment templates:
   ```
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
3. In `backend/.env`, configure: 
   ```ini
   DATABASE_URL=postgres://postgres:postgres@postgres:5432/task_manager_db
   JWT_SECRET=your_jwt_secret_here
   ```
4. In `frontend/.env`, set: (if needed)
   ```ini
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```
5. Build and run containers:
   ```
   docker-compose up --build
   ```
6. Access the apps:
   - Frontend: http://localhost:3000
   - Backend (Swagger): http://localhost:5000/api/docs

## Setup Without Docker
### Backend
1. Navigate to `backend/`:
   ```
   cd backend
   ```
2. Copy `.env.example` to `.env` and fill in: same as above.
3. Install dependencies:
   ```
   npm install
   ```
4. Run migrations & seed (if using Sequelize CLI), otherwise Sequelize will auto-sync.
5. Start server in development mode:
   ```
   npm run dev
   ```
   - Server runs at `http://localhost:5000`.

### Frontend
1. Navigate to `frontend/`:
   ```
   cd frontend
   ```
2. Copy `.env.example` to `.env` and set `REACT_APP_API_BASE_URL=http://localhost:5000/api`.
3. Install dependencies:
   ```
   npm install
   ```
4. Start dev server:
   ```
   npm start
   ```
   - App runs at http://localhost:3000.

## Testing
- **Backend**: In `backend/`, run `npm test` to execute Jest tests.
- **Frontend**: In `frontend/`, run `npm test` to run React Testing Library tests.

## Folder Structure Explanation
Refer to the root of this document for a detailed folder tree.

## API Documentation
After starting the backend, visit `http://localhost:5000/api/docs` to view Swagger UI.
