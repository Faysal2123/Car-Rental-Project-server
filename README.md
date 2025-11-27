# 🚗 Car Portal Application — Backend Server

This is the **backend API** for the Car Portal Application.  
Built with **Node.js**, **Express.js**, and **MongoDB**, this server handles authentication, car management, and booking operations for the platform.

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based secure login  
- HTTP-only cookies for token storage  
- Protected API routes  

### 🚘 Car Management
- Add, update, delete car listings  
- Fetch cars by owner email  
- Fetch all cars and specific car details  

### 📅 Booking System
- Create bookings  
- Fetch user-specific bookings  
- Cancel or delete bookings  

### 🛠 Technologies
- Node.js  
- Express.js  
- MongoDB  
- JWT  
- dotenv  
- cookie-parser  
- CORS  

---

## 🔗 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/jwt` | Generate JWT token |
| POST | `/logout` | Clear JWT token |

---

### 🚘 Car Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cars` | Get all cars |
| GET | `/cars/email` | Get cars by owner email (protected) |
| GET | `/cars/:id` | Get car by ID |
| POST | `/cars` | Add a new car |
| PUT | `/cars/:id` | Update a car |
| DELETE | `/cars/:id` | Delete a car |

---

### 📅 Booking Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bookings` | Create a booking |
| GET | `/bookings` | Get user bookings (protected) |
| PUT | `/bookings/:id/cancel` | Cancel a booking |
| DELETE | `/bookings/:id` | Delete a booking |

---

## 🛠 Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone <your-backend-repo-link>
cd car-portal-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Server
```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## 🔒 JWT Authentication Flow
1. Client sends user email to `/jwt`  
2. Server creates JWT and sets it in an HTTP-only cookie  
3. Protected routes verify the token  
4. Access granted if the token is valid  

---

## 🛡 Security Implementations
- CORS enabled for specific frontend  
- HTTP-only secure cookies  
- Middleware for JWT verification  
- Environment variable protection  

---

## 🔗 Frontend Link
👉 **Live Frontend:** https://assignment-11-9153e.web.app/
👉 **Frontend Repository:** https://github.com/Faysal2123/Car-Rental-Project  

---

## 👨‍💻 Author
**Mohammad Foysal**  
MERN Stack Developer  

