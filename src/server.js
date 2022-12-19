// const express = require('express');
import initwedRoute from './route/web';
import  express  from 'express';
import configViewEngine  from './configs/configviewengine';
import initAPIRoute from './route/api';
import connection from './configs/connectDB';
require('dotenv').config();
var morgan = require('morgan')
const app = express()
const port = process.env.PORT || 8080;

app.use(morgan('combined'))
app.use((req,res, next)=>{
  // check => return res.send
  console.log('run into middleware');
  console.log(req.method);
  next();
});
// chuyen du lieu sang json //middleware to parse JSON data from request
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// setup view engine
configViewEngine(app);
// init web route 
initwedRoute(app);
// init api route
initAPIRoute(app);
// handle 404 not found
app.use((req,res)=>{
  return res.render('404.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})