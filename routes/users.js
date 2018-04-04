const express = require('express');

const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
//first route to render the resgistration form template

router.get('/register',(req,res)=>
{
    res.render('register');
});


//second router to handle registration data
router.post('/register',(req,res) =>
{
    let name = req.body.name;
    let email=req.body.email;
    let username = req.body.username;
    let password  = req.body.password;
    let password2= req.body.password2;
    

    req.checkBody('name',"Name cannot be empty").notEmpty();
    req.checkBody('email',"Email cannot be empty").notEmpty();
    req.checkBody('email','Not a valid e-mail').isEmail();
    req.checkBody('username',"Username cannot be empty").notEmpty();
    req.checkBody('password',"Password cannot be empty").notEmpty();
    req.checkBody('password2',"Passwords do not match!").equals(req.body.password);

    let errors = req.validationErrors();

    if(errors)
    {
            res.render('register',{errors:errors});

    }
    else{

        let newUser = new User(
            {
                name:name,
                email:email,
                password:password,
                username:username
            }
        );

        //we should hash the password
        bcrypt.genSalt(10,(err,salt)=>
        {
            if(err)
            {
                console.log("Error generating the salt!");
            }
            else{
                    bcrypt.hash(newUser.password,salt,function(err,hash)
                {
                    if(err) console.log("Error : "+err);
                    else{
                        newUser.password=hash;
                        newUser.save((err)=>
                    {
                            if(err)
                            console.log("Error"+err);
                            else{
                                console.log("User registered successfully");
                                req.flash('success',"You are a registered member now! You can login!");
                                res.redirect('/users/login');
                            }

                    });
                    }
                })
            }
    });
        
    }
});

//login route
router.get('/login',(req,res)=>{
    res.render('login');
})

module.exports = router;