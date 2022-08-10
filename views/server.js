const express = require('express')
const http = require('http')
const app = express()
const server =http.createServer(app)
const socket = require('socket.io')
const io = socket(server)


app.use(express.static('./views'));
app.set('view engine', 'ejs');

const database = require('./database');

let users= [];

const LoginService = require("./controller/Login_Controller");


io.on('connection',socket =>{
    socket.on('join room', (username) =>{
        const user = {
            username,
            id: socket.id,
        };
        users.push(user);
        io.emit('new user', users);
    });

    socket.on('join room', (roomname, callbackQuery) =>{
        socket.join(roomname);
        callbackQuery(message[roomname]);
    })

    socket.on('send message', (message, to, sender) =>{
        const payload = {
            message,
            sender
        }
        socket.to(to).emit('new message', payload); 
    })
});



app.get('/', (req, res) => {
//    database.addDoctor("Nguyen a", "Nam", "Tim mach", "43", "a@gmail.com", "none",function(){
//     database.getDoctor(function(results){
//         console.log(results)
//     })
//    })
    res.render('login')
});

app.get('/layname', (req, res) => {
    // let name = req.query.name;
    // console.log(name)
    // database.getPatienAcc(function(acc){
    //     console.log(acc);
    // })
    database.getAllDoctor(function(acc){
        console.log(acc);
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000!');
});