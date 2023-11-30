require('dotenv').config({path:"./.env"});
const express = require('express');
const app = express();
app.use(require('cors')({ origin:true,credentials:true }));


require('./models/database.js').connectDatabase();
//loger
const logger = require('morgan');
app.use(logger('tiny'));

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false }));

const expressSession = require("express-session");
const cookieparser = require("cookie-parser");

app.use(expressSession({
  resave:true,
  saveUninitialized:true,
  secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieparser());


app.use('/',require('./routes/indexRoutes.js'));
app.use('/hotel',require('./routes/sellerRoutes.js'));


const ErrorHandler = require('./utils/ErrorHandler.js');
const { generatedErrors } = require('./middlewares/errors.js');

app.all('*',(req,res,next)=>{
  next (new ErrorHandler(`requsted url not found ${req.url}`),404);
})
app.use(generatedErrors);



app.listen(process.env.PORT,console.log(`server running on port ${process.env.PORT}`))