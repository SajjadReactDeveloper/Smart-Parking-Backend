require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/user');
const carRouter = require('./routes/car');
const complaintRouter = require('./routes/complaints');
const responseRouter = require('./routes/response');
const AvatarRouter = require('./routes/upload');
const MessageRouter = require('./routes/Messages');
process.env.TZ = "Asia/Islamabad";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));

//Routes
app.use('/user', userRouter);
app.use('/car', carRouter);
app.use('/complaint', complaintRouter);
app.use('/response', responseRouter);
app.use('/message', MessageRouter);
app.use('/api', AvatarRouter);

const PORT = process.env.PORT || 5000;

const url = process.env.MONGODB_URL;
mongoose.connect(url, {useNewUrlParser: true}, (err)=>{
    if(err) throw err;
    console.log("Connected to Database");
})

app.listen(PORT, () => {
    console.log("Listening at Port",PORT);
})