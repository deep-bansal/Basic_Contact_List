const express = require('express');

//path module
const path = require('path');
const port = 8000;

//this app has all the functionlities of this expess module 
const app = express();

//telling server that ejs is view engine
app.set('view engine', 'ejs');

//telling where we will store our views
app.set('views',path.join(__dirname,'views'));

//used for middlewares
//this is used for parser
//urlencoded is called before every controller
//it only reads form parameters only
app.use(express.urlencoded());

//accessing the static files
app.use(express.static('assets'));


var contactList = [

    {
        name : "Deep Bansal",
        number : 9875642845
    }
  
]

//only to get the html page and no changes in it
//these are basically controllers
app.get('/',function(req,res){

    //res.send("<h1>Cool working fine</h1>");
    
    //with rendering we can also send data to the file
    res.render('home', {
        title : "Contacts list",
        contact_list : contactList
    });
});

//route for receiving data from form
app.post('/create-contact',function(req,res){

    //  contactList.push({
    //    name: req.body.name,
    //    number: req.body.number
    //});
    //added parse data to contact list
    contactList.push(
       req.body
    );   

    return res.redirect('back');
});

//string param

// app.get('delete-contact/:phone',function(req,res){
//     console.log(req.params);
//     let phone = req.params.phone;

//     let contactIndex = contactList.findIndex(contact => contact.number == phone);

//     if(contactIndex != -1){
//         contactList.splice(contactIndex,1);
//     }

//     return res.redirect('back');

// });

//query parameter
app.get('/delete-contact',function(req,res){

    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.number == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back');

});

app.listen(port,function(err){
    if(err){console.log('error in running the server',err);}

    console.log('server working fine on port',port);

});