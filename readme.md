# GigFlow – Mini Freelance Marketplace

GigFlow is a full-stack freelance marketplace where clients can post gigs and freelancers can bid on them.  
The core focus of this project is **secure authentication**, **clean state handling**, and a **race-condition-safe hiring flow**.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT authentication with **HttpOnly cookies**
- Secure middleware-based route protection
- No localStorage token usage

### 📄 Gig Management
- Create gigs (authenticated users)
- Public feed of open gigs
- Search gigs by title
- Gig ownership enforced

### 💼 Bidding System
- Freelancers can submit bids on gigs
- Clients can view all bids for their own gigs
- Clean gig → bid relationship

### ⭐ Hiring Logic (Core Feature)
- Client can hire **only one freelancer**
- Gig status changes from `open` → `assigned`
- Selected bid becomes `hired`
- All other bids automatically become `rejected`
- Implemented using **MongoDB transactions** to prevent race conditions

### 🔔 Real-time Notifications (Bonus)
- Socket.io integration
- Freelancer receives instant notification when hired
- No page refresh required

### 🎨 Frontend UI
- Built with **React + Tailwind CSS**
- Clean, professional, non-AI-looking design
- Product-style layout with clear hierarchy
- State-driven UI updates after hiring

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Context API
- Fetch API
- Socket.io-client

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (HttpOnly cookies)
- Socket.io

---

## 📁 Project Structure

```txt
gigflow/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── context/
│   │   └── socket/
│
└── README.md
