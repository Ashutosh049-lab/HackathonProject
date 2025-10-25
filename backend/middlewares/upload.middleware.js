

const multer = require("multer");
const storage = multer.memoryStorage(); // store in memory temporarily
const upload = multer({ storage });

module.exports = upload;
