import express from "express";

import homeController from '../controller/homecontroller';
import multer from "multer";
import path from 'path';
import { networkInterfaces } from "os";
import { nextTick } from "process";
var appRoot= require(`app-root-path`);
let router = express.Router();
const storage = multer.diskStorage({
  destination: function (req , file , cb){
    cb (null,appRoot+"/src/public/image/");
  },
  filename:function(req ,file ,cb){
    cb(null, file.fieldname +'-'+ Date.now() + path.extname(file.originalname) );
  }
});
const imageFiler = function(req ,file , cb){
  if(!file.originalname.match(/\.(jpeg|JPEG|jpg|JPG|png|PNG|gif|GIF)$/)){
    req.fileValidationError = 'only image files are allowed!';
    return cb(new Error ('only image files are allowed!'),false);
  }
  cb(null,true);
};
let upload = multer({storage: storage , fileFilter: imageFiler});
let upload1 = multer({storage: storage , fileFilter: imageFiler}).array('multiple_images',3);
const initwevRoute = (app) => {
    router.get('/',homeController.getHomepage );
    router.get('/detail/user/:id' , homeController.getDetailPage);
    router.post('/create-new-user' , homeController.createNewUser);
    router.post('/delete-user' ,homeController.deteleUser);
    router.get('/edit-user/:id',homeController.getEditPage);
    router.post('/update-user',homeController.postUpdateUser);
    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-pic',upload.single('profile_pic'),homeController.handleUploadFile);
    router.post('/upload-mutiple-images',
    // hendle middleware error 
    (req,res, next)=>{
      upload1(req,res,(err)=>{
        if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE"){
          //hendle multer file limit err here
          res.send('LIMIT_UNEXPECTED_FILE')
  
        }else if (err){
          res.send(err)
          
        }else {
          //make sure to call next() if all was well
        next();   
         }
      })
  
  }, homeController.handleuploadMultipleFiles)
      router.get('/about' , (req , res )=>{
        res.send('ahihi do ngoc')
      })
      return app.use('/', router)
}
// dinh nghia khai bao 1 cai route 
module.exports = initwevRoute;