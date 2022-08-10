const express = require('express')
const http = require('http')
const app = express()
const server =http.createServer(app)
const socket = require('socket.io')
const io = socket(server)

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.use(express.static('./views'));
app.set('view engine', 'ejs');
// app.use(express.json({ extended: false }));


const database = require('./database');

let users= [];

const LoginService = require("./controller/login_controller");
var loginRouter = require("./router/login_router")
var requestRouter = require("./router/request_router")


// io.on('connection',socket =>{
//     socket.on('join room', (username) =>{
//         const user = {
//             username,
//             id: socket.id,
//         };
//         users.push(user);
//         io.emit('new user', users);
//     });

//     socket.on('join room', (roomname, callbackQuery) =>{
//         socket.join(roomname);
//         callbackQuery(message[roomname]);
//     })

//     socket.on('send message', (message, to, sender) =>{
//         const payload = {
//             message,
//             sender
//         }
//         socket.to(to).emit('new message', payload); 
//     })
// });



app.get('/', (req, res) => {
//    database.addDoctor("Nguyen a", "Nam", "Tim mach", "43", "a@gmail.com", "none",function(){
//     database.getDoctor(function(results){
//         console.log(results)
//     })
//    })
    res.render('index')
});

app.use('/nhanvien',requestRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000!');
});