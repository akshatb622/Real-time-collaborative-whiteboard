const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var io = io.connect('http://localhost:8080/');

const ctx = canvas.getContext('2d');

download_img = function(el) {
  // get image URI from canvas object
  var imageURI = canvas.toDataURL("image/jpg");
  el.href = imageURI;
};


let x;
let y;
let mouseDown = false;

window.onmousedown = (e)=>{
    ctx.moveTo(x,y);
    io.emit('down',{x , y});
    mouseDown = true;
};

window.onmouseup = (e)=>{
    mouseDown = false;
};  
io.on('ondraw',({x,y})=>{
    ctx.lineTo(x,y);
    ctx.stroke();
});

io.on('ondown',({x , y})=>{
    ctx.moveTo(x , y);
});


window.onmousemove = (e)=>{
    x = e.clientX;
    y = e.clientY;
    // console.log( x , y);
    if(mouseDown){
        io.emit('draw',{x,y});
        ctx.lineTo(x,y);
        ctx.stroke();
    }

};