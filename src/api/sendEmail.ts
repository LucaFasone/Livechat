import 'dotenv/config';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const USER_EMAIL = process.env.GMAIL_USER;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

// Configura il client OAuth2
export const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
});


oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

export const sendEmail = async () => {
    const { token } = await oauth2Client.getAccessToken();
    oauth2Client.setCredentials({
        access_token: token
    });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const emailLines = [
        `From: "Your Name" <luca.fasone1@gmail.com>`,
        'To: luca.fasone15@gmail.com',
        'Subject: Test email',
        '',
        'Hello, this is a test email from Gmail API!',
    ];

    const email = emailLines.join('\n');

    const base64EncodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_'); // URL safe base64 encoding

    try {
        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: base64EncodedEmail,
            },
        });
        console.log('Email sent:', res.data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

console.log('Authorize this app by visiting this url:', authUrl);