// const express = require('express');
import initwedRoute from './route/web';
import  express  from 'express';
import configViewEngine  from './configs/configviewengine';
import connection from './configs/connectDB';
require('dotenv').config();
const app = express()
const port = process.env.PORT || 8080;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// setup view engine
configViewEngine(app);
// init web route 
initwedRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})