# Todo List Management API

A RESTful API for managing todo lists with user authentication, two-factor authentication, and CRUD operations.

## API Overview

This backend service provides:
- User registration and authentication
- Two-factor authentication using TOTP
- Todo item management (create, read, update, delete)
- API documentation via Swagger UI

## Tech Stack

- **Runtime**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **2FA**: Speakeasy (TOTP implementation)
- **Documentation**: Swagger UI, swagger-jsdoc

## API Documentation

Access the interactive API documentation at:
```
http://localhost:5000/todolist/api-docs
```

## API Endpoints

### Authentication

- `POST /service/user/register` - Register a new user
- `POST /service/user/login` - Authenticate a user
- `POST /service/user/refresh_token` - Get a new access token

### User Management

- `GET /service/user/profile` - Get user profile
- `PATCH /service/user/profile` - Update user profile

### Two-Factor Authentication

- `POST /service/user/2fa/generate` - Generate 2FA secret
- `POST /service/user/2fa/verify` - Verify and enable 2FA
- `POST /service/user/2fa/disable` - Disable 2FA

### Todo Management

- `GET /service/todo` - Get all todos for authenticated user
- `POST /service/todo` - Create a new todo
- `GET /service/todo/:id` - Get a specific todo
- `PATCH /service/todo/:id` - Update a todo
- `DELETE /service/todo/:id` - Delete a todo

## Data Models

### User Model

```
{
  personal_id: String,
  user_image: String,
  name: String,
  email: String,
  password: String (hashed),
  address: String,
  phone_number: String,
  otp_secret: String,
  otp_enabled: Boolean,
  joinedAt: Date,
  updatedAt: Date
}
```

### Todo Model

```
{
  todo_name: String,
  todo_image: String,
  todo_desc: String,
  todo_status: String (active/finished),
  user: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## Quick Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with:
   ```
   PORT=5000
   CONNECTION_URL=mongodb://localhost:27017/todolist
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ```
4. Start the server:
   ```
   npm start
   ```

## Authentication Flow

1. **Registration**: Create user account with email and password
2. **Login**: Authenticate and receive JWT token
3. **2FA Setup** (optional):
   - Generate secret
   - Verify with authenticator app
   - Enable for account
4. **Protected Routes**: Use JWT token in Authorization header

## Docker Support

A Dockerfile is included for containerization:

```
docker build -t todo-api .
docker run -p 5000:5000 todo-api
```

## License

MIT
