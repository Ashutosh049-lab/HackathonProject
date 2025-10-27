# Improve My City 🏙️

A full-stack web application that empowers citizens to report and track local issues, helping improve their communities through transparent complaint management.

## 🌟 Features

- **User Authentication** - Secure registration and login with JWT
- **Complaint Management** - Submit, track, and manage city improvement requests
- **Admin Dashboard** - Monitor and respond to citizen complaints
- **AI Chatbot** - Get instant assistance with common queries
- **Real-time Updates** - Track complaint status in real-time
- **Email Notifications** - Stay informed with automated email updates
- **Responsive Design** - Seamless experience across all devices

  ## 🌐 Live Demo

- **Frontend:** [https://inquisitive-boba-2f9186.netlify.app](https://inquisitive-boba-2f9186.netlify.app)
- **Backend:** [https://hackathonproject-4.onrender.com](https://hackathonproject-4.onrender.com)


## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ashutosh049-lab/HackathonProject.git
cd hacakthon-project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=8081
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8081
```

### 4. Running the Application

#### Option 1: PowerShell Script (Windows)
```powershell
.\start-dev.ps1
```

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8081

## 📁 Project Structure

```
hacakthon-project/
├── backend/
│   ├── config/          # Database and configuration
│   ├── routes/          # API routes
│   │   ├── auth.routes.js
│   │   ├── complaint.routes.js
│   │   ├── admin.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── chatbot.routes.js
│   │   └── debug.routes.js
│   ├── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store
│   │   └── App.jsx      # Root component
│   ├── vite.config.js
│   └── package.json
├── start-dev.ps1        # Development startup script
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌐 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Complaints
- `GET /complaints` - Get all complaints
- `POST /complaints` - Create new complaint
- `GET /complaints/:id` - Get complaint by ID
- `PUT /complaints/:id` - Update complaint
- `DELETE /complaints/:id` - Delete complaint

### Admin
- `GET /admin/complaints` - Admin complaint management
- `PATCH /admin/complaints/:id/status` - Update complaint status

### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics

### Chatbot
- `POST /chatbot/query` - Send chatbot query

## 🔒 Environment Variables

### Backend Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8081` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/city-app` |
| `JWT_SECRET` | Secret key for JWT | `your-secret-key` |
| `EMAIL_USER` | Email for notifications | `noreply@example.com` |
| `EMAIL_PASS` | Email password/app password | `your-app-password` |

### Frontend Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8081` |


## 🚢 Deployment

### Backend Deployment
The backend is deployed on **Render** at: https://hackathonproject-4.onrender.com

Other supported platforms:
- Heroku
- Vercel
- Railway

### Frontend Deployment
The frontend is deployed on **Netlify** at: https://inquisitive-boba-2f9186.netlify.app

Other supported platforms:
- Vercel
- GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- GitHub: [@Ashutosh049-lab](https://github.com/Ashutosh049-lab)


## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ for building better cities
