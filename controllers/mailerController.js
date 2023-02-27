const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const path = require('path');
const viewPath = path.resolve(__dirname, '../templates/views/');
const partialsPath = path.resolve(__dirname, '../templates/partials');

const sendMail = (userEmail, userName, clientName, duration, date, time) => {
  console.log('mail data ', userEmail, userName, clientName, duration, date, time);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 467,
    auth: {
      // user: 'prodev004@gmail.com',
      user: 'nicemanwind820@gmail.com',
      // pass: 'uaxxmaxqyqdttcsh'
      pass: 'eoavpwlhgaauwpnm'
    }
  });
  var mailOptions = {
    from: 'nicemanwind820@gmail.com',
    to: userEmail,
    subject: 'A New Booking from Clientl',
    template: 'index',
    context: {
      user: userName,
      client: clientName,
      duration: duration,
      date: date,
      time: time,
    },
    attachments: [
      { filename: 'logo.png', path: path.resolve(__dirname, '../assets/images/metronic.png') }
    ]
  };

  transporter.use('compile', hbs({
    viewEngine: {
      //extension name
      extName: '.handlebars',
      // layout path declare
      layoutsDir: viewPath,
      defaultLayout: false,
      //partials directory path
      partialsDir: partialsPath,
      // express
    },
    //View path declare
    viewPath: viewPath,
    extName: '.handlebars',
  }));

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendCreateMail = (userEmail, userName, clientName, duration, date, time) => {
  // console.log('mail data ', userEmail, userName, clientName, duration, date, time);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 467,
    auth: {
      // user: 'prodev004@gmail.com',
      user: 'nicemanwind820@gmail.com',
      // pass: 'uaxxmaxqyqdttcsh'
      pass: 'eoavpwlhgaauwpnm'
    }
  });
  var mailOptions = {
    from: 'nicemanwind820@gmail.com',
    to: userEmail,
    subject: 'A New Booking from Clientl',
    template: 'createBooking',
    context: {
      user: userName,
      client: clientName,
      duration: duration,
      date: date,
      time: time,
    },
    // attachments: [
    //   { filename: 'logo.png', path: path.resolve(__dirname, '../assets/images/metronic.png') }
    // ]
  };

  transporter.use('compile', hbs({
    viewEngine: {
      //extension name
      extName: '.handlebars',
      // layout path declare
      layoutsDir: viewPath,
      defaultLayout: false,
      //partials directory path
      partialsDir: partialsPath,
      // express
    },
    //View path declare
    viewPath: viewPath,
    extName: '.handlebars',
  }));

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendApproveMail = (
  client_email,
  mailSubject,
  mailContent
) => {
  console.log('mail data ', client_email, mailSubject, mailContent);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 467,
    auth: {
      // user: 'prodev004@gmail.com',
      user: 'nicemanwind820@gmail.com',
      // pass: 'uaxxmaxqyqdttcsh'
      pass: 'eoavpwlhgaauwpnm'
    }
  });
  var mailOptions = {
    from: 'nicemanwind820@gmail.com',
    to: client_email,
    subject: mailSubject,
    template: 'approveBooking',
    context: {
      mailContent: mailContent
    },
    // attachments: [
    //   { filename: 'logo.png', path: path.resolve(__dirname, '../assets/images/metronic.png') }
    // ]
  };

  transporter.use('compile', hbs({
    viewEngine: {
      //extension name
      extName: '.handlebars',
      // layout path declare
      layoutsDir: viewPath,
      defaultLayout: false,
      //partials directory path
      partialsDir: partialsPath,
      // express
    },
    //View path declare
    viewPath: viewPath,
    extName: '.handlebars',
  }));

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendMail,
  sendCreateMail,
  sendApproveMail,
}