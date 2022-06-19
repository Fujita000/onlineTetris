const sta = document.getElementById('gamesta');

let ioS = io.connect("http://localhost:3003");
const socket = io();
let room_num = 0;
let gameflag = false;
let attack = 0;
let px = 3;
let py = 0;
let sx = px;
let sy = py;
let p = 0;
let op = 0;
let v = 0;
let ov = 0;
let hold_b = 0;
let hold_f = true;
let damage = 0;
let block_box = new Array();
let box = new Array(24);
let enemy_box = new Array(24);
let hold_e = 0;
let enemy_block = new Array(2);
let shadow_box = new Array(24);
let set_box = new Array(24);
for (let i = 0; i < 24; i++) {
  box[i] = new Array(10).fill(0);
  enemy_box[i] = new Array(10).fill(0);
  shadow_box[i] = new Array(10).fill(0);
  set_box[i] = new Array(10).fill(0);
}
let timer;
let win_flag = false;
let conect_flag = false;
let now_game_flag = false;
block_box_set();
block_box_set();

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
  block_box.push(...q);
}

function shadow() {
  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 10; x++) {
      shadow_box[y][x] = set_box[y][x];
    }
  }
  sy = py;
  sx = px;
  while (!test(sx, sy)) {
    sy++;
  }
  draw();
}

function select() {
  let rbtn = document.getElementById("radio").rbtn.value;
  room_num = rbtn;
  if (room_num == "") room_num = 0;
}

function test(sx, sy) {
  let flag = true;
  try {
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (blocks[p][v][y][x] == 1) {
          shadow_box[y + sy][x + sx] = 0;
        }
      }
    }
    sy++;
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (blocks[p][v][y][x] == 1) {
          if (shadow_box[y + sy][x + sx] != 0) {
            flag = false;
          }
        }
      }
    }
  } catch (e) {
    flag = false;
  }
  if (flag) {
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (blocks[p][v][y][x] == 1) {
          shadow_box[y + sy][x + sx] = 9;
        }
      }
    }
    return false;
  } else {
    sy--;
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (blocks[p][v][y][x] == 1) {
          shadow_box[y + sy][x + sx] = 9;
        }
      }
    }
    return true;
  }
}

function clear() {
  for (y = 0; y < 24; y++) {
    let flag = true;
    for (x = 0; x < 10; x++) {
      if (box[y][x] == 0) {
        flag = false;
        break;
      }
    }
    if (flag) {
      box[y].fill(0);
      for (yq = y; yq > 0; yq--) {
        box[yq] = [...box[yq - 1]];
      }
      attack++;
      clear_socket();
    }
  }
}

function wall() {
  while (damage > 0) {
    damage--;
    for (y = 1; y < 24; y++) {
      box[y - 1] = [...box[y]];
    }
    box[23].fill(8);
    box[23][Math.floor(Math.random() * 10)] = 0;
  }
}

function down() {
  shadow();
  if (!win_flag) {
    let flag = true;
    give_box_socket();
    try {
      for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
          if (blocks[p][v][y][x] == 1) {
            box[y + py][x + px] = 0;
          }
        }
      }
      py++;
      for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
          if (blocks[p][v][y][x] == 1) {
            if (box[y + py][x + px] != 0) {
              flag = false;
            }
          }
        }
      }
    } catch (e) {
      flag = false;
    }
    if (flag) {
      for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
          if (blocks[p][v][y][x] == 1) {
            box[y + py][x + px] = p;
          }
        }
      }
      return false;
    } else {
      py--;
      for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
          if (blocks[p][v][y][x] == 1) {
            box[y + py][x + px] = p;
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
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (blocks[op][ov][y][x] == 1) {
        box[y + py][x + px] = 0;
      }
      if (blocks[p][v][y][x] == 1) {
        box[y + py][x + px] = p;
      }
    }
  }
}

function setter_be() {
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (blocks[p][v][y][x] == 1) {
        box[y + py][x + px] = 0;
      }
    }
  }
}

function setter_af() {
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (blocks[p][v][y][x] == 1) {
        box[y + py][x + px] = p;
      }
    }
  }
}

function setter_ch() {
  let flag = true;;
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (blocks[p][v][y][x] == 1) {
        if (box[y + py][x + px] != 0) {
          flag = false;
        }
      }
    }
  }
  return flag && flame_ch();
} //フレーム内にあるかとブロックが被らないかの判定

function flame_ch() {
  let flag = true;;
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (blocks[p][v][y][x] == 1) {
        if (!(x + px >= 0 && x + px < 10)) {
          flag = false;
        }
      }
    }
  }
  return flag;
} //フレーム内の判定

function fall_enter(hold) {
  if (!win_flag) {
    if (hold) {
      if (gameflag) {
        op = p;
        setter_be();
        px = 3;
        py = 0;
        ov = v;
        v = 0;
        if (hold_b == 0) {
          wall();
          for (let y = 0; y < 24; y++) {
            for (let x = 0; x < 10; x++) {
              set_box[y][x] = box[y][x];
              shadow_box[y][x] = box[y][x];
            }
          }
          p = block_box.shift();
          if (block_box.length < 8) {
            block_box_set();
          }
        } else {
          p = hold_b;
        }
        hold_b = op;
        if (gameflag) setter_af();
      } else {
        game_lose();
      }
      for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 10; x++) {
          shadow_box[y][x] = set_box[y][x];
        }
      }
    } else {
      if (gameflag) {
        hold_f = true;
        op = p;
        px = 3;
        py = 0;
        ov = v;
        v = 0;
        wall();
        for (let y = 0; y < 24; y++) {
          for (let x = 0; x < 10; x++) {
            set_box[y][x] = box[y][x];
            shadow_box[y][x] = box[y][x];
          }
        }
        p = block_box.shift();
        cpu();
        if (block_box.length < 8) {
          block_box_set();
        }

        gameflag = setter_ch();
        if (gameflag) setter_af();
      } else {
        game_lose();
      }
      for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 10; x++) {
          shadow_box[y][x] = set_box[y][x];
        }
      }
    }
  }
  //draw();
}

addEventListener("keydown", event => {
  if(!win_flag){
  if (event.key == ' ') {
    if (hold_f) {
      fall_enter(true);
      hold_f = false;
    }
  }
  if (event.key == 'z') {
    setter_be();
    v--;
    if (v < 0) v = 3;
    if (setter_ch()) {
      setter_af();
    } else {
      v--;
      if (v < 0) v = 3;
      if (setter_ch()) {
        setter_af();
      } else {
        v--;
        if (v < 0) v = 3;
        if (setter_ch()) {
          setter_af();
        } else {
          v--;
          if (v < 0) v = 3;
          setter_af();
        }
      }
    }
    fall_check();
    shadow();
    draw();
  }
  if (event.key == 'x') {
    setter_be();
    v++;
    if (v > 3) v = 0;
    if (setter_ch()) {
      setter_af();
    } else {
      v++;
      if (v > 3) v = 0;
      if (setter_ch()) {
        setter_af();
      } else {
        v++;
        if (v > 3) v = 0;
        if (setter_ch()) {
          setter_af();
        } else {
          v++;
          if (v > 3) v = 0;
          setter_af();
        }
      }
    }
    fall_check();
    shadow();
    draw();
  }
  if (event.key == 'ArrowLeft') {
    setter_be();
    px--;
    if (setter_ch()) {
      setter_af();
    } else {
      px++;
      setter_af();
    }
    fall_check();
    shadow();
    draw();
  }
  if (event.key == 'ArrowRight') {
    setter_be();
    px++;
    if (setter_ch()) {
      setter_af();
    } else {
      px--;
      setter_af();
    }
    fall_check();
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
  }
});

function loop() {
  fall_enter();
  timer = setTimeout(loop2, 500);
}

function loop2() {
  if (!win_flag) {
    down();
    draw();
    timer = setTimeout(loop2, 500);
  }
}

function cpu_start() {
  if (!now_game_flag) {
    reseter();
    now_game_flag = true;
    if (!gameflag) {
      gameflag = true;
      loop();
    }
  }
}

function one_play_start() {
  if (!now_game_flag) {
    reseter();
    if (!gameflag) {
      gameflag = true;
      loop();
    }
  }
}

function start() { //開始関数
  select();
  if (room_num > 0 && !now_game_flag) {
    now_game_flag = true;
    reseter();
    conect_socket();
  }
}
//通信系function()
socket.on("start", (val) => {
  if (!conect_flag) {
    conect_flag = true;
    if (!gameflag) {
      gameflag = true;
      conect_flag = true;
      loop();
    }
  }
});

function conect_socket() {
  socket.emit("conect", {
    box: box,
    hol: hold_b,
    next: block_box,
    room: room_num
  });
}

function clear_socket() {
  socket.emit("clear", {
    clear: attack
  });
  attack = 0;
}

function give_box_socket() {
  socket.emit("enter", {
    box: box,
    hol: hold_b,
    next: block_box
  });
}


on_socket_list();

function on_socket_list() {
  socket.on("enemy_box", (val) => {
    enemy_box = val.box;
    enemy_block = val.next;
    hold_e = val.hol;
    draw();
  });
  socket.on("damage", (val) => {
    damage += val;
  });
  socket.on("win", (val) => {
    game_win();
    socket.emit("end_game");
  });
  socket.on("noIn", (val) => {
    sta.textContent = "この部屋は使用中です";
  });
}

function lose_socket() {
  socket.emit("lose", );
}

function game_lose() {
  console.log(px+":"+py+"."+ov+"."+op);
  sta.textContent = "Lose";
  now_game_flag = false;
  lose_socket();
}

function game_win() {
  sta.textContent = "Win";
  now_game_flag = false;
  win_flag = true;
}
