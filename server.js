'use strict';
const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const {default:axios}=require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT=process.env.PORT;
mongoose.connect('mongodb://ghaidaamohammad:Wgagb3mepwoqlNK6@amman301-shard-00-00.3ue6d.mongodb.net:27017,amman301-shard-00-01.3ue6d.mongodb.net:27017,amman301-shard-00-02.3ue6d.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-136fuv-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(PORT,()=>{
console.log(`im listening ${PORT}`);
})

//API 
app.get('/apiData',apiColorsData)
async function apiColorsData(req,res){
    const url='https://ltuc-asac-api.herokuapp.com/allColorData';
    const data= await axios.get(url);
    res.send(data.data);
}

const colorsschema = new mongoose.Schema({
 title: String,
 imageUrl:String

})
const userschema= new mongoose.Schema({
email:String,
colors:[colorsschema]

})
const userModal= mongoose.model('User',userschema);

function seedind(){
    const ghaidaa= new userModal({
        email:'ghaidaa97mohammadgmail.com',
        colors:[{
            title: "Black",
            imageUrl: "http://www.colourlovers.com/img/000000/100/100/Black.png",
        }]
    })
    const Razan= new userModal({
        email:'quraanrazan282@gmail.com',
        colors:[{
            title: "Black",
            imageUrl: "http://www.colourlovers.com/img/000000/100/100/Black.png"
        }]
    })
    ghaidaa.save();
    Razan.save();
}
//  seedind();

//get
app.get('/myData',(req,res)=>{
 const userEmail=req.query.userEmail
 userModal.find({email:userEmail},function(error,userInfo){
if(error){
    res.send('did not work')
}else{
    res.send(userInfo[0].colors)
}
 })   
})
// add
app.get('/addData',(req,res)=>{
    const userEmail=req.query.userEmail
    const  title= req.query.title
    const imageUrl= req.query.imageUrl
    const index=req.query.index 
    userModal.find({email:userEmail},function(error,userInfo){
   if(error){
       res.send('did not work')
   }else{
       const newObj={
         title: title,
        imageUrl:imageUrl
       }
       userInfo[0].colors[index].push(newObj)
       userInfo[0].save()
       res.send(userInfo[0].colors)
   }
    })   
   })
   //delete
   app.get('/deleteData',(req,res)=>{
    const userEmail=req.query.userEmail
    const index=req.query.index 
    userModal.find({email:userEmail},function(error,userInfo){
   if(error){
       res.send('did not work')
   }else{
       userInfo[0].colors.splice(index,1)
       userInfo[0].save()
       res.send(userInfo[0].colors)
   }
    })   
   })
   // update
   app.get('/addData',(req,res)=>{
    const userEmail=req.query.userEmail
    const  title= req.query.title
    const imageUrl= req.query.imageUrl
    const index=req.query.index 
    userModal.find({email:userEmail},function(error,userInfo){
   if(error){
       res.send('did not work')
   }else{
       
       userInfo[0].colors[index].title=title
       userInfo[0].colors[index].imageUrl=imageUrl
       userInfo[0].save()
       res.send(userInfo[0].colors)
   }
    })   
   })