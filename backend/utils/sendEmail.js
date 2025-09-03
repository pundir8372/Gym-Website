import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    const transporter = nodeMailer.createTransport({
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
      from: `"The Life Gym" <${process.env.SMTP_MAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `
         <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #f4f4f4;">
         <div style="background: linear-gradient(135deg, #1a1a1a, #FFD700); padding: 30px; text-align: center;">
     <h1 style="color: #FFD700; margin: 0; font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">💪 THE LIFE GYM</h1>
       <p style="color: white; margin: 10px 0; font-size: 1.1rem;">Where Legends Are Made</p>
            </div>
<div style="padding: 40px 30px; background: white;">
<div style="background: linear-gradient(45deg, #FFD700, #FFA500); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
<h2 style="color: #1a1a1a; margin: 0; text-align: center;">🔥 ${options.subject}</h2>
</div>
<div style="background: #f9f9f9; padding: 25px; border-radius: 10px; border-left: 5px solid #FFD700;">
<pre style="white-space: pre-wrap; font-family: 'Arial', sans-serif; color: #333; line-height: 1.8; margin: 0;">${options.message}</pre>
</div>


            <div style="margin-top: 40px; text-align: center; padding: 20px; background: linear-gradient(135deg, #1a1a1a, #333); border-radius: 10px;">
<p style="color: #FFD700; font-weight: bold; margin: 0;">🏋️ Thank you for choosing The Life Gym!</p>
           <p style="color: white; margin: 10px 0; font-size: 0.9rem;">We'll get back to you within 24 hours</p>
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
