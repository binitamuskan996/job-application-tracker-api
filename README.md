# Job Application Tracker API

A comprehensive backend API for managing job applications, built with Node.js, Express, and Sequelize. This platform helps job seekers organize and track their job search process efficiently.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-ORM-orange.svg)](https://sequelize.org/)

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
EMAIL_SERVICE=SendInBlue
EMAIL_API_KEY=SendInBlue
EMAIL_FROM=noreply@jobtracker.com

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
http://localhost:3000/api/v1
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
POST /api/v1/auth/register
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

#### Login User
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

---

### 👤 User Routes

#### Get User Profile
```http
GET /api/v1/users/get
```
**Headers:** `Authorization: Bearer <token>`

#### Update User Profile
```http
PUT /api/v1/users/update
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Smith",
  "careerGoal": "Senior Software Engineer"
}
```

---

### 📝 Job Application Routes

#### Create Application
```http
POST /api/v1/applications/add
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

#### Get All Applications
```http
GET /api/v1/applications/get
```
**Headers:** `Authorization: Bearer <token>`

#### Update Application
```http
PUT /api/v1/applications/update/:id
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "interviewed",
  "notes": "First round completed"
}
```

#### Delete Application
```http
DELETE /api/v1/applications/delete/:id
```
**Headers:** `Authorization: Bearer <token>`

#### Upload Application Attachment
```http
POST /api/v1/applications/:id/attachments
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:** `multipart/form-data`
- `file`: The file to upload (resume, cover letter, etc.)

#### Search Applications
```http
GET /api/v1/applications/search?q=google
```
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `q` - Search term (searches in companyName, jobTitle, notes)

#### Filter Applications
```http
GET /api/v1/applications/filter?status=applied&startDate=2024-01-01&endDate=2024-12-31
```
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` - Filter by application status
- `startDate` - Filter by start date (YYYY-MM-DD)
- `endDate` - Filter by end date (YYYY-MM-DD)

---

### 🏢 Company Routes

#### Create Company
```http
POST /api/v1/company/add
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

#### Get All Companies
```http
GET /api/v1/company/get
```
**Headers:** `Authorization: Bearer <token>`

#### Update Company
```http
PUT /api/v1/company/update/:id
```
**Headers:** `Authorization: Bearer <token>`

#### Delete Company
```http
DELETE /api/v1/company/delete/:id
```
**Headers:** `Authorization: Bearer <token>`

---

### 💼 Job Listing Routes

#### Save Job Listing
```http
POST /api/v1/job-listings/save
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

#### Get Saved Listings
```http
GET /api/v1/job-listings/get
```
**Headers:** `Authorization: Bearer <token>`

#### Delete Listing
```http
DELETE /api/v1/job-listings/delete/:id
```
**Headers:** `Authorization: Bearer <token>`

---

### ⏰ Reminder Routes

#### Create Reminder
```http
POST /api/v1/reminders/add/:applicationId
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "reminderDate": "2024-02-15T10:00:00Z",
  "message": "Follow up on Google application"
}
```

#### Get All Reminders
```http
GET /api/v1/reminders/get
```
**Headers:** `Authorization: Bearer <token>`

---

### 📊 Dashboard Routes

#### Get Dashboard Overview
```http
GET /api/v1/dashboard/overview
```
**Headers:** `Authorization: Bearer <token>`

---


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name:-Binita Kumari


**Happy Job Hunting! 🎯**
