const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = require("http").createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname + "/public")));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

io.on("connection", function (socket) {
    console.log("A user connected");

    socket.on("newuser", function (user) {
        io.emit("update", user.username + " has joined the chat.");
    });

    socket.on("exituser", function (username) {
        io.emit("update", username + " has left the chat.");
    });

    socket.on("chat", function (message) {
        io.emit("chat", message);
    });

    socket.on("image", function (imageData) {
        io.emit("image", imageData);
    });

    socket.on("disconnect", function () {
        console.log("A user disconnected");
    });

    socket.on("error", function (err) {
        console.error("Socket error:", err);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
    console.error("Server error:", err);
});
