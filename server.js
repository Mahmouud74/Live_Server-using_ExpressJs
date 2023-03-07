const express = require('express');
const app=express();
const path =require("path")
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const fs = require('fs');
var client = {};
var welcomeHtml = fs.readFileSync("./public/welcome.html").toString();
const port = process.env.PORT || 4000;

app.get('/home.html',(req,res)=>{
    res.sendFile("home.html");
})
app.post('/welcome',(req,res)=>{
    client=req.body;
    fs.readFile('./public/clients.json', (err, data) => {
        if (err) throw err;
         myData = JSON.parse(data);
       
        myData.push(client)
        data = JSON.stringify(myData)
        fs.writeFile('./public/clients.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });
    console.log(client);
    welcomeHtml = welcomeHtml.replace("{clientName}",client.name)
    welcomeHtml = welcomeHtml.replace("{MobilePhone}",client.mobile)
    welcomeHtml = welcomeHtml.replace("{Email}",client.email)
    welcomeHtml = welcomeHtml.replace("{Address}",client.address)
    res.send(welcomeHtml);
    welcomeHtml = welcomeHtml.replace(client.name,"{clientName}")
    welcomeHtml = welcomeHtml.replace(client.mobile,"{MobilePhone}")
    welcomeHtml = welcomeHtml.replace(client.email,"{Email}")
    welcomeHtml = welcomeHtml.replace(client.address,"{Address}");
   // res.sendFile(path.join(__dirname,'public/welcome.html'));
})
// app.post()
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})

