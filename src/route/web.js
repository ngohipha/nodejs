import express from "express";
import homeController from '../controller/homecontroller';

let router = express.Router();
const initwevRoute = (app) => {
    router.get('/',homeController.getHomepage );
    router.get('/detail/user/:id' , homeController.getDetailPage);
    router.post('/create-new-user' , homeController.createNewUser);
    router.post('/delete-user' ,homeController.deteleUser);
    router.get('/edit-user/:id',homeController.getEditPage);
    router.post('/update-user',homeController.postUpdateUser)
      router.get('/about' , (req , res )=>{
        res.send('ahihi do ngoc')
      })
      return app.use('/', router)
}
// dinh nghia khai bao 1 cai route 
module.exports = initwevRoute;