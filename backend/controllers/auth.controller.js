
// const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ msg: "User registered successfully" });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ msg: "Invalid credentials" });

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       msg: "Login Successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       },
//     });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };







const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Normal User Register (with optional role selection)
exports.register = async (req, res) => {
  try {
    console.log('📝 Registration attempt:', { ...req.body, password: '[REDACTED]', secretKey: req.body.secretKey ? '[PROVIDED]' : '[NOT PROVIDED]' });
    
    const { name, email, password, role, secretKey } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ msg: "Name, email, and password are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ msg: "User already exists" });
    }

    // Default role is 'user'
    let userRole = "user";
    
    // If admin role is requested, validate secret key
    if (role === "admin") {
      console.log('🔐 Admin registration attempt with secret key');
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        console.log('❌ Invalid admin secret key provided');
        return res.status(403).json({ msg: "Invalid secret key for admin registration" });
      }
      userRole = "admin";
      console.log('✅ Admin secret key validated');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    console.log('✅ User created successfully:', { id: user._id, email: user.email, role: user.role });

    res.status(201).json({ 
      msg: `${userRole === 'admin' ? 'Admin' : 'User'} registered successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Admin Register (Special Route)
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ msg: "Unauthorized to create admin" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ msg: "Admin registered successfully" });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ✅ Login → Same for both User & Admin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
