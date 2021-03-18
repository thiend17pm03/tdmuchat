const nodeMail = require('nodemailer');
const env = require('./../../env/env')

/**
 * Gửi mail
 * @param {*} to  email
 * @param {*} subject transMail.subject
 * @param {*} htmlContent transMail.template
 * @returns  promise
 */
const sendMail = (to,subject,htmlContent) => {
  let transporter = nodeMail.createTransport({
    host : env.MAIL_HOST,
    port : env.MAIL_PORT,
    secure : false, // use SSL - TLS
    auth : {
      user : env.MAIL_USER,
      pass : env.MAIL_PASSWORD,
    }
  });

  let option = {
    from : env.MAIL_USER,
    to : to,
    subject : subject,
    html : htmlContent,
  }

  //console.log(option.html);
  return transporter.sendMail(option); // this return a promise
}

module.exports = sendMail;
