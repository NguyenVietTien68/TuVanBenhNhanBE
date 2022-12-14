const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http,{
  cors: {
      origin: "*"
  }
});

const cookieParser = require('cookie-parser');

var bodyparser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
// app.use(express.json({ extended: false }));
const database = require('./database');

var loginRouter = require("./router/login_router")
var doctorRouter = require("./router/doctor_router")
var patientRouter = require("./router/patient_router")
const doctorMiddleware = require("./middlewares/doctor_middleware")
const patientMiddleware = require("./middlewares/patien_middleware")

app.get('/', (req, res) => {
    res.render('login')
});

app.use('/',loginRouter )

app.use('/patient',patientRouter)

app.use('/doctor',doctorRouter)



const users= {}
io.on('connection', socket => {
    console.log(socket.id);
    socket.emit('recive-mess','Hello')
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name);
    })
    socket.on('send-mess', mess => {
        // console.log(mess);
        socket.broadcast.emit('recive-mess-client', {message: mess, name: users[socket.id]});
    })
})

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log('Server is running on port 5000!');
});

module.exports = io;