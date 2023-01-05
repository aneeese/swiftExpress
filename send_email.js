import nodemailer from 'nodemailer';

export const sendMail = (from, to) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aneese421@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });
  
  var mailOptions = {
    from: from,
    to: to,
    subject: 'Sending Email using Node.js',
    text: `Lorem ipsum dolor, sit amet onsectetur adipisicing elit. Doloremque vero sapiente natus veniam eaque atque.`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
