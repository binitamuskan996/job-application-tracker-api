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

# API Endpoints

---

API Endpoints
🔐 Auth Routes
Register User

POST | /auth/register

Key	Value
name	John Doe
email	john@example.com

password	password123
careerGoal	Backend Developer
Login User

POST | /auth/login

Key	Value
email	john@example.com

password	password123
👤 User Routes
Get Profile

GET | /user/get

Update Profile

PUT | /user/update

Key	Value
name	John Doe
careerGoal	Become Full Stack Developer
🏢 Company Routes
Create Company

POST | /companies/add

Key	Value
companyName	Google
contactPerson	HR Manager
email	hr@google.com

phone	+123456789
industry	Technology
companySize	10000+
notes	Dream company
Get Companies

GET | /companies/get

Update Company

PUT | /companies/update/{id}

Delete Company

DELETE | /companies/delete/{id}

📄 Application Routes
Create Application

POST | /applications/add

Key	Value
companyId	1
jobTitle	Backend Developer
applicationDate	2026-02-01
status	applied
notes	Waiting for response

Status values:

applied

interviewed

offered

rejected

accepted

Get Applications

GET | /applications/get

Update Application

PUT | /applications/update/{id}

Delete Application

DELETE | /applications/delete/{id}

Search Applications

GET | /applications/search?keyword=developer

Filter Applications

GET | /applications/filter?status=interviewed

Upload Attachment

POST | /applications/{id}/attachments

Form Data:

Key	Value
file	Resume.pdf

Stored Field:

fileUrl (TEXT)

📎 Application Files Model
Field	Type
fileUrl	TEXT
⏰ Reminder Routes
Create Reminder

POST | /reminders/add/{applicationId}

Key	Value
reminderDate	2026-02-20T10:00:00
message	Send follow-up email
isSent	false (default)
Get Reminders

GET | /reminders/get

Reminder Fields:

Field	Type
reminderDate	DATE
message	STRING
isSent	BOOLEAN
📊 Dashboard Route
Get Dashboard Overview

GET | /dashboard/overview

Returns:

Total Applications

Applications by Status

Upcoming Reminders

💾 Saved Job Listings
Save Job

POST | /jobs/save

(Fields based on your JobListing model — if you have title, company, link, etc.)

Example:

Key	Value
title	Full Stack Developer
company	Amazon
link	https://amazon.jobs
Get Saved Jobs

GET | /jobs/get

Delete Saved Job

DELETE | /jobs/delete/{id}
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

Your Name

---

# License

This project is licensed under the MIT License.
