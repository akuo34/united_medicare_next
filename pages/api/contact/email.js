const transporter = require('../../../components/mailerConfig.js');
const model = require('../../../database/model.js');

export default async (req, res) => {
  
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;
    const contact = await model.getAbout();
    const toEmail = contact[0].email;

    try {
      const mailOptions = {
        from: process.env.EMAILER_ACCOUNT,
        to: toEmail,
        subject: subject,
        html: `
        <p> You have a message from ${name}.</p>
        <ul>
          <li>Email: ${email}</li>
          <li>Subject: ${subject}</li>
        </ul>
        <p>${message}</p>
        `
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send('Message sent successfully!');
        }
      });
    } catch (err) {
      res.status(400).send('Message failed to send');
    }
  }
}