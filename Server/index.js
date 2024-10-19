const express=require("express")
const fs=require("fs")
const cors = require('cors')
var uniqid = require('uniqid'); 

const app=express()

app.use(express.json())
app.use(cors())

app.get("/product",(req,res)=>{
    // res.send("Hello World")
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            //  res.send(data)
            const newdata=JSON.parse(data)
            res.json(newdata)
            console.log(newdata)
        }
    })
})


app.post("/product",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            //  res.send(data)
            const newdata=JSON.parse(data)
            newdata.push(req.body)
            req.body.id=uniqid()
            fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
                if(err){
                    console.log(err)
                    res.send(err)
                }
                else{
                    res.send(newdata)
                }
            })
        }
    })
})

app.delete("/product/:id",(req,res)=>{
   const {id}=req.params;
   fs.readFile("./db.json","utf-8",(err,data)=>{
    if(err){
        console.log(err)
        res.send(err)
    }
    else{
        let newdata=JSON.parse(data)
        newdata = newdata.filter((el) => el.id != id);
        fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
            if(err){
                console.log("Interval Error")
                
            }
            else{
                res.send("Product Delete Successfully")
            }
        })
    }
   })
})

app.patch("/product/:id",(req,res)=>{
    const {id}=req.params;
    const productupdate=req.body
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            let newdata=JSON.parse(data)
            const index = newdata.findIndex((el) => el.id == id);
            if(index!=-1){
                newdata[index]={...newdata[index], ...productupdate}

                fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
                    if(err){
                      console.log(err)
                    }
                    else{
                      res.send("product edit")
                    }
                  })
            }
            else
            {
                console.log("404 not found")
                res.send("404 not found")
            }
        }
    })
})

app.put("/product/:id",(req,res)=>{
    const {id}=req.params;
    const productupdate=req.body
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            let newdata=JSON.parse(data)
            const index = newdata.findIndex((el) => el.id == id);
            if(index!=-1){
                newdata[index]={...newdata[index], ...productupdate}

                fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
                    if(err){
                      console.log(err)
                    }
                    else{
                      res.send("product edit")
                    }
                  })
            }
            else
            {
                console.log("404 not found")
                res.send("404 not found")
            }
        }
    })
})

app.listen(8080,()=>{
    console.log("Port is Run 8080")
})