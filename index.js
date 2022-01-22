require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/user');
const AvatarRouter = require('./routes/upload');

//New
var push = require('web-push');
let vapidKeys = {
    publicKey: 'BGDdtg4B3fXUvOJg_coC0y_cfYjXkEBBsi63Js1BieWHJ_CnwgvJoX1YjkKsOu8w9T_9albH2aKD--YaDM1J_Wo',
    privateKey: 'mtAqu_bSMZ4y7ZB6VdeA3D5tahcYdVYymOtbP_FKRDU'
}
push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey);

let sub = {};
push.sendNotification(sub, "test message")

//New
const { Server } = require('socket.io');
const { createServer } = require('http');


const app = express();

//New
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
  });

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));

//Routes
app.use('/user', userRouter);
app.use('/api', AvatarRouter);

app.use('/', (req, res, next) => {
    res.json({message: "Hello"})
})

const PORT = process.env.PORT || 5000;

const url = process.env.MONGODB_URL;
mongoose.connect(url, {useNewUrlParser: true}, (err)=>{
    if(err) throw err;
    console.log("Connected to Database");
})

let users = [];

const addUser = (username, userId) => {
    !users.some(user => user.username == username) && users.push({username, userId})
}

const removeUser = (socketId) =>{
    users = users.filter((user) => user.userId !== socketId);
}

const getUser = (username) => {
    return users.find(user => user.username === username)
    // console.log("Users: ",users);
    // console.log("New User",users.find((user) => user.username == username));
}

io.on('connection', function (socket) {
    // console.log("Someone Connected");
    // console.log(socket.id);

    socket.on("newUser", (newUser) => {
        addUser(newUser, socket.id);
        //console.log("User: ",users);
    });

    socket.on("getUser", (username) => {
        const user = getUser(username);
        if(username == "Sajjad") io.to(user.userId).emit("getNotification", "hello world")
    })

    io.emit("firstNotification", "Hello World");

    socket.on("disconnect", () =>{
        //console.log("Left");
        removeUser(socket.id)
    })
});


// app.listen(PORT, () => {
//     console.log("Listening at Port",PORT);
// })

//New
httpServer.listen(PORT, () => {
    console.log("Listening at Port",PORT);
})