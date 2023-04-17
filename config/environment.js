const development = {
    name : 'development',
    asset_path : 'assets',
    session_cookie_key : 'hello',
    db : 'socialMediaAppDev',
    google_client_id: 'YOUR_CLIENT_ID',
    google_client_secret: 'YOUR_CLIENT_SECRET',
    google_call_back_url: 'http://localhost:8000/user/auth/google/callback',
    jwt_secret : 'secret'
}

const production = {
    name : 'production',
    asset_path: process.env.SOCIALMEDIAAPP_ASSET_PATH,
    session_cookie_key: process.env.SOCIALMEDIAAPP_SESSION_COOKIE_KEY,
    db: process.env.SOCIALMEDIAAPP_DB,
    google_client_id: process.env.SOCIALMEDIAAPP_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIALMEDIAAPP_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SOCIALMEDIAAPP_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIALMEDIAAPP_JWT_SECRET
}

module.exports = eval(process.env.SOCIALMEDIAAPP_ENVIRONMENT) == undefined ? development : eval(process.env.SOCIALMEDIAAPP_ENVIRONMENT);