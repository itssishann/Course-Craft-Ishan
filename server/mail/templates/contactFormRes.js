const CLIENT_URL = process.env.CLIENT_URL;

exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Contact Form Confirmation</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }

          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }

          .logo {
              max-width: 200px;
              margin-bottom: 20px;
          }

          .message {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
          }

          .body {
              font-size: 16px;
              margin-bottom: 20px;
          }

          .highlight {
              font-weight: bold;
          }

          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
          }
      </style>
  
  </head>
  
  <body>
      <div class="container">
          <a href="${CLIENT_URL}"><img class="logo"
                  src="https://ik.imagekit.io/ijhfycf53/Course-Assets/logo-black.png?updatedAt=1731329712530" alt="CourseCraft Logo"></a>
          <div class="message">Contact Form Confirmation</div>
          <div class="body">
              <p>Dear ${firstname} ${lastname},</p>
              <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.</p>
              <p>Here are the details you provided:</p>
              <p><span class="highlight">Name:</span> ${firstname} ${lastname}</p>
              <p><span class="highlight">Email:</span> ${email}</p>
              <p><span class="highlight">Phone Number:</span> ${countrycode} ${phoneNo}</p>
              <p><span class="highlight">Message:</span> ${message}</p>
              <p>We appreciate your interest and will get back to you shortly.</p>
          </div>
          <div class="support">
              If you have any further questions or need immediate assistance, please feel free to reach out to us at
              <a href="mailto:support@coursecraft.com">support@coursecraft.com</a>. We are here to help!
          </div>
      </div>
  </body>
  
  </html>`;
};
