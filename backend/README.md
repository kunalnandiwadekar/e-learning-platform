# 📚 E-Learning Platform – Backend

A robust and scalable backend service for the E-Learning Platform, built with Node.js, Express, and MongoDB. This RESTful API powers user authentication, course management, enrollment tracking, and administrative functions.

## 🚀 Features

- **User Authentication** - JWT-based secure authentication system
- **Course Management** - Full CRUD operations for courses
- **Enrollment System** - Track student enrollments and progress
- **Role-Based Access Control** - Separate permissions for students and admins
- **File Upload** - Handle course thumbnails with Multer
- **Data Validation** - Input validation and sanitization
- **Error Handling** - Comprehensive error handling and logging

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Joi
- **Logging**: Winston
- **Testing**: Jest, Supertest

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/               # Configuration files
│   │   ├── db.js           # Database connection
│   │   └── multer.js       # File upload config
│   │
│   ├── controllers/         # Route controllers
│   │   ├── auth.controller.js
│   │   ├── course.controller.js
│   │   ├── enrollment.controller.js
│   │   └── admin.controller.js
│   │
│   ├── middleware/          # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── models/              # MongoDB models
│   │   ├── user.model.js
│   │   ├── course.model.js
│   │   └── enrollment.model.js
│   │
│   ├── routes/              # API routes
│   │   ├── auth.routes.js
│   │   ├── course.routes.js
│   │   ├── enrollment.routes.js
│   │   └── admin.routes.js
│   │
│   ├── services/            # Business logic
│   │   ├── auth.service.js
│   │   └── course.service.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── logger.js
│   │   └── apiError.js
│   │
│   ├── validations/         # Request validations
│   │   ├── auth.validation.js
│   │   └── course.validation.js
│   │
│   ├── app.js               # Express app configuration
│   └── server.js            # Server entry point
│
├── uploads/                 # Uploaded files (course thumbnails)
├── tests/                   # Test files
├── .env.example             # Environment variables example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-learning-platform.git
   cd e-learning-platform/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGO_URI=mongodb://localhost:27017/elearning
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=30d
   
   # File Upload
   MAX_FILE_SIZE=5MB
   UPLOAD_DIR=./uploads
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=15*60*1000
   RATE_LIMIT_MAX=100
   ```

4. Start the development server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

5. The server will be running at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Register a new user
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // or "admin"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Courses

#### Get all courses (Public)
```http
GET /api/courses
```

#### Get single course by slug (Public)
```http
GET /api/courses/:slug
```

#### Create course (Admin)
```http
POST /api/admin/courses
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Introduction to Node.js",
  "description": "Learn Node.js from scratch",
  "instructor": "Jane Smith",
  "price": 99.99,
  "category": "Programming",
  "thumbnail": <file> // Optional
}
```

## 🧪 Testing

Run tests:
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🔒 Security

- JWT authentication with HTTP-only cookies
- Password hashing with bcrypt
- Helmet for setting various HTTP headers
- Rate limiting to prevent brute force attacks
- Input validation and sanitization
- CORS enabled with whitelist
- Request logging

## 🚀 Deployment

### Prerequisites
- MongoDB Atlas account or self-hosted MongoDB
- Node.js environment

### Steps
1. Set up production environment variables
2. Install dependencies with `npm install --production`
3. Build the application (if using TypeScript)
4. Start the server with `npm start`

### Recommended Hosting
- **Backend**: AWS EC2, Heroku, Render, Railway
- **Database**: MongoDB Atlas, AWS DocumentDB
- **Storage**: AWS S3 (for file uploads in production)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Mongoose](https://mongoosejs.com/)