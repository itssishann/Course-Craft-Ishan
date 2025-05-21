const CLIENT_URL = process.env.CLIENT_URL;

exports.getFeedback = (
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
      <title>Feedback Form Submission</title>
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
              text-align: left;
          }

          .highlight {
              font-weight: bold;
          }

          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
              text-align: center;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <a href="${CLIENT_URL}"><img class="logo"
              src="https://ik.imagekit.io/ijhfycf53/Course-Assets/logo-black.png?updatedAt=1731329712530" 
              alt="CourseCraft Logo"></a>
          <div class="message">Feedback from ${firstname} ${lastname}</div>
          <div class="body">
              <p><span class="highlight">Message:</span> ${message}</p>
              <p><span class="highlight">Email:</span> ${email}</p>
              <p><span class="highlight">Phone Number:</span> ${countrycode} ${phoneNo}</p>
          </div>
          <div class="support">
              This feedback was submitted through the Course Craft platform.
          </div>
      </div>
  </body>
  
  </html>`;
};
