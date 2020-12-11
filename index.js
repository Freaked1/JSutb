// OBSERVERA ATT DOKUMENTATION ÄR I DOKUMENTATIONS FOLDER.

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const port = 3000;

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log(`A user connected`);
    io.emit('chat message', `A user connected`);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        io.emit('chat message', `A user disconnected`);
    });
});

io.on("connection", (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

http.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});