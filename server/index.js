require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());
const parcelRoutes = require('./routes/parcelRoutes');
app.use("/api/parcels", parcelRoutes);
const http = require("http");
const socketIo = require("socket.io");
const express = require("express");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // allow frontend
    methods: ["GET", "POST"]
  }
});

// make io available to controllers
app.set("io", io);

connectDB();

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
