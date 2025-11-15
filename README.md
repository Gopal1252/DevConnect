# DevConnect

> A Tinder-like networking platform for developers to connect, collaborate, and grow together.

## Features

- Secure JWT authentication
- User profiles with skills showcase
- Send/receive connection requests
- Feed of potential connections (like Tinder swipes)
- Manage your network
- Modern UI with Tailwind CSS & DaisyUI

## TechStack

- Node.js + Express.js - Server framework
- MongoDB + Mongoose - Database and ODM
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- cookie-parser - Parse HTTP cookies
- cors - Cross-origin resource sharing
- validator - Data validation

## Quick Start

### Prerequisites
- Node.js v16 or higher
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Gopal1252/devconnect.git
cd devconnect
```

2. Install backend dependencies
```bash
npm install
```

3. Configure environment variables
```bash
# Backend: Create .env in root
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

4. Start the backend server
```bash
npm start
# Server runs on http://localhost:3000
```