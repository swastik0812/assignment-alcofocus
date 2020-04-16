const express = require('express');
require ('./db/mongoose');
const userRouter = require('./router/user');
const cors = require('cors');
const app = express();

app.use(cors());
app.option('*',cors());
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(userRouter);



app.listen(port,()=>{
    console.log('server is open on port' + port);

})