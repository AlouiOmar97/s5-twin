var http=require("http")
var express=require("express")
var mongoose=require("mongoose")
var path=require('path')
const { socketIO }= require('./services/partieService')
var mongoConfig= require("./config/mongoConfig.json")
var contactRoutes= require("./controllers/conatctController")
var joueurRoutes= require("./controllers/joueurController")
var pariteRoutes= require("./controllers/partieController")
var chatRoutes= require("./controllers/chatController")
var app=express()
app.set('views',path.join(__dirname,'views'))
app.set('view engine','twig')
app.use(express.json())
app.use(express.static('public'))
app.use("/contacts",contactRoutes)
app.use("/joueurs",joueurRoutes)
app.use("/parties",pariteRoutes)
app.use("/chats",chatRoutes)
mongoose.connect(mongoConfig.uri,{ useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(()=>{
        console.log("DB connected");
    }).catch(err=>{
        console.log(err);
    })
var server=http.createServer(app)
socketIO(server)
server.listen(3000,()=>{
    console.log("server started   ");
})