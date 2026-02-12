# Job Application Tracker API

A comprehensive backend API for managing job applications, built with Node.js, Express, and Sequelize. This platform helps job seekers organize and track their job search process efficiently.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-ORM-orange.svg)](https://sequelize.org/)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Management
- 🔐 Secure user registration and login with JWT authentication
- 👤 Profile management with career goals
- 🔒 Password encryption using bcrypt

### Job Application Tracking
- 📝 Log job applications with detailed information
- 📎 Upload and manage application attachments (resumes, cover letters)
- 🔍 Search and filter applications by various criteria
- 📊 Track application status (Applied, Interviewed, Offered, Rejected, Accepted)

### Company Management
- 🏢 Store and manage company information
- 📋 Save company contact details and notes
- 🔗 Organize companies by industry and size

### Job Listings
- 💾 Save interesting job listings for later
- 🔗 Store job links and descriptions
- 📍 Track job locations

### Reminder System
- ⏰ Set follow-up reminders for applications
- 📧 Email notifications for upcoming reminders
- 🔔 Track sent reminders

### Dashboard & Analytics
- 📈 Overview of job search progress
- 📊 Application statistics and metrics
- 📉 Visual representation of application statuses

## 🛠 Tech Stack

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- MySQL/PostgreSQL

**Authentication:**
- JWT (JSON Web Tokens)
- bcrypt

**File Upload:**
- Multer

**Email Service:**
- SendInBlue

**Other Tools:**
- dotenv (Environment variables)
- cors (Cross-Origin Resource Sharing)

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MySQL/PostgreSQL database
- Git

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/binitamuskan996/job-application-tracker.git
cd job-application-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration (see [Environment Variables](#environment-variables))

4. **Run database migrations**
```bash
npm run migrate
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=job_tracker_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DIALECT=mysql

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Email Configuration (SendInBlue)
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@jobtracker.com

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

## 🗄 Database Setup

1. **Create the database**
```sql
CREATE DATABASE job_tracker_db;
```

2. **Run migrations** (if using migrations)
```bash
npm run migrate
```

3. **Seed data** (optional)
```bash
npm run seed
```

### Database Schema

The application uses the following main tables:
- **Users** - User account information
- **JobApplications** - Job application records
- **Application_files** - Uploaded documents
- **Companies** - Company information
- **JobListings** - Saved job listings
- **Reminders** - Follow-up reminders

## ▶️ Running the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT)

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔐 Auth Routes

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "careerGoal": "Software Engineer"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 👤 User Routes

#### Get User Profile
```http
GET /api/user/get
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "careerGoal": "Software Engineer"
  }
}
```

#### Update User Profile
```http
PUT /api/user/update
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Smith",
  "careerGoal": "Senior Software Engineer"
}
```

**Response:** `200 OK`

---

### 📝 Job Application Routes

#### Create Application
```http
POST /api/application/add
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "companyName": "Google",
  "jobTitle": "Software Engineer",
  "applicationDate": "2024-02-01",
  "status": "applied",
  "notes": "Applied through company website"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Application created successfully",
  "data": {
    "id": 1,
    "companyName": "Google",
    "jobTitle": "Software Engineer",
    "applicationDate": "2024-02-01",
    "status": "applied",
    "notes": "Applied through company website"
  }
}
```

#### Get All Applications
```http
GET /api/application/get
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "companyName": "Google",
      "jobTitle": "Software Engineer",
      "applicationDate": "2024-02-01",
      "status": "applied",
      "notes": "Applied through company website",
      "createdAt": "2024-02-01T10:30:00Z"
    }
  ]
}
```

#### Update Application
```http
PUT /api/application/update/:id
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "interviewed",
  "notes": "First round completed"
}
```

**Response:** `200 OK`

#### Delete Application
```http
DELETE /api/application/delete/:id
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

#### Upload Application Attachment
```http
POST /api/application/:id/attachments
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:** `multipart/form-data`
- `file`: The file to upload (resume, cover letter, etc.)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": 1,
    "fileUrl": "/uploads/resume_1234567890.pdf",
    "JobApplicationId": 1
  }
}
```

#### Search Applications
```http
GET /api/application/search?q=google
```
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `q` - Search term (searches in companyName, jobTitle, notes)

**Response:** `200 OK`

#### Filter Applications
```http
GET /api/application/filter?status=applied&startDate=2024-01-01&endDate=2024-12-31
```
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` - Filter by application status
- `startDate` - Filter by start date (YYYY-MM-DD)
- `endDate` - Filter by end date (YYYY-MM-DD)

**Response:** `200 OK`

---

### 🏢 Company Routes

#### Create Company
```http
POST /api/company/add
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "companyName": "Google Inc.",
  "contactPerson": "Jane Smith",
  "email": "recruiting@google.com",
  "phone": "+1-555-0123",
  "industry": "Technology",
  "companySize": "10000+",
  "notes": "Applied for multiple positions"
}
```

**Response:** `201 Created`

#### Get All Companies
```http
GET /api/company/get
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

#### Update Company
```http
PUT /api/company/update/:id
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

#### Delete Company
```http
DELETE /api/company/delete/:id
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

---

### 💼 Job Listing Routes

#### Save Job Listing
```http
POST /api/joblisting/save
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "companyName": "Microsoft",
  "jobTitle": "Cloud Engineer",
  "jobLink": "https://careers.microsoft.com/job/12345",
  "description": "Work on Azure cloud infrastructure",
  "location": "Seattle, WA"
}
```

**Response:** `201 Created`

#### Get Saved Listings
```http
GET /api/joblisting/get
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

#### Delete Listing
```http
DELETE /api/joblisting/delete/:id
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

---

### ⏰ Reminder Routes

#### Create Reminder
```http
POST /api/reminder/add/:applicationId
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "reminderDate": "2024-02-15T10:00:00Z",
  "message": "Follow up on Google application"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Reminder created successfully",
  "data": {
    "id": 1,
    "reminderDate": "2024-02-15T10:00:00Z",
    "message": "Follow up on Google application",
    "isSent": false,
    "JobApplicationId": 1
  }
}
```

#### Get All Reminders
```http
GET /api/reminder/get
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "reminderDate": "2024-02-15T10:00:00Z",
      "message": "Follow up on Google application",
      "isSent": false,
      "JobApplication": {
        "companyName": "Google",
        "jobTitle": "Software Engineer"
      }
    }
  ]
}
```

---

### 📊 Dashboard Routes

#### Get Dashboard Overview
```http
GET /api/dashboard/overview
```
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalApplications": 25,
    "statusBreakdown": {
      "applied": 10,
      "interviewed": 8,
      "offered": 3,
      "rejected": 3,
      "accepted": 1
    },
    "recentApplications": [],
    "upcomingReminders": [],
    "applicationTrend": {
      "thisWeek": 5,
      "lastWeek": 3,
      "thisMonth": 15
    }
  }
}
```

---

## 📁 Project Structure

```
job-application-tracker/
├── config/
│   └── config.js              # Configuration files
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── userController.js      # User management
│   ├── jobApplicationController.js
│   ├── applicationFileController.js
│   ├── companyController.js
│   ├── jobListController.js
│   ├── reminderController.js
│   └── dashboardController.js
├── middleware/
│   ├── auth.js                # JWT authentication middleware
│   ├── upload.js              # File upload middleware
│   └── errorHandler.js        # Error handling middleware
├── models/
│   ├── index.js               # Model associations
│   ├── user.js
│   ├── jobApplication.js
│   ├── application_files.js
│   ├── company.js
│   ├── jobListing.js
│   └── reminder.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── applicationRoute.js
│   ├── companyRoutes.js
│   ├── jobListingRoutes.js
│   ├── reminderRoutes.js
│   └── dashboardRoutes.js
├── utils/
│   ├── db-connection.js       # Database connection
│   └── emailService.js        # Email notification service
├── uploads/                   # Uploaded files directory
├── .env                       # Environment variables
├── .env.example              # Example environment file
├── .gitignore
├── package.json
├── server.js                  # Entry point
└── README.md
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes with middleware
- Input validation and sanitization
- SQL injection prevention with Sequelize ORM
- File upload restrictions and validation
- CORS configuration

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚢 Deployment

### Deploy to AWS

1. **Set up EC2 instance**
2. **Install Node.js and dependencies**
3. **Configure environment variables**
4. **Set up PM2 for process management**
```bash
pm2 start server.js --name job-tracker-api
pm2 save
pm2 startup
```

5. **Configure Nginx as reverse proxy**
6. **Set up SSL certificate**

### Deploy to Heroku

```bash
heroku create job-tracker-api
heroku addons:create cleardb:ignite
git push heroku main
heroku config:set JWT_SECRET=your_secret_key
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name:-Binita Kumari


**Happy Job Hunting! 🎯**
