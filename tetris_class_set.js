class Tetris {
  this.room_num = 0;
  this.gameflag = false;
  this.attack = 0;
  this.px = 3;
  this.py = 0;
  this.sx = px;
  this.sy = py;
  this.p = 0;
  this.op = 0;
  this.v = 0;
  this.ov = 0;
  this.hold_b = 0;
  this.hold_f = true;
  this.damage = 0;
  this.block_box = new Array();
  this.box = new Array(24);
  this.enemy_box = new Array(24);
  this.shadow_box = new Array(24);
  this.set_box = new Array(24);
  this.timer;
  this.win_flag = false;
  this.conect_flag = false;
  this.now_game_flag = false;

  constructor() {
    for (let i = 0; i < 24; i++) {
      box[i] = new Array(10).fill(0);
      this.enemy_box[i] = new Array(10).fill(0);
      this.shadow_box[i] = new Array(10).fill(0);
      this.set_box[i] = new Array(10).fill(0);
    }
    block_box_set();
    block_box_set();
  }
  function block_box_set() {
  let q = new Array(7).fill(0);
  for (let i = 0; i < 7; i++) {
    let r = Math.floor(Math.random() * 7) + 1;
    for (let j = 0; j < 7; j++) {
      if (q[j] == r) {
        i--;
        break;
      }
      if (q[j] == 0) {
        q[j] = r;
        break;
      }
    }
  }
  this.push(...q);
}
function shadow() {
  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 10; x++) {
      this.hadow_box[y][x] = this.set_box[y][x];
    }
  }
  this.sy = this.py;
  this.sx = this.px;
  while (!test(this.sx, this.sy)) {
    this.sy++;
  }
  draw();
}
function select() {
  let rbtn = document.getElementById("radio").rbtn.value;
  this.room_num = rbtn;
  if (this.room_num == "") this.room_num = 0;
}
}












function test(sx, sy) {
  let flag = true;
  try {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (this.blocks[this.p][this.v][y][x] == 1) {
          this.shadow_box[y + this.sy][x + this.sx] = 0;
        }
      }
    }
    this.sy++;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (this.blocks[this.p][this.v][y][x] == 1) {
          if (this.shadow_box[y + this.sy][x + this.sx] != 0) {
            flag = false;
          }
        }
      }
    }
  } catch (e) {
    flag = false;
  }
  if (flag) {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (blocks[p][v][y][x] == 1) {
          this.shadow_box[y + sthis.y][x + this.sx] = 9;
        }
      }
    }
    return false;
  } else {
    this.sy--;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (this.blocks[this.p][this.v][y][x] == 1) {
          this.shadow_box[y + this.sy][x + this.sx] = 9;
        }
      }
    }
    return true;
  }
}

function clear() {
  for (let y = 0; y < 24; y++) {
    let flag = true;
    for (let x = 0; x < 10; x++) {
      if (this.box[y][x] == 0) {
        flag = false;
        break;
      }
    }
    if (flag) {
      this.box[y].fill(0);
      for (let yq = y; yq > 0; yq--) {
        this.box[yq] = [...box[yq - 1]];
      }
      this.attack++;
      clear_socket();
    }
  }
}

function wall() {
  while (this.damage > 0) {
    this.damage--;
    for (let y = 1; y < 24; y++) {
      this.box[y - 1] = [...box[y]];
    }
    this.box[23].fill(8);
    this.box[23][Math.floor(Math.random() * 10)] = 0;
  }
}

function down() {
  shadow();
  if (!this.win_flag) {
    let flag = true;
    give_box_socket();
    try {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          if (this.blocks[this.p][this.v][y][x] == 1) {
            this.box[y + this.py][x + this.px] = 0;
          }
        }
      }
      this.py++;
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          if (this.blocks[this.p][this.v][y][x] == 1) {
            if (this.box[y + this.py][x + this.px] != 0) {
              flag = false;
            }
          }
        }
      }
    } catch (e) {
      flag = false;
    }
    if (flag) {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          if (this.blocks[this.p][this.v][y][x] == 1) {
            this.box[y + this.py][x + this.px] = this.p;
          }
        }
      }
      return false;
    } else {
      this.py--;
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          if (this.blocks[this.p][this.v][y][x] == 1) {
            this.box[y + this.py][x + this.px] = this.p;
          }
        }
      }
      clear();
      fall_enter(false);
      return true;
    }
  }
}

function setter() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (this.blocks[this.op][this.ov][y][x] == 1) {
        this.box[y + this.py][x + this.px] = 0;
      }
      if (this.blocks[this.p][this.v][y][x] == 1) {
        this.box[y + this.py][x + this.px] = this.p;
      }
    }
  }
}

function setter_be() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (this.blocks[this.p][this.v][y][x] == 1) {
        this.box[y + this.py][x + this.px] = 0;
      }
    }
  }
}

function setter_af() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (this.blocks[this.p][this.v][y][x] == 1) {
        this.box[y + this.py][x + this.px] = this.p;
      }
    }
  }
}

function setter_ch() {
  let flag = true;;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (this.blocks[this.p][this.v][y][x] == 1) {
        if (this.box[y + this.py][x + this.px] != 0) {
          flag = false;
        }
      }
    }
  }
  return flag && flame_ch();
} //フレーム内にあるかとブロックが被らないかの判定

function flame_ch() {
  let flag = true;;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (this.blocks[this.p][this.v][y][x] == 1) {
        if (!(x + this.px >= 0 && x + this.px < 10)) {
          flag = false;
        }
      }
    }
  }
  return flag;
} //フレーム内の判定

function fall_enter(hold) {
  if (!this.win_flag) {
    if (this.hold) {
      if (this.gameflag) {
        this.op = this.p;
        setter_be();
        this.px = 3;
        this.py = 0;
        this.ov = this.v;
        this.v = 0;
        if (this.hold_b == 0) {
          wall();
          for (let y = 0; y < 24; y++) {
            for (let x = 0; x < 10; x++) {
              this.set_box[y][x] = this.box[y][x];
              this.shadow_box[y][x] = this.box[y][x];
            }
          }
          this.p = this.block_box.shift();
          if (this.block_box.length < 8) {
            block_box_set();
          }
        } else {
          this.p = this.hold_b;
        }
        this.hold_b = this.op;
        if (this.gameflag) setter_af();
      } else {
        game_lose();
      }
      for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 10; x++) {
          this.shadow_box[y][x] = this.set_box[y][x];
        }
      }
    } else {
      if (this.gameflag) {
        this.hold_f = true;
        this.op = this.p;
        this.px = 3;
        this.py = 0;
        wall();
        for (let y = 0; y < 24; y++) {
          for (let x = 0; x < 10; x++) {
            this.set_box[y][x] = this.box[y][x];
            this.shadow_box[y][x] = this.box[y][x];
          }
        }
        this.p = this.block_box.shift();
        if (this.block_box.length < 8) {
          block_box_set();
        }
        this.ov = this.v;
        this.v = 0;
        this.gameflag = setter_ch();
        if (this.gameflag) setter_af();
      } else {
        game_lose();
      }
      for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 10; x++) {
          this.shadow_box[y][x] = this.set_box[y][x];
        }
      }
    }
  }
  draw();
}

addEventListener("keydown", event => {
  if (event.key == ' ') {
    if (this.hold_f) {
      fall_enter(true);
      this.hold_f = false;
    }
  }
  if (event.key == 'z') {
    setter_be();
    this.v--;
    if (this.v < 0) this.v = 3;
    if (setter_ch()) {
      setter_af();
    } else {
      this.v--;
      if (this.v < 0) this.v = 3;
      if (setter_ch()) {
        setter_af();
      } else {
        this.v--;
        if (this.v < 0) this.v = 3;
        if (setter_ch()) {
          setter_af();
        } else {
          this.v--;
          if (this.v < 0) this.v = 3;
          setter_af();
        }
      }
    }
    shadow();
    draw();
  }
  if (event.key == 'x') {
    setter_be();
    this.v++;
    if (this.v > 3) this.v = 0;
    if (setter_ch()) {
      setter_af();
    } else {
      this.v++;
      if (this.v > 3) this.v = 0;
      if (setter_ch()) {
        setter_af();
      } else {
        this.v++;
        if (this.v > 3) this.v = 0;
        if (setter_ch()) {
          setter_af();
        } else {
          this.v++;
          if (this.v > 3) this.v = 0;
          setter_af();
        }
      }
    }
    shadow();
    draw();
  }
  if (event.key == 'ArrowLeft') {
    setter_be();
    this.px--;
    if (setter_ch()) {
      setter_af();
    } else {
      this.px++;
      setter_af();
    }
    shadow();
    draw();
  }
  if (event.key == 'ArrowRight') {
    setter_be();
    this.px++;
    if (setter_ch()) {
      setter_af();
    } else {
      this.px--;
      setter_af();
    }
    shadow();
    draw();
  }
  if (event.key == 'ArrowDown') {
    down();
    draw();
  }
  if (event.key == 'ArrowUp') {
    while (!down());
    draw();
  }
});

function loop() {
  fall_enter();
  this.timer = setTimeout(loop2, 500);
}

function loop2() {
  if (!this.win_flag) {
    down();
    draw();
    this.timer = setTimeout(loop2, 500);
  }
}

function test_start() {
  if (!this.now_game_flag) {
    reseter();
    on_socket_list();
    if (!this.gameflag) {
      this.gameflag = true;
      loop();
    }
  }
}

function start() { //開始関数
  select();
  if (this.room_num > 0 && !this.now_game_flag) {
    this.now_game_flag = true;
    reseter();
    conect_socket();
  }
}
//通信系function()
socket.on("start", (val) => {
  if (!this.conect_flag) {
    this.conect_flag = true;
    if (!this.gameflag) {
      this.gameflag = true;
      this.conect_flag = true;
      loop();
    }
  }
});

function conect_socket() {
  socket.emit("conect", {
    box: this.box,
    room: this.room_num
  });
}

function clear_socket() {
  socket.emit("clear", {
    clear: this.attack
  });
  this.attack = 0;
}

function give_box_socket() {
  socket.emit("enter", {
    box: this.box
  });
}


on_socket_list();

function on_socket_list() {
  socket.on("enemy_box", (val) => {
    this.enemy_box = val;
    draw();
  });
  socket.on("damage", (val) => {
    this.damage += val;
  });
  socket.on("win", (val) => {
    game_win();
    socket.emit("end_game");
  });
  socket.on("noIn", (val) => {
    this.sta.textContent = "この部屋は使用中です";
  });
}

function lose_socket() {
  socket.emit("lose", );
}

function game_lose() {
  this.sta.textContent = "Lose";
  this.now_game_flag = false;
  lose_socket();
}

function game_win() {
  this.sta.textContent = "Win";
  now_game_flag = false;
  win_flag = true;
}
function reseter() {
  room = 0;
  clearTimeout(timer);
  gameflag = false;
  timer = null;
  attack = 0;
  px = 3;
  py = 0;
  sx = px;
  sy = py;
  p = 0;
  op = 0;
  v = 0;
  ov = 0;
  hold_b = 0;
  hold_f = true;
  damage = 0;
  block_box = new Array();
  box = new Array(24);
  enemy_box = new Array(24);
  shadow_box = new Array(24);
  set_box = new Array(24);
  for (let i = 0; i < 24; i++) {
    box[i] = new Array(10).fill(0);
    enemy_box[i] = new Array(10).fill(0);
    shadow_box[i] = new Array(10).fill(0);
    set_box[i] = new Array(10).fill(0);
  }
  win_flag = false;
  conect_flag = false;
  block_box_set();
  block_box_set();
  draw();
  sta.textContent = "";
}