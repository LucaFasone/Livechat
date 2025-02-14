import * as fs from 'fs';
import 'dotenv/config';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN || '';

export const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
if (REFRESH_TOKEN) {
    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
    });
} else {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/gmail.send'],
        prompt: 'consent',
    });
    console.log('Authorize this app by visiting this url:', authUrl);
}
oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        saveRefreshToken(tokens.refresh_token!);
    }
});

function saveRefreshToken(refreshToken: string) {
    //TODO SAVE IT IN REDIS
    const envPath = ".env";
    let envVars = fs.readFileSync(envPath, 'utf-8');
    if (envVars.includes('GMAIL_REFRESH_TOKEN=')) {
        envVars = envVars.replace(/GMAIL_REFRESH_TOKEN=.*/, `GMAIL_REFRESH_TOKEN=${refreshToken}`);
    } else {
        envVars += `\nGMAIL_REFRESH_TOKEN=${refreshToken}`;
    }
    fs.writeFileSync(envPath, envVars);
    console.log('✅ Refresh token salvato nel file .env');
}
export const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
