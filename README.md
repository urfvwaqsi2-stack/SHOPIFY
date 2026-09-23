# Shofipy

A complete modern e-commerce web application inspired by premium real-world platforms.

## Features

- 🛍️ **Full Product Catalog**: 20 realistic products across various categories.
- 🎨 **Premium UI/UX**: Custom CSS design system, responsive layouts, smooth animations, and hover effects.
- 🛒 **Functional Cart**: LocalStorage-backed cart persistence. Add, remove, adjust quantities.
- 🔍 **Search & Filters**: Real-time filtering by category, price sorting, and search querying.
- 💳 **Demo Checkout**: Complete flow for customer details, shipping, and payment demo.
- 🔐 **Authentication Demo**: Login and Register functionality.
- 📊 **Admin Dashboard**: View total sales, orders, recent transactions, and customer metrics.
- 🚀 **Full-Stack**: Built with React (Vite) and Node.js (Express).

## Tech Stack

- **Frontend**: React.js, React Router, Lucide React (Icons), Context API, Vanilla CSS.
- **Backend**: Node.js, Express.js, CORS.
- **Database**: In-memory JSON structures for demonstration.

## Setup Instructions

1. **Clone the repository** (or navigate to the project directory).

2. **Install all dependencies** (Frontend & Backend):
   ```bash
   npm run install:all
   ```

3. **Set up Environment Variables**:
   Copy `.env.example` to `.env` in the `backend` directory.
   ```bash
   cp backend/.env.example backend/.env
   ```

4. **Start the Development Servers**:
   Run both frontend and backend concurrently from the root directory:
   ```bash
   npm start
   ```

5. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

### Demo Accounts
- **Admin**: `admin@shofipy.com` / `admin123`
