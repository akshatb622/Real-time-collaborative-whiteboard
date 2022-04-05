let express = require('express');
let app = express();
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer);

let connections = [];

io.on("connect",(socket)=>{
    connections.push(socket);
    console.log(`${socket.id} has connected`);

    socket.on('draw',(data)=>{
        connections.forEach((con)=>{
            if(con.id !== socket.id){
                con.emit('ondraw',{x : data.x, y : data.y});
            }
        });
    });
    socket.on('down',(data)=>{
        connections.forEach((con)=>{
            if(con.id !== socket.id){
                con.emit('ondown',{x :data.x ,y : data.y});
            }
        });
    });

    socket.on('disconnect',(reason)=>{
        console.log(`${socket.id} has disconnected`);
        connections = connections.filter((conn)=>{
            conn.id !== socket.id;
        });
    });

});







app.use(express.static('public'));



 
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT,()=>{
    console.log("Server is running on PORT " + PORT);
});