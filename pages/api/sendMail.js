import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { emails } = req.body;

    try {
      // Step 1: Create a transporter

      console.log("Email", process.env.EMAIL_PASS);
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Step 2: Prepare email options
      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: emails,
        subject: "BITBYTE Registration",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
                line-height: 1.6;
              }
              .container {
                width: 80%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }
              .header {
                background-color: #4CAF50;
                color: #ffffff;
                text-align: center;
                padding: 20px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 20px;
              }
              .content h2 {
                color: #333;
                font-size: 20px;
              }
              .content p {
                margin: 15px 0;
                font-size: 16px;
                line-height: 1.6;
              }
              .cta {
                text-align: center;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .cta a {
                display: inline-block;
                background-color: #4CAF50;
                color: #ffffff;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                transition: background-color 0.3s ease;
              }
              .cta a:hover {
                background-color: #45a049;
              }
              .footer {
                background-color: #333;
                color: #ffffff;
                text-align: center;
                padding: 10px;
                font-size: 14px;
              }
              .footer p {
                margin: 5px 0;
              }
              .footer a {
                color: #ffffff;
                text-decoration: none;
              }
              .footer a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Registering!</h1>
              </div>
              <div class="content">
                <h2>Dear Participant,</h2>
                <p>We are excited to welcome you to <strong>BITBYTE</strong>. Thank you for completing your registration. We are currently reviewing your details and will confirm your registration shortly.</p>
                <p>We aim to ensure a smooth and enjoyable experience for you. If you have any questions or need further assistance, please do not hesitate to reach out to our support team.</p>
                <p>Meanwhile, stay tuned for more updates and information about the event. We look forward to seeing you soon!</p>
              </div>
             
              <div class="footer">
                <p>For any queries, please reach out to us at : +919697122941</p>
                <p>&copy; 2024 BITBYTE. All rights reserved.</p>
                
              </div>
            </div>
          </body>
          </html>
        `,
      };

      // Step 3: Send the email
      await transporter.sendMail(mailOptions);

      // Respond with success message
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Only POST requests are allowed" });
  }
}
