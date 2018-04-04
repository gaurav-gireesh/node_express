const express   =   require('express');
const path = require('path');
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash');
const expressValidator = require('express-validator');
db_url  =   'mongodb://localhost:27017/nodekb';
mongoose.connect(db_url);

mongoose.connection.on('connected',()=>console.log("Database connected successfully"))
mongoose.connection.on('error',(err)=>console.log(err));
app = express();
const api=require('./routes/api');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


//express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }))


//for messaging 
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//Express validator
app.use(expressValidator({
    errorFormatter:function(param,msg,value)
    {var namespace = param.split('.'),

    root=namespace.shift()
    ,formParam=root;
    while(namespace.length)
    {
        formParam  += '['+namespace.shift() + ']';
    }
    return{
        param: formParam,
        msg:msg,
        value:value
    };
}
}));

app.get('/index',(req,res)=>{

   
    res.render('index');
});

app.use('/articles',api);app.use('/users',require('./routes/users'));

app.listen(3000,()=>console.log("server started") );