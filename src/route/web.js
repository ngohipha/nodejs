import express from "express";
import homeController from '../controller/homecontroller';

let router = express.Router();
const initwevRoute = (app) => {
    router.get('/',homeController.getHomepage );
      router.get('/about' , (req , res )=>{
        res.send('ahihi do ngoc')
      })
      return app.use('/', router)
}
// dinh nghia khai bao 1 cai route 
module.exports = initwevRoute;