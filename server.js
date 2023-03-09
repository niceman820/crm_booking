const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const http = require("http");
const SocketServer = require('./socket.js')
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
app.use(express.static(path.join(__dirname, 'client/build')));

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
SocketServer.getInstance(server);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));