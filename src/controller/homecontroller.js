 import multer from "multer";
import pool from "../configs/connectDB";
import { buildExternalHelpers } from "@babel/core";
let getHomepage = async (req , res )=>{

      const [rows, fields] = await pool.execute('SELECT * FROM users');
                return  res.render("index.ejs", {dataUser: rows , test:'abc'});
    
   
}
let getDetailPage = async (req,res)=> {
  let userId = req.params.id;
  let [user] = await pool.execute(`select * from users where id =?`,[userId]);
  return res.send(JSON.stringify(user));
}
let createNewUser = async (req ,res) =>{
  let{firstName,lastName,email,address} =req.body
  await pool.execute(` insert into users(firstName,lastName,email,address) values(?,?,?,?)`,[firstName,lastName,email,address])
  return res.redirect('/');
}
let deteleUser =async (req,res)=>{
  let userId = req.body.userId;
  await pool.execute(`delete from users where id =? `,[userId])
  return res.redirect('/');

}
let getEditPage = async (req ,res)=> {
  let id = req.params.id;
  let [user] = await pool.execute('Select * from users where id = ?' ,[id])
  return res.render(`update.ejs`,{dataUser:user[0]});
}
let postUpdateUser = async (req ,res)=>{
  let{firstName,lastName,email,address,id }=req.body
  await pool.execute(`update users set firstName= ? , lastName= ? , email= ? ,address = ? where id =? `,[firstName,lastName,email,address,id]);
  return res.redirect('/');
}
let getUploadFilePage = async(req,res)=>{
  return res.render('uploadfile.ejs');
}

const upload = multer().single('profile_pic');
let handleUploadFile = async(req , res)=>{
  upload(req,res , function(err){
    if(req.fileValidationError){
      return res.send(req.fileValidationError);
    }else if (!req.file){
      return res.send('please select an image to upload');
    }else if (err instanceof multer.MulterError){
      return res.send(err);
    }
    else if (err){
        return res.send(err);
    }
    res.send(`you have uploaded this image:<hr/> <img src="/image/${req.file.filename}" width="500"><hr/><a href="/upload">Upload another image</a>`)
  });
}
module.exports = {
    getHomepage , getDetailPage ,createNewUser,deteleUser,getEditPage,postUpdateUser,getUploadFilePage,handleUploadFile
}
