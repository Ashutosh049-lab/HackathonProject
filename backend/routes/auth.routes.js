
// const express = require("express");
// const { register, login } = require("../controllers/auth.controller");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;



const express = require("express");
const { register, login, registerAdmin } = require("../controllers/auth.controller");
const User = require("../models/user.model");
const router = express.Router();

router.post("/register", register);
router.post("/register-admin", registerAdmin); // ✅ Admin Register API
router.post("/login", login);

// Helper route to make a user admin (for testing)
router.post("/make-admin", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    res.json({ msg: "User made admin", user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
