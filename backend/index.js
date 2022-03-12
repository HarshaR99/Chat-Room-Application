const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const corsOptions={
    cors: true,
    origins:["http://localhost:3000"],
   }

const io = socketio(server,corsOptions)

app.use(cors)

io.on('connect',(socket)=>{
    console.log('We have a new connection')

    socket.on('join',({name,room},callback)=>{
        const {error,user} = addUser({id:socket.id,name,room})
        if(error) return callback(error)

        socket.emit('message',{user:'admin',text:`${user.name} welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},just joined!`})
        socket.join(user.room)

        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
        // callback()
    })

    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message',{user:user.name,text:message})
        callback()
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',{user:user.name,text:`${user.name} has left ${user.room}`})
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    console.log('user disconnected')
    })
})

app.use(router)
server.listen(PORT,console.log('Server running on port '+PORT))