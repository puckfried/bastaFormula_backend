import nodemailer from 'nodemailer';
import 'dotenv/config'
async function mailMe({email, message}){
  try{

    let testAccount = await nodemailer.createTestAccount();
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "mail.systemli.org",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL, // generated ethereal user
          pass: process.env.PW, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Roboterfreund 👻" <basta-robi@systemli.org>', // sender address
        to: email, // lisbt of receivers
        subject: "Deine Mail an uns", // Subject line
        text: 'Hallo, du hast uns eine Mail über das Kontaktformular geschickt, hiermit erhälst du eine Bestätigung darüber. Wir werden uns so schnell es geht, bei dir melden. Bitte antworte nicht auf diese Mail!', // plain text body
        html: '<b>Hallo,</b><br><p>du hast Basta eine Mail über das Kontaktformular geschickt, hiermit erhälst du eine Bestätigung darüber. Wir werden uns so schnell es geht, bei dir melden.</p><p>Bitte anworte nicht auf diese Mail</p>', // html body
      });
    
      let toList = await transporter.sendMail({
        from: '"Roboterfreund 👻" <basta-robi@systemli.org>', // sender address
        to: "puckfried@posteo.de", // lisbt of receivers
        subject: "Mail vom Kontaktformular", // Subject line
        text: `Absender: ${email} Nachricht: ${message}`, // plain text body
        html: `<p><b>Absender: ${email}</b><p><p><b>Message: </b>${message}</p>`,
      });
    
      console.log("receipe sent to user: %s", info.messageId);
      console.log("receipe sent to list: %s", toList.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
  } catch(error){
    console.log(error)
  } 
} 



export default function processData(req,res){
    console.log('req arrived: ', req.body)
    mailMe(req.body)
    console.log(process.env.MAIL, process.env.PW)
    res.send('data arrived')

  }