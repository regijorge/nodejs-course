const sgMail = require('@sendgrid/mail')

const sgApiKey = process.env.SENDGRID_API_KEY
const sgEmailSender = process.env.SENDGRID_EMAIL_SENDER

sgMail.setApiKey(sgApiKey)

const sendWelcomeEmail = (email, name) => {
  try {
    sgMail.send({
      to: email,
      from: sgEmailSender,
      subject: 'Welcome',
      text: `Hey ${name}! Welcome to this app!`
    })
  } catch (error) {
    console.log(error)
  }
}

const sendCancelationEmail = (email, name) => {
  try {
    sgMail.send({
      to: email,
      from: sgEmailSender,
      subject: 'Goodbye',
      text: `Hey ${name}! Goodbye!`
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}