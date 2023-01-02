import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aneese421@gmail.com',
    pass: ''
  }
});

var mailOptions = {
  from: 'aneese421@gmail.com',
  to: 'muhammadanees7284@gmail.com',
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