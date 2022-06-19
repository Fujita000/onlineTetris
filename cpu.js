let cpu_box = new Array(24);
let cy = 0;
let cx = 0;
for (let i = 0; i < 24; i++) {
  cpu_box[i] = new Array(10).fill(0);
}

function cpu() {
  //console.log(px+":"+py+"."+ov+"."+op);
  //  let mr = Math.floor(Math.random() * 3);
  //  if (mr == 0) {
  //    migi();
  //  } else if (mr == 1) {
  //    hidari();
  //  } else {
  //
  //  }



  
  setter_be();
  //for(let i = 0;i < 4;i++){
  px = fall_check();
  
  //}
  shadow();
  fall_check();
  draw();
  //if (now_game_flag) setTimeout(cpu, 500);
}

//function migi() {
//  setter_be();
//  px++;
//  if (setter_ch()) {
//    setter_af();
//  } else {
//    px--;
//    setter_af();
//  }
//  shadow();
//  fall_check();
//  draw();
//}
//
//function hidari() {
//  setter_be();
//  px--;
//  if (setter_ch()) {
//    setter_af();
//  } else {
//    px++;
//    setter_af();
//  }
//  shadow();
//  fall_check();
//  draw();
//}

function fall_check() {
  let max_y = 0;
  let ret_x = 0;
  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 10; x++) {
      cpu_box[y][x] = set_box[y][x];
    }
  }
  for (let i = -1; i < 10; i++) {
    cy = py;
    while (!cpu_check(i, cy)) {
      cy++;
    }

    let cff = true
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (blocks[p][v][y][x] == 1) {
          if (!(x + i >= 0 && x + i < 10)) {
            cff = false;
          }
        }
      }
    }
    if (cff){
      if (max_y < cy) {
        max_y = cy;
        console.log(max_y);
        ret_x = i;
      }
    }
  }
  return ret_x;
}

function cpu_check(sx, sy) {
  let flag = true;
  try {
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (blocks[p][v][y][x] == 1) {
          cpu_box[y + sy][x + sx] = 0;
        }
      }
    }
    sy++;
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (blocks[p][v][y][x] == 1) {
          if (cpu_box[y + sy][x + sx] != 0) {
            flag = false;
          }
        }
      }
    }
  } catch (e) {
    flag = false;
  }
  if (flag) {
    return false;
  } else {
    return true;
  }
}
