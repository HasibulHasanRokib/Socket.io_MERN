const express=require("express")
const cors=require("cors")
const http= require('http')
const {Server} =require("socket.io")

const app=express()
app.use(cors())

const server=http.createServer(app)

const io= new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
   console.log("User connect",socket.id)
   
    socket.on('join_room',(data)=>{
        socket.join(data)
        console.log(`User with id:${socket.id} join room:${data}`)
    }) 

    socket.on('send_message',(data)=>{
       socket.to(data.room).emit("received_message",data)
    })

   socket.on("disconnect",()=>{
    console.log("User Disconnect",socket.id)
   }) 
})



const PORT=3001;
server.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})

