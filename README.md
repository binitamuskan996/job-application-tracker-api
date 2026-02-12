# Job Application Tracker API

This is a full-featured Job Application Tracker REST API built using Node.js, Express, Sequelize, JWT Authentication, AWS S3, Brevo Email Service, and Cron Jobs.

It includes all required functionalities to manage job applications, companies, reminders, attachments, dashboard statistics and more.

---

# Setup

Clone the repository

    $ git clone https://github.com/YOUR_USERNAME/job-application-tracker-api.git
    $ cd job-application-tracker-api
    $ npm install

Create a `.env` file in the root directory and add:

    PORT=3000
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    JWT_SECRET=
    AWS_ACCESS_KEY=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    AWS_BUCKET_NAME=
    BREVO_API_KEY=

---

# Run The Service

    $ npm start

Server runs on:

    http://localhost:3000

---

# 📌 API Endpoints

> All endpoints (except Register & Login) require JWT Authentication.

---

## 🔐 Authentication Routes

### 📝 Register User

**POST** `/auth/register`

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "careerGoal": "Backend Developer"
}

# Features

- JWT Authentication
- AWS S3 File Upload
- Brevo Email Notifications
- Cron Job Reminder System
- Dashboard Statistics
- Search & Filter
- Sequelize ORM
- RESTful Architecture

---

# Author

Binita Kumari

---

# License

This project is licensed under the MIT License.
