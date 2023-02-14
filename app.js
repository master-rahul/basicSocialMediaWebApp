const express = require('express')      // Fetch express modules.
const bodyParser = require('body-parser')       // Fetch body-pareser modules.
const cookieParser = require('cookie-parser')       // Fetch cookie-parser modules  .
const expressLayouts = require('express-ejs-layouts');      // Fetch the Express-EJS layout module.
const passport = require('passport');               // Fetch passport modules.
const session = require('express-session');         // Fetch express-session modules
const MongoStore = require('connect-mongo');        // Fetch connect-mongo modules.
const db = require('./config/mongoose');
const passportLocal = require('./config/passport_local_strategy');
const app = express()

app.set('view engine', 'ejs');      // Set View Engine 
app.set('views', './views');        // Set View Engine Path
app.set('layout extractStyles', true);      // SetLayout properties for extracting Styles.
app.set('layout extractScripts', true);     // Set Layout propertied for extracting Script.

// Middlewares :
app.use(expressLayouts);                                           
app.use(express.static('./assets'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(session({
    name: 'sample',
    secret: 'hello',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000 * 60 * 20) },
    store: MongoStore.create(
        {                                      // mongo store is used to store cookie in db.
            mongoUrl: 'mongodb://localhost/basicSocialMediaWebApp',
            autoRemove: 'disabled',
        }, function (error) {
            console.log(error || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);
app.use('/', require('./routes/route'));

app.listen(process.env.PORT || 8000, function(error){
    if(error) console.log('Error : Launcing Express Server : ', error)
    else console.log('Success : Launching Express Server') 
})