const express = require('express')
const app = express()
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')


app.use('/api/users', require('./routes/userRoutes'))
app.use(cors())
const server = http.createServer(app)

server.listen(5000, () => {
    console.log('server runing')
})``

const io = new Server(server, {
    cors :{
        origin : 'http://localhost:3000',
        methods : ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('join_room', (data) =>{
        socket.join(data.room);
        console.log(`User with id ${socket.id} joined room with id ${data}`)
    })

    socket.on('send_message', (data) =>{
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on('disconnect', () =>{
        console.log('Socket disconnected', socket.id)
    })
})

