# Expense Tracker App

## Overview

The Expense Tracker App is a complete cross-platform personal finance solution built with a **React Native (Expo)** frontend and a **Node.js / Express.js** backend. It uses **Neon (PostgreSQL)** as the primary database, **Clerk** for authentication (sign-in, sign-up, account verification), and a fully functional **CRUD API** for managing transactions.

The backend is deployed on **Render** and tested using REST APIs, while the mobile application provides a seamless and user-friendly interface for tracking income and expenses in real time.

---

## Features

### Backend

* **Node.js + Express.js** server architecture
* **Neon (PostgreSQL)** as the database for scalable and reliable storage
* **Clerk** authentication integration

  * Email/password sign-up
  * Email verification
  * Secure session management
* Complete **CRUD API** for transactions:

  * Create new transactions
  * Retrieve all transactions by user ID
  * Delete transactions by ID
  * Get a summary of balance, income, and expenses
* Environment variable support for API keys and database credentials
* Deployed on **Render** for cloud hosting
* API tested via REST clients (e.g., Postman)

### Mobile Frontend

* **React Native (Expo)** for cross-platform compatibility (iOS & Android)
* **Clerk-Expo** integration for user authentication

  * Sign-in page
  * Sign-up page
  * Account verification page
* **Home Page**

  * Displays user balance, income, and expenses
  * Lists all recent transactions
* **Add Transaction Page**

  * Input for transaction title, amount, and category
  * Date picker for transaction date
* Real-time updates after adding or deleting transactions
* Clean, responsive UI with custom styles

---

## Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **Neon (PostgreSQL)**
* **Clerk Authentication**
* **Render** (deployment)
* REST API architecture

### Frontend (Mobile)

* **React Native (Expo)**
* **Clerk-Expo**
* **JavaScript**
* **Expo Router**
* **React Hooks**
* **React Native Components**

---

## Folder Structure

```
ExpenseTrackerApp/
│
├── Backend/                # Backend code
│   ├── src/
│   │   ├── Config/          # Database & other configs
│   │   ├── Controllers/     # Business logic
│   │   ├── Routes/          # API routes
│   │   └── server.js        # App entry point
│   ├── package.json
│   └── package-lock.json
│
├── Mobile/                  # Mobile app code
│   ├── app/
│   │   ├── (auth)/          # Auth screens (sign-in, sign-up)
│   │   ├── (root)/          # Main app pages (home, create)
│   │   └── _layout.jsx      # App navigation
│   ├── assets/              # Images & fonts
│   ├── components/          # Reusable UI components
│   ├── constants/           # App constants (API URLs, colors)
│   ├── hooks/               # Custom hooks (useTransactions)
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## API Endpoints

**Base URL:**

```
https://expensetracker-r7pb.onrender.com/api
```

| Method | Endpoint                        | Description                                          |
| ------ | ------------------------------- | ---------------------------------------------------- |
| GET    | `/transactions/:userId`         | Get all transactions for a user                      |
| POST   | `/transactions`                 | Create a new transaction                             |
| DELETE | `/transactions/:id`             | Delete a transaction by ID                           |
| GET    | `/transactions/summary/:userId` | Get income, expenses, and balance summary for a user |

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/venkatagovindneelapu/ExpensesTrackerApp.git
cd ExpensesTrackerApp
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
PORT=5001
DATABASE_URL=your_neon_database_url
CLERK_API_KEY=your_clerk_api_key
```

Start the server:

```bash
npm run start
```

### 3. Mobile App Setup

```bash
cd ../Mobile
npm install
```

Update `constants/api.js` to point to your backend URL:

```js
export const API_URL = "https://expensetracker-r7pb.onrender.com/api";
```

Run the mobile app:

```bash
npx expo start
```

---

## Deployment

### Backend

* Hosted on **Render** using Node.js environment
* Connected to Neon PostgreSQL database
* Environment variables stored in Render's dashboard

### Mobile App

* Built with **Expo** for Android and iOS
* Can be tested via Expo Go or built into native binaries

---

## Future Improvements

* Add charts and graphs for expense visualization
* Implement recurring transactions
* Enable offline storage with local database
* Add category filtering and search
* Dark mode support

---

## License

This project is open-source and available under the MIT License.
