
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const complaintRoutes = require("./routes/complaint.routes");



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/complaints", complaintRoutes);


app.get("/", (req, res) => {
  res.send("Improve My City Backend Running ✅");
});

const PORT = process.env.PORT || 8081

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
