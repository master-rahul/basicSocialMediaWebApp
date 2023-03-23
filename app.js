const express = require('express')                  // Fetch express modules.
const bodyParser = require('body-parser')           // Fetch body-pareser modules.
const cookieParser = require('cookie-parser')       // Fetch cookie-parser modules  .
const expressLayouts = require('express-ejs-layouts');      // Fetch the Express-EJS layout module.
const passport = require('passport');               // Fetch passport modules.
const session = require('express-session');         // Fetch express-session modules
const MongoStore = require('connect-mongo');        // Fetch connect-mongo modules.
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
const passportLocal = require('./config/passport_local_strategy');
const passportJwt = require('./config/passport_jwt_strategy');  // must declared on the most outer index file
const passportGoogle = require('./config/passport_google_oauth2_strategy');
const ipAddress = require('./config/ipAddress');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const noty = require('noty');
const app = express();



app.set('view engine', 'ejs');              // Set View Engine 
app.set('views', './views');                // Set View Engine Path
app.set('layout extractStyles', true);      // SetLayout properties for extracting Styles.
app.set('layout extractScripts', true);     // Set Layout propertied for extracting Script.

// Middlewares :
app.use(sassMiddleware({
    src: './assets/scss',           // source to pick up the scss files to convert.
    dest: './assets/css',           // destination for the converted scss file
    debug: false,                   // prints error when the error in converting in scss to css.
    outputStyle: 'extended',        // all code in one line or multiple lined
    prefix: '/css'                  // use to redirect to './assets/ weheneer '/css' is found to template engine
}));
app.use(expressLayouts);            // to implements partials                                     
app.use(express.static('./assets'));    // to access files during rendering
app.use(bodyParser.urlencoded({extended : false}));    // parses form data into readable object
app.use(cookieParser());            // parses cookie 
app.use('/uploads', express.static(__dirname + '/uploads')); // making uploads path available for the browser

//app.use(express.static('./uploads'));
app.use(session({
    name: 'sample',
    secret: 'hello',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000 * 1000) },
    store: MongoStore.create(
        {                                      // mongo store is used to store cookie in db.
            mongoUrl: 'mongodb://localhost/basicSocialMediaWebApp',
            autoRemove: 'native',
            autoRemoveInterval: 30
        }, function (error) {
            console.log(error || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/', require('./routes/route'));

app.listen(process.env.PORT || 8000, ipAddress, function(error){
    if(error) console.log('Error : Launcing Express Server : ', error)
    else console.log('Success : Launching Express Server') 
})