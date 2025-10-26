require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🔧 Testing email configuration...\n');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
console.log('EMAIL_FROM_NAME:', process.env.EMAIL_FROM_NAME);
console.log('\n');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER, // Send to yourself for testing
  subject: '✅ Test Email from Improve My City',
  html: '<h1>Email Configuration Working!</h1><p>Your email notifications are set up correctly.</p>',
};

transporter.sendMail(mailOptions)
  .then(() => {
    console.log('✅ Test email sent successfully!');
    console.log('📧 Check your inbox:', process.env.EMAIL_USER);
  })
  .catch((error) => {
    console.error('❌ Failed to send test email:');
    console.error(error.message);
    if (error.code === 'EAUTH') {
      console.log('\n⚠️  Authentication failed. Check:');
      console.log('1. App Password is correct (no spaces)');
      console.log('2. 2-Step Verification is enabled');
      console.log('3. "Less secure app access" is OFF (use App Password instead)');
    }
  });
