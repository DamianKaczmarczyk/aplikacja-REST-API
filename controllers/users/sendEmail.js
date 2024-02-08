import nodemailer from 'nodemailer';
const config = {
    host: 'smtp.mailgun.org',
    port: 587,
    secure: true,
    auth: {
      user: 'postmaster@sandbox51aef75c4c0f4a668c7459758faf2c2e.mailgun.org',
      pass: '07e1c13bec113317fa74e34cc9685dd2-8c90f339-fc110ef3',
    },
  };
  
  export async function sendEmail(to, token) {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: 'noreply@sandbox51aef75c4c0f4a668c7459758faf2c2e.mailgun.org',
    to: 'jokernick@o2.pl',
    subject: 'Verify Your Email',
    text: `Hello! To get started, please click on the following link to verify your email and activate your account: http://localhost:3000/users/verify/${token}`,
    html: `<h2>Hello!</h2>
           <p>To get started, please click on the following link to verify your email and activate your account:<button type="button"><a href="http://localhost:3000/users/verify/${token}">activate account</a></button></p>
    `,
  };
  
  transporter
    .sendMail(emailOptions)
    .then(info => console.log(info))
    .catch(err => console.log(err));
  }