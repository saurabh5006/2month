const express = require("express");
const app = express();
const port = 8080;

// views and public folder ko acess karne ke liye path require karna padega.
const path = require("path");

methodOverride = require('method-override')

app.use(methodOverride('_method'))

// const uuid = require("uuid");

// import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require("uuid");
// const { v4: uuidv4 } = require("uuid");


 
//frontend se se jabhi form submit hota hai or data ko express samj paye iske liye middelware use karnege.
// sari jo api reques hai wo data ko samj paye express
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
// views folder ke liye
app.set("views", path.join(__dirname,"views"));
// public folder join karne ke liye.
app.use(express.static(path.join(__dirname, "public")));
// app.set(express.static(path.join(__dirname, "public")));

// for example database banayenge in array.

let posts = [
    {
        // show perticuler data using get so we will give ID 
        id : "a1",
        username: "apnacollege",
        content : "i love coding"
    },
    {
        id: "b2",
        username : "saurabhsingh",
        content : "hard work is important to achieve sucess"
    },
    {
        id: "c3",
        username : "rahulkumar",
        content : "i got selected my first internship"
    }
]

app.get("/posts",(req,res)=>{
    //here we have sharing the data in ejs file.
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

//data lega it mean add karega
// create
app.post("/posts",(req,res)=>{
    let { username, content} = req.body;
    posts.push({ username, content});
    // console.log(req.body);
    // res.send("submited")
    //difrent pages ko connect karne ke liye hum res.redirect(URL) use kar sakte hai
    //ye get request he bhejega 
    res.redirect("/posts");
})

//view perticular data using ID
// read perticular data
app.get("/posts/:id", (req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>p.id===id);
    // console.log(post);
    
    // res.send("request working")
    res.render("show.ejs", {post})
});

// jo bhi id ayega abhi wo html se hoke ayegi
// rout nhi milta hai kabhi kabar because speling mistake
// patch request change karti hai
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id===id);
    post.content = newContent;
    // console.log(post);
    // res.send("patch request working")
    // isme hum abhi data nhi bhej rahe hai q 
    res.redirect("/posts")

});
// id ke hisab se data yaha ajayega automatic ejs se
// jaise he html par click karenge ye api hit hoga
app.get("/posts/:id/edit", (req,res)=>{
    // jise he rout me /posts/2b/edit hit huwa 
    let {id}= req.params;
    // wiase he ye sab under ka run karega id compair hogi ki data base me hai ki nhi pher wo document se kuch bhi match huwa to 
    let post = posts.find((p)=>p.id===id);
    // find method sab compair karne ke bad sab bhejega edit =.ejs file ko data pher waha 
    res.render("edit.ejs", {post})
});


app.delete("/posts/:id",(req,res)=>{
        let {id}= req.params;
        //variable me store nhi karwa raha hu
         posts =posts.filter((p)=>p.id!==id);
         res.redirect("/posts")
        // res.send("done")
})  

//basic rout banayenge
app.get("/",(req,res)=>{
    res.send("you are on the currect page")
})

app.listen(port, ()=>{
    console.log(`running on ${port}`);
});

