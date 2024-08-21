const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD
    }
});

app.post('/api/send-email', async (req, res) => {
    const { to, cc, bcc, subject, text } = req.body;

    try {
        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to,
            cc,
            bcc,
            subject,
            text,
        });
        res.status(200).send('Email sent');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
