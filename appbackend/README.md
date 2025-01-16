# AppBackend

A backend application built with **Node.js** and **Express**, integrating **Prisma** for database operations, **Stripe** for payment processing, and other essential packages for authentication, data manipulation, and API communication.

---

## Features

- **Express.js**: Web framework for handling server-side routing and API endpoints.
- **Prisma**: Next-generation ORM for interacting with the database.
- **Stripe**: Integration for secure payment processing.
- **JSON Web Tokens (JWT)**: Authentication and session management.
- **bcrypt**: Password hashing for secure user authentication.
- **XLSX**: Parsing and writing Excel files.
- **Axios**: HTTP client for API requests.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16.x or later): [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) or **yarn**.

---

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/appbackend.git
   cd appbackend
   npm install
   npx prisma migrate dev --name init
   node ./prisma/feedData.js
   nodemon src/index.js

