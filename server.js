const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const http = require("http");
const socketIO = require("socket.io");
// const upload = multer({ dest: 'uploads/' })

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// body parser middleware
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// cors Middleware
app.use(cors({
  origin: '*'
}));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/booking', require('./routes/api/book'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// our server instance
const server = http.createServer(app);
// This creates our socket using the instance of the server
const io = socketIO(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", socket => {
  console.log("New client connected" + socket.id);
  //console.log(socket);
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
      socket.leave(roomId);
  });
  // Returning the initial data of food menu from FoodItems collection
  // socket.on("initial_data", () => {
  //     collection_foodItems.find({}).then(docs => {
  //         io.sockets.emit("get_data", docs);
  //     });
  // });

  // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
  // socket.on("putOrder", order => {
  //     collection_foodItems
  //         .update({ _id: order._id }, { $inc: { ordQty: order.order } })
  //         .then(updatedDoc => {
  //             // Emitting event to update the Kitchen opened across the devices with the realtime order values
  //             io.sockets.emit("change_data");
  //         });
  // });

  // Order completion, gets called from /src/main/Kitchen.js
  // socket.on("mark_done", id => {
  //     collection_foodItems
  //         .update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
  //         .then(updatedDoc => {
  //             //Updating the different Kitchen area with the current Status.
  //             io.sockets.emit("change_data");
  //         });
  // });

  // Functionality to change the predicted quantity value, called from /src/main/UpdatePredicted.js
  // socket.on("ChangePred", predicted_data => {
  //     collection_foodItems
  //         .update(
  //             { _id: predicted_data._id },
  //             { $set: { predQty: predicted_data.predQty } }
  //         )
  //         .then(updatedDoc => {
  //             // Socket event to update the Predicted quantity across the Kitchen
  //             io.sockets.emit("change_data");
  //         });
  // });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
