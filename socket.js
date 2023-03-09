const { Server } = require("socket.io");
const { v4 } = require("uuid");
const config = require("./config/config");
var uuid = v4;

class SocketServer {
  static instance;

  constructor(server) {
    this.io = null;
    this.userlist = [];
    this.createSocketServer(server);
  }

  static getInstance(server = null) {
    if (SocketServer.instance) {
      return SocketServer.instance;
    }
    SocketServer.instance = new SocketServer(server);
    return SocketServer.instance;
  }

  createSocketServer(server) {
    this.io = new Server(server, {
      cors: {
        // origin: "http://localhost:3000",
        origin: "*",
      },
    });
    this.userlist = [];
    this.runSocketServer();
  }

  getSocketServer() {
    return this.io;
  }

  runSocketServer() {
    console.log('Socket is running...')
    this.io.on("connection", (socket) => {
      console.log(`User connected ${socket.id}`)
      socket.emit('SET_SOCKET_REQUEST')
      socket.on('SET_SOCKET_ID', async (data) => {
          console.log(data)
          if (data && data.user_id) {
              var user = {
                  socketId: socket.id,
                  user_id: data.user_id
              }

              var findUser = this.userlist.some(x => x.user_id == data.user_id && x.socketId == socket.id)
              if (!findUser) {
                this.userlist.push(user)
              }
          }
      })

      socket.on('disconnect', () => {
          console.log('user disconnected', socket.id);
          this.userlist = this.userlist.filter(user => user.socketId != socket.id)
      })
    });
  }

  sendMailNotification(user_id) {
    var receiverSocketId = this.userlist.find(user => user.user_id == user_id)
    if (receiverSocketId) {
        this.io.to(receiverSocketId.socketId).emit('MAIL_RECEIVED_NOTIFICATION')
    }
  }
}

module.exports = SocketServer;
