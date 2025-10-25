
// const express = require("express");
// const { register, login } = require("../controllers/auth.controller");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;



const express = require("express");
const { register, login, registerAdmin } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/register-admin", registerAdmin); // ✅ Admin Register API
router.post("/login", login);

module.exports = router;
