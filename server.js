const express = require("express");
const path = require("path");
const { Socket } = require("socket.io");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname + "/public")));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

io.on("connection", function (Socket) {
    Socket.on("newuser", function (user) {
        io.emit("update", user.username + " has joined the chat."); 
    });
    Socket.on("exituser", function (username) {
        io.emit("update", username + " has left the chat.");
    });
    Socket.on("chat", function (message) {
        io.emit("chat", message);
    });
    Socket.on("image", function (imageData) {
        io.emit("image", imageData);
    });
    Socket.on("error", function (err) {
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