const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");
const server = http.createServer(function (req, res) {
  if (req.url == "/style.css") {
    res.writeHead(200, {
      "Content-Type": "text/css"
    });
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
  }
  if (req.url == "/tetris_js.js") res.end(fs.readFileSync(__dirname + "/tetris_js.js", "utf-8"));
  else if (req.url == "/style.css") res.end(fs.readFileSync(__dirname + "/style.css", "utf-8"));
  else if (req.url == "/tetris_blocks.js") res.end(fs.readFileSync(__dirname + "/tetris_blocks.js", "utf-8"));
  else if (req.url == "/tetris_draw.js") res.end(fs.readFileSync(__dirname + "/tetris_draw.js", "utf-8"));
  else if (req.url == "/cpu.js") res.end(fs.readFileSync(__dirname + "/cpu.js", "utf-8"));
  else res.end(fs.readFileSync(__dirname + "/tetris.html", "utf-8"));

}).listen(3003);

const io = socketio.listen(server);
let box = new Array(4);
let id = new Array(4);
let damage = new Array(4);
let hol = new Array(4);
let next = new Array(4);
for (let i = 0; i < 4; i++) {
  box[i] = new Array();
  id[i] = new Array();
  damage[i] = new Array();
  hol[i] = new Array();
  next[i] = new Array();
}
io.sockets.on("connection", (socket) => {
  let room = 0;
  let game_flag = true;
  socket.on("conect", (value) => {
    room = value.room;

    if (id[room].length < 2) {
      if (game_flag && room > 0) {
        box[room].push(value.box);
        id[room].push(socket.id);
        damage[room].push(0);
        hol[room].push(0);
        next[room].push([,]);
        if (socket.id == id[room][0]) {
          console.log("1P参加");
          box[room][0] = value.box;
          next[room][0] = value.next;
          hol[room][0] = value.hol;
          io.to(id[room][1]).emit("enemy_box", {
            box: box[room][0],
            next: next[room][0],
            hol: hol[room][0]
          });
          io.to(id[room][1]).emit("test", 1);
        } else if (socket.id == id[room][1]) {
          console.log("2P参加");
          box[room][1] = value.box;
          next[room][1] = value.next;
          hol[room][1] = value.hol;
          io.to(id[room][0]).emit("enemy_box", {
            box: box[room][1],
            next: next[room][1],
            hol: hol[room][1]
          });
          io.to(id[room][1]).emit("test", 2);
          io.to(id[room][0]).emit("start");
          io.to(id[room][1]).emit("start");
        }
        game_flag = false;
      }
    } else {
      io.to(socket.id).emit("noIn");

    }
  });
  socket.on("join room", (value) => {
    console.log(value.test);
  });
  socket.on("message", (value) => {
    io.emit("message", value);
  });
  socket.on("clear", (value) => { //score_get
    if (socket.id == id[room][0]) {
      damage[room][1] += value.clear;
      io.to(id[room][1]).emit("damage", damage[room][1]);
      damage[room][1] = 0;
    } else if (socket.id == id[room][1]) {
      damage[room][0] = value.clear;
      io.to(id[room][0]).emit("damage", damage[room][0]);
      damage[room][0] = 0;
    }
  });
  socket.on("enter", (value) => { //box_get
    //console.log(value);
    if (socket.id == id[room][0]) {
      box[room][0] = value.box;
      next[room][0] = value.next;
      hol[room][0] = value.hol;
      io.to(id[room][1]).emit("enemy_box", {
        box: box[room][0],
        next: next[room][0],
        hol: hol[room][0]
      });
    } else if (socket.id == id[room][1]) {
      box[room][1] = value.box;
      next[room][1] = value.next;
      hol[room][1] = value.hol;
      io.to(id[room][0]).emit("enemy_box", {
        box: box[room][1],
        next: next[room][1],
        hol: hol[room][1]
      });
    } else {
      //console.log(-9);
    }
  });
  socket.on("lose", (value) => {
    if (socket.id == id[room][0]) {
      io.to(id[room][1]).emit("win");
    } else if (socket.id == id[room][1]) {
      io.to(id[room][0]).emit("win");
    }
    game_flag = true;
  });
  socket.on("end_game", (value) => {
    box[room] = new Array();
    id[room] = new Array();
    damage[room] = new Array();
    game_flag = true;
  });
});
