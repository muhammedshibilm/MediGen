import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",  // Change if using another service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
  };

  await transporter.sendMail(mailOptions);
}
