import express from "express";
import apicontroller from '../controller/apicontroller';

let router = express.Router();
const initAPIRoute = (app) => {
    router.get('/users',apicontroller.getAllUsers);
    router.post('/create-user',apicontroller.createNewUser);
    router.put('/update-user',apicontroller.updateUser);
    router.delete('/delete-user/:id',apicontroller.deleteUser);
    return app.use('/api/v1/',router);
}
export default initAPIRoute;