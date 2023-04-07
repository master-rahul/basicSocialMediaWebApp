const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const axios = require('axios');
const { google } = require('googleapis');
const fs = require('fs');

const CLIENT_ID = '967155473601-mttk14g6npamvvq95.apps.googleusercontent.com'
const CLIENT_SECRET = 'GOCSPX-QNswCwC84qP-C8v';
const REDIRECT_URI = 'http://localhost:8000/user/auth/google/callback';
var ACCESS_TOKEN = 'ya29.a0Ael1jId-Q-UACJyJJFCuHFXtEgaeHG1w7qPO5J3mGiMq0HGYaKCjLO1UUWh2g_cob52umOnlzuqkODxuRnWKb93IFE9Mvn-3cS_guZq8cFpNuIpeS18TG-DSIBaCgYKAacSARASFQF4udJh_DzKmB97i7a-yVGHmNMMmQ0163';
var REFRESH_TOKEN = '1//04lC25d9P2SNwF-L9IrTpfhkznHzUeu1ynbzzIGy8nZKcdPzLre7v4fS8i-9OqD9JwMU2qtEElWBkKgRWc-BpE';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

let refreshToken = () =>{
    console.log('CHECKING REFRESH TOKENS');
    axios.post(TOKEN_ENDPOINT, {
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN
    }).then((response) => {
        console.log('New access token:', response.data.access_token);
        ACCESS_TOKEN = response.data.access_token;
    }).catch((error) => {
        console.error('Error getting new access token:', error);
    });
}


let sendMailFromServiceAccount = () => {
    // Load the private key file for the service account
    const privateKeyFile = '/Users/extreme/Web Development/Backend/Node_Express_EJS/basicSocialMediaWebApp/annular-sky-382807-caecad8d99f2.json';
    const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

    // Create a new JWT client using the private key
    const jwtClient = new google.auth.JWT({
        email: 'basicsocialmediaapp@annular-sky-382807.iam.gserviceaccount.com',
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/gmail.send']
    });

    // Request an access token using the JWT client
    jwtClient.authorize((err, tokens) => {
        if (err) {console.error('Error authenticating:', err); return;}
        const accessToken = tokens.access_token;
        console.log('Access token:', accessToken);
        // Use the access token to authenticate your requests to the Gmail API
        const gmail = google.gmail({ version: 'v1', auth: jwtClient });
        gmail.users.messages.send({
            userId: 'me',
            requestBody: {raw: 'Your Comment is Published'}
        }, (err, res) => {
            if (err) {console.error('Error sending email:', err);return;}
            console.log('Email sent:', res.data);
        });
    });
}




let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth: {
        type: 'OAuth2',
        user: 'coder.rahulverma@gmail.com',
       // clientId: CLIENT_ID,
       // clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN
    },
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers/comments', relativePath),
        data,
        function (error, template) {
            if(error){ console.log('ERROR in rendering mail template', error); return;}
            mailHTML = template;
        }
    )
    return mailHTML;
}
 
module.exports = {
    transporter : transporter, 
    renderTemplate : renderTemplate,
    refreshToken : refreshToken,
    sendMailFromServiceAccount: sendMailFromServiceAccount
};
