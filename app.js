const express = require('express')                                                      // To fetch express module, used for creating HTTP server
const bodyParser = require('body-parser')                                               // To fetch body-parser module, used for parsing request body
const cookieParser = require('cookie-parser')                                           // To fetch cookie-parser module, used for parsing cookie
const logger = require('morgan');
require('./config/view_helpers');
const expressLayouts = require('express-ejs-layouts');                                  // To fetch express-ejs-layouts module, used for redering partials 
const passport = require('passport');                                                   // To fetch passport module, used for multiple authentication strategy
const expressSession = require('express-session');                                      // To fetch express-session module, used with passport for creating session-cookies
const MongoStore = require('connect-mongo');                                            // To fetch connect-mongo module, used for connecting MongoDB and in our case allowing us to store session documents in Session Model.
const sassMiddleware = require('node-sass-middleware');                                 // To fetch node-sass-middleware, used for converts .scss files to css.
const db = require('./config/mongoose');                                                // To fetch the configuration of mongoose for connecting to MongoDB database.
const passportLocal = require('./config/passport_local_strategy');                      // To fetch the configuration of passport-local strategy for creating middlewares for accessing request.
const passportJwt = require('./config/passport_jwt_strategy');                          // To fetch the configuration of passport-jwt strategy for creating middlewares for accessing request.
const passportGoogle = require('./config/passport_google_oauth2_strategy');             // To fetch the configuration of passport-oauth2 stragtegy for creating middleware for accessing request.
const env = require('./config/environment');
const path = require('path');
const ipAddress = require('./config/ipAddress');                                        // To fetch ipAddress module, used for getting local ipAddress of the system for hosting.
const flash = require('connect-flash');                                                 // To fetch connect-flash module, used for send flash noticication in webpage
const customMiddleware = require('./config/middleware');                                // To fetch middleware module, used to add certains fields in response 
const noty = require('noty');                                                           // To fetch noty module, used for beautifying the flash messages
const environment = require('./config/environment');
const app = express();                                                                  // To fetch express module, used for creating HTTP server with support of other application protocols

// Setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);                                         // Creating a chatServer using http.
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);           // Passing chatServer to chatSockets.
chatServer.listen(4000);                                                                // Starting the chatServer at port 5000
console.log('Chat Server is listening on port 4000');

app.set('view engine', 'ejs');                                                          // Sets the type of view engine used to render the webpages before responding to the request.
app.set('views', './views');                                                            // Sets the path for files which needs to be rendred using the view engine before sending response.
app.set('layout extractStyles', true);                                                  // Sets that the styles files '.css' needs to be extracted from partials.
app.set('layout extractScripts', true);                                                 // Sets that the scripsts files '.js' needs to be extracted from partials.

// Middlewares :
if(env.name == 'development'){
    app.use(sassMiddleware({                                                                // This middleware allows us to populate css files from scss files 
        src: path.join(__dirname, env.asset_path, '/scss'),                                  // source to pick up the scss files to convert.
        dest: path.join(__dirname, env.asset_path, '/css'),                                  // destination for the converted scss file
        debug: false,                                                                       // prints error when the error in converting in scss to css.
        outputStyle: 'extended',                                                            // all code in one line or multiple lined
        prefix: '/css'                                                                      // use to redirect to './assets/ weheneer '/css' is found to template engine
    }));
}
app.use(logger(env.morgan.mode, env.morgan.options));
app.use(expressLayouts);                                                                // Middleware for able to render partials from the rendered pages.
//app.use('/js', express.static(__dirname + '/assets/js'));
app.use(express.static(env.asset_path));                                                    // Middleware which serves respectives folder for client to request for the dependent files.
app.use(bodyParser.urlencoded({extended : false}));                                     // Middleware used to parser request body and convert into a readable object.
app.use(cookieParser());                                                                // Allows to parse cookies present in request in order to verify authentication.   
app.use('/uploads', express.static(__dirname + '/uploads'));                            // Making the uploads path available for client for requesting dependent files.

app.use(expressSession({                                                                // Express-session created after authentication
    name: 'sample',                                                                     // Cookie Name
    secret: env.session_cookie_key,                                                                    // Cooke Secret
    saveUninitialized: false,                                                           
    resave: false,
    cookie: { maxAge: (1000 * 1000) },                                                  // Age of Cookie.
    store: MongoStore.create(                                                           // Creates a Model in MongoDb
        {                                                                                
            mongoUrl: 'mongodb://localhost/basicSocialMediaWebApp',                     // Database URL
            autoRemove: 'native',                                                       
            autoRemoveInterval: 30                                                      // Cookie Reomval timeperiod
        }, function (error) {   
            console.log(error || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());                                                         // Intializes passport middleware 
app.use(passport.session());                                                            // Passport Session
app.use(passport.setAuthenticated);
app.use(flash());                                                                       // Using Flash Middleware
app.use(customMiddleware.setFlash);                                                     // Middleware for custom message in
app.use('/', require('./routes/route'));                                                // Routes the request to the route.js file in ./routes directory
app.listen(process.env.PORT || 8000, ipAddress, function(error){
    if(error) console.log('Error : Launcing Express Server : ', error)
    else console.log('Success : Launching Express Server') 
})