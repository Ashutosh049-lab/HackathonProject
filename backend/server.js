
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const complaintRoutes = require("./routes/complaint.routes");
const adminRoutes = require("./routes/admin.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const chatbotRoutes = require("./routes/chatbot.routes");
const debugRoutes = require("./routes/debug.routes");



dotenv.config();

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    // Allow localhost and deployed frontend
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://sunny-sorbet-c93331.netlify.app'
    ];
    
    if (!origin || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use("/auth", authRoutes);
app.use("/complaints", complaintRoutes);
app.use("/admin", adminRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/chatbot", chatbotRoutes);
app.use("/debug", debugRoutes);



app.get("/", (req, res) => {
  res.send("Improve My City Backend Running ✅");
});

const PORT = process.env.PORT || 8081

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
