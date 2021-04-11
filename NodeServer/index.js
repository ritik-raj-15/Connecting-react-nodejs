const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(cors())
app.use(express.json());
app.post('/demo',(req,res)=>{
        console.log(req.body);
        let data = req.body.val;
      readFile((arr)=>{
            arr.push(data);
             
             WriteTasks(JSON.stringify(arr),(err)=>{
                     console.log("No error:"+err);
                     res.send("Pass")//sending only simple string
                    // res.json({status:'pass'})//axious,fetch sending json
             })
            });
 })
app.get('/demo',(req,res)=>{
  //  res.json(["hello","bhai"]);
    readFile((arr)=>{
        console.log(arr);
        res.json(arr);
      })
 })
app.listen(8000,()=>{
    console.log("Listening to Port: 8000");
});


function WriteTasks(data,callback)
{
    fs.writeFile("db.txt",data,(err)=>{callback(err);})
}

function readFile(callback)
{
    fs.readFile("db.txt","utf-8",(err,data)=>{
            if(err)
            {
                console.log("Error");
            }
            else
            {
                data= data && JSON.parse(data);
                callback(data || []);
            }
    })
}