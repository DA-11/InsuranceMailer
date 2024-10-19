const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const port = 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
    port: 465,               
    host: "smtp.gmail.com",
       auth:{
        user: 'insuranceadvisormailer@gmail.com',
        pass: 'ewyz kowe zqjm wpjr'
      },
    secure: true,
});
    


route.post('/text-mail', (req, res) => {
    const { firstName, lastName, contactNumber, email, occupation, goals } = req.body;  // Extract data from form
    
    // Construct the email message body
    const text = `
        Client Details from Insurance Website:

        Name: ${firstName} ${lastName}
        Contact Number: ${contactNumber}
        Email: ${email} 
        Occupation: ${occupation}
        Financial Goal: ${goals}

        Thanks.
    `;

    console.log(text);
    console.log(goals);
    
    const mailData = {
        from: 'insuranceadvisormailer@gmail.com',
        to: 'rajeshacharya94@gmail.com',
        subject: `Client details of ${firstName}`,
        text: text
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});


