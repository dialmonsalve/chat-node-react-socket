import { Server } from "socket.io";

const io = new Server({cors: "http://localhost:5173"})

let onlineUsers = []

io.on("connection", (socket)=>{
  console.log({socket:socket.id});
  socket.on("addNewUser", (userId)=>{
    !onlineUsers.some((user)=> user.userId === userId) &&
      onlineUsers.push({
        userId:userId?._id,
        socketId:socket.id,
        userName:userId?.name,
        email:userId?.email
      })
      console.log({onlineUsers});

      io.emit("getOnlineUsers", onlineUsers)
  })
  socket.on("sendMessage", (message)=>{
    const user = onlineUsers.find(user => user.userId === message.recipientId)

    if(user){
      io.to(user.socketId).emit("getMessage", message)
      io.to(user.socketId).emit("getNotifications", {
        senderId:message.senderId,
        isRead:false,
        createdAt: new Date()
      })
    }
  })
  socket.on("disconnect", ()=>{
    onlineUsers = onlineUsers.filter(user=>user.socketId !== socket.id)
    io.emit("getOnlineUsers", onlineUsers)
  })
})

io.listen(3001)