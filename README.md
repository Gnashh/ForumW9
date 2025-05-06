# Todo List Management Application

A full-stack todo list management application with user authentication, two-factor authentication, and CRUD operations for todo items.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Authentication](#authentication)
- [Frontend](#frontend)
- [Docker](#docker)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**:
  - Registration and login
  - Profile management
  - Two-factor authentication (2FA) using TOTP

- **Todo Management**:
  - Create, read, update, and delete todos
  - Mark todos as active or finished
  - Search functionality
  - Todo descriptions and images

- **Security**:
  - JWT-based authentication
  - Password hashing with bcrypt
  - Optional two-factor authentication
  - Protected routes

- **API Documentation**:
  - Swagger UI for API documentation and testing

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Sequelize** - SQL ORM for database operations
- **PostgreSQL/SQLite** - Database options
- **JWT** - Authentication mechanism
- **Bcrypt** - Password hashing
- **Speakeasy** - Two-factor authentication
- **Swagger** - API documentation

### Frontend
- **React** - Frontend library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS/SCSS** - Styling

## Project Structure

```
project-root/
├── backend/                 # Backend code
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # Sequelize models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── .env                 # Environment variables
│   ├── index.js             # Entry point
│   └── package.json         # Dependencies
│
├── frontend/                # Frontend code
│   ├── public/              # Static files
│   ├── src/                 # React components
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.js           # Main component
│   │   └── index.js         # Entry point
│   ├── .env                 # Environment variables
│   └── package.json         # Dependencies
│
├── docker-compose.yml       # Docker configuration
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (optional, SQLite can be used for development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)

```
PORT=5000
JWT_SECRET=your_jwt_secret_key
DB_NAME=todolist
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
```

#### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

### Backend

```bash
cd backend
npm start
```

The server will run on http://localhost:5000 by default.

### Frontend

```bash
cd frontend
npm start
```

The React app will run on http://localhost:3000 by default.

## API Documentation

The API documentation is available via Swagger UI at:

```
http://localhost:5000/todolist/api-docs
```

This provides an interactive interface to explore and test all API endpoints.

## Database

### Models

#### User Model
- `id`: Primary key
- `personal_id`: Unique identifier
- `user_image`: Profile image URL
- `name`: User's name
- `email`: User's email (unique)
- `password`: Hashed password
- `address`: User's address
- `phone_number`: User's phone number
- `otp_secret`: Secret for two-factor authentication
- `otp_enabled`: Whether 2FA is enabled
- `joinedAt`: Timestamp of registration
- `updatedAt`: Timestamp of last update

#### Todo Model
- `id`: Primary key
- `todo_name`: Name of the todo
- `todo_image`: Image URL for the todo
- `todo_desc`: Description of the todo
- `todo_status`: Status (active/finished)
- `userId`: Foreign key to User
- `createdAt`: Timestamp of creation
- `updatedAt`: Timestamp of last update

### Database Configuration

The application supports both SQLite (for development) and PostgreSQL (for production). The configuration is in `backend/config/database.js`.

## Authentication

### Registration
Users can register with:
- Personal ID
- Name
- Email
- Password
- Optional: Address and phone number

### Login
Users can log in with:
- Email
- Password
- OTP code (if 2FA is enabled)

### Two-Factor Authentication
- Users can enable 2FA from their profile
- Uses TOTP (Time-based One-Time Password) algorithm
- Compatible with authenticator apps like Google Authenticator

## Frontend

The frontend is built with React and includes:

- User authentication pages (login, register)
- Todo management interface
- Profile management
- Two-factor authentication setup
- Responsive design

## Docker

A Docker configuration is provided for easy deployment:

```bash
docker-compose up
```

This will start both the backend and frontend services.

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment

The backend can be deployed to any Node.js hosting service like Heroku, AWS, or DigitalOcean.

### Frontend Deployment

The React frontend can be built for production:

```bash
cd frontend
npm run build
```

The resulting build folder can be deployed to services like Netlify, Vercel, or GitHub Pages.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
