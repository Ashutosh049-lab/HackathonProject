const nodemailer = require("nodemailer");

// Create email transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("⚠️ Email credentials not configured. Skipping email notifications.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send complaint status update email
const sendStatusUpdateEmail = async (userEmail, userName, complaint, newStatus, adminComment = null) => {
  try {
    const transporter = createTransporter();
    if (!transporter) return false;

    const statusEmoji = {
      'Pending': '⏳',
      'In Progress': '🔧',
      'Resolved': '✅'
    };

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🏙️ Improve My City</h1>
        <p style="color: #f0f0f0; margin: 10px 0 0 0;">Complaint Status Update</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <h2 style="color: #333; margin-top: 0;">Hello ${userName}! 👋</h2>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Great news! There's an update on your complaint.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h3 style="color: #333; margin-top: 0;">"${complaint.title}"</h3>
          <p style="color: #666; margin: 10px 0;"><strong>Category:</strong> ${complaint.category}</p>
          <p style="color: #666; margin: 10px 0;"><strong>Submitted:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
          
          <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #2c5aa0;">
              ${statusEmoji[newStatus] || '📋'} Status: ${newStatus}
            </p>
          </div>
          
          ${adminComment ? `
          <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ffc107;">
            <h4 style="margin-top: 0; color: #856404;">💬 Admin Comment:</h4>
            <p style="color: #856404; margin-bottom: 0; font-style: italic;">"${adminComment}"</p>
          </div>
          ` : ''}
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; margin-bottom: 20px;">
            Thank you for helping improve our city! 🌟
          </p>
          <div style="background: #667eea; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block;">
            <strong>Complaint ID: ${complaint._id}</strong>
          </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          This is an automated message from Improve My City.<br>
          If you have any questions, please contact our support team.
        </p>
      </div>
    </div>
    `;

    const emailText = `
Hello ${userName}!

Your complaint "${complaint.title}" has been updated.

Status: ${newStatus}
Category: ${complaint.category}
Submitted: ${new Date(complaint.createdAt).toLocaleDateString()}

${adminComment ? `Admin Comment: "${adminComment}"` : ''}

Thank you for helping improve our city!

Complaint ID: ${complaint._id}
    `;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Improve My City'}" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `${statusEmoji[newStatus] || '📋'} Update on your complaint: ${complaint.title}`,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Status update email sent to ${userEmail} for complaint: ${complaint.title}`);
    return true;

  } catch (error) {
    console.error("❌ Failed to send status update email:", error.message);
    return false;
  }
};

// Send welcome email when complaint is submitted
const sendComplaintSubmittedEmail = async (userEmail, userName, complaint) => {
  try {
    const transporter = createTransporter();
    if (!transporter) return false;

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🏙️ Improve My City</h1>
        <p style="color: #f0f0f0; margin: 10px 0 0 0;">Complaint Received</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <h2 style="color: #333; margin-top: 0;">Thank you, ${userName}! 🙏</h2>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          We've successfully received your complaint and our team will review it shortly.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
          <h3 style="color: #333; margin-top: 0;">"${complaint.title}"</h3>
          <p style="color: #666; margin: 10px 0;"><strong>Category:</strong> ${complaint.category}</p>
          <p style="color: #666; margin: 10px 0;"><strong>Status:</strong> ⏳ Pending Review</p>
          <p style="color: #666; margin: 10px 0;"><strong>Submitted:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 0; color: #2e7d32;">
              <strong>Complaint ID: ${complaint._id}</strong><br>
              <small>Please save this ID for future reference</small>
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; margin-bottom: 20px;">
            We'll notify you via email when there are updates on your complaint.
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          This is an automated message from Improve My City.<br>
          If you have any questions, please contact our support team.
        </p>
      </div>
    </div>
    `;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Improve My City'}" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `✅ Complaint Received: ${complaint.title}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Confirmation email sent to ${userEmail} for complaint: ${complaint.title}`);
    return true;

  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error.message);
    return false;
  }
};

module.exports = {
  sendStatusUpdateEmail,
  sendComplaintSubmittedEmail,
};