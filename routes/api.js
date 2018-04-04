var express=require('express');
var Article = require('../models/articles')

router = express.Router();
//fetching the list of articles 
router.get('/',(req,res)=>{
    Article.find({},(err,data)=>
{
    if(err) throw err
   
    res.render('articles',{articles:data});
});

    
});

//trying to see if the add articles is working

router.get('/add',function(req,res)
{
    
    res.render('add_article');
});

//creating an article
router.post('/add',(req,res)=>{
    

    req.checkBody('title',"Title cannot be empty!").notEmpty();
    req.checkBody('body',"Body cannot be empty!").notEmpty();
    req.checkBody('author',"Author cannot be empty!").notEmpty();

    let errors = req.validationErrors();
    if(errors)
    {
        res.render('add_article',{'errors':errors});
    }
    else{
        let article = new Article();
    article.name=req.body.title;
    article.body=req.body.body;
    article.author=req.body.author;
    article.save((err)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            console.log("Article has been created!");
            req.flash('success',"Article added !");
            res.redirect('/articles');
        }
    });

    }

   
});


//article detail
router.get('/:id',(req,res)=>
{
    Article.findById(req.params.id,function(err,article){
        if(err)
        {
            console.log("Error: article not loaded!"+err);
        }
        else
        {
            res.render('article_detail',{article:article});
        }
    })
}
);




//article edit
router.get('/edit/:id',(req,res)=>
{
     Article.findById(req.params.id,(err,article)=>
    {
        if(err)
        {
            console.log("Error in edit article!");
        }
        else{
            res.render('edit_article',{article:article});
        }
    });
});

//edit submit an article
router.post('/edit/:id',(req,res)=>{
    let article = {};
    article.name=req.body.title;
    article.body=req.body.body;
    article.author=req.body.author;


    Article.update({_id:req.params.id},article,(err)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            console.log("Article has been updated!");
            req.flash('success',"Article updated!");
            res.redirect('/articles');
        }
    });
});

//delete an article
router.delete('/:id',(req,res)=>
{
    Article.remove({_id:req.params.id},(err)=>
    {
        if(err) console.log(err);
        else
        res.send("Success");

    })
});

module.exports=router;