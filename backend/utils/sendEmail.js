import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    const transporter = nodeMailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Gold's Gym" <${process.env.SMTP_MAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #000000, #FFD700); padding: 20px; text-align: center;">
            <h1 style="color: #FFD700; margin: 0; font-size: 2rem;">GOLD'S GYM</h1>
            <p style="color: white; margin: 5px 0;">Where Legends Are Made</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">${options.subject}</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; color: #333; line-height: 1.6;">${options.message}</pre>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
              <p>Thank you for contacting Gold's Gym!</p>
              <p style="font-size: 0.9rem;">This is an automated message from our website contact system.</p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
