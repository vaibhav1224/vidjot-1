const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session')
const app = express();
const passport = require('passport')
//Map gloab

//Load Routes

const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Dbconfig

const db = require('./config/database');

require('./config/passport')(passport);
//Connect to mongoose
mongoose.connect(db.mongoURI,{useMongoClient: true})
.then(() => console.log('MondoDb Connected ....'))
.catch(err => console.log(err));

//Static folder
app.use(express.static(path.join(__dirname,'public')));


//Handlebars Middleware
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}));
app.set('view engine','handlebars');

//Method override middleware

app.use(methodOverride('_method'))

//Express session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  
  }))
//PASSPORT MIDDLEWARE
  app.use(passport.initialize());
  app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//Connect Flash
app.use(flash());
//Global Variable

app.use(function(req,res,next){

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
// parse application/json
app.use(bodyParser.json())

//Index Route

app.get('/',(req,res) => {
const title = 'Welcome';
    res.render('index',{
        title: title
    });

});

// About Route
app.get('/about',(req,res) => {
    res.render('about');

});





//Use routes
app.use('/ideas',ideas)
app.use('/users',users)
    const port = process.env.PORT || 5000;


app.listen(port , () =>{console.log(`Server started on port ${port}`);}) ;
