const n1 = document.getElementById('next_1').getContext('2d');
const n2 = document.getElementById('next_2').getContext('2d');
const hol = document.getElementById('hold').getContext('2d');
let di = 0;
const cnv = document.getElementById('stage');
const ctx = cnv.getContext('2d');
const cnv2 = document.getElementById('enemy_stage');
const ctx2 = cnv2.getContext('2d');

const en1 = document.getElementById('enemy_next_1').getContext('2d');
const en2 = document.getElementById('enemy_next_2').getContext('2d');
const ehol = document.getElementById('enemy_hold').getContext('2d');


function draw() {

  ctx.beginPath();
  ctx.clearRect(0, 0, 250, 500);
  for (y = 4; y < 24; y++) {
    for (x = 0; x < 10; x++) {

      switch (box[y][x]) {
        case 0:
          ctx.fillStyle = "rgb(217,217,217)";
          switch (shadow_box[y][x]) {
            case 9:
              ctx.fillStyle = "rgb(33,33,33)";
              break;
          }
          break;
        case 1:
          ctx.fillStyle = "rgb(128, 128, 255)";
          break;
        case 2:
          ctx.fillStyle = "rgb(255, 0, 255)";
          break;
        case 3:
          ctx.fillStyle = "rgb(255, 0, 0)";
          break;
        case 4:
          ctx.fillStyle = "rgb(0, 255, 0)";
          break;
        case 5:
          ctx.fillStyle = "rgb(0, 0, 255)";
          break;
        case 6:
          ctx.fillStyle = "rgb(255, 128, 0)";
          break;
        case 7:
          ctx.fillStyle = "rgb(255, 255, 0)";
          break;
        case 8:
          ctx.fillStyle = "rgb(56,56,56)";
          break;
      }
      ctx.fillRect(x * 25 + 1, (y - 4) * 25 + 1, 23, 23);

    }
  }
  ctx.closePath();
  enemy_draw();
  nexter_draw(n1,n2,block_box);
  holder_draw(hol,hold_b);
}

function enemy_draw() {
  ctx2.beginPath();
  ctx2.clearRect(0, 0, 250, 500);
  for (y = 4; y < 24; y++) {
    for (x = 0; x < 10; x++) {
      switch (enemy_box[y][x]) {
        case 0:
          ctx2.fillStyle = "rgb(217,217,217)";
          break;
        case 1:
          ctx2.fillStyle = "rgb(128, 128, 255)";
          break;
        case 2:
          ctx2.fillStyle = "rgb(255, 0, 255)";
          break;
        case 3:
          ctx2.fillStyle = "rgb(255, 0, 0)";
          break;
        case 4:
          ctx2.fillStyle = "rgb(0, 255, 0)";
          break;
        case 5:
          ctx2.fillStyle = "rgb(0, 0, 255)";
          break;
        case 6:
          ctx2.fillStyle = "rgb(255, 128, 0)";
          break;
        case 7:
          ctx2.fillStyle = "rgb(255, 255, 0)";
          break;
        case 8:
          ctx2.fillStyle = "rgb(56,56,56)";
          break;
      }
      ctx2.fillRect(x * 25 + 1, (y - 4) * 25 + 1, 23, 23);

    }
  }
  ctx2.closePath();
  nexter_draw(en1,en2,enemy_block);
  holder_draw(ehol,hold_e);
}


function holder_draw(hol,hold_b) {
  hol.beginPath();
  hol.clearRect(0, 0, 100, 100);
  let a = hold_b;
  if(a == undefined)a=0;

  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (blocks[a][0][y][x] == 1) {
        switch (a) {
          case 1:
            hol.fillStyle = "rgb(128, 128, 255)";
            break;
          case 2:
            hol.fillStyle = "rgb(255, 0, 255)";
            break;
          case 3:
            hol.fillStyle = "rgb(255, 0, 0)";
            break;
          case 4:
            hol.fillStyle = "rgb(0, 255, 0)";
            break;
          case 5:
            hol.fillStyle = "rgb(0, 0, 255)";
            break;
          case 6:
            hol.fillStyle = "rgb(255, 128, 0)";
            break;
          case 7:
            hol.fillStyle = "rgb(255, 255, 0)";
            break;
        }
        if (a == 7) hol.fillRect(x * 25 + 1, y * 25 + 1, 23, 23);
        else if (a == 1) hol.fillRect(x * 25 + 1, y * 25 + 10 + 1, 23, 23);
        else hol.fillRect(x * 25 + 1 + 12, y * 25 - 25 + 1, 23, 23);
      }
    }
  }
  hol.closePath();
}

function nexter_draw(n1,n2,block_box) {
  n1.beginPath();
  n1.clearRect(0, 0, 100, 100);
  let a = block_box[0];
  if(a == undefined)a=0;
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (blocks[a][0][y][x] == 1) {
        switch (a) {
          case 1:
            n1.fillStyle = "rgb(128, 128, 255)";
            break;
          case 2:
            n1.fillStyle = "rgb(255, 0, 255)";
            break;
          case 3:
            n1.fillStyle = "rgb(255, 0, 0)";
            break;
          case 4:
            n1.fillStyle = "rgb(0, 255, 0)";
            break;
          case 5:
            n1.fillStyle = "rgb(0, 0, 255)";
            break;
          case 6:
            n1.fillStyle = "rgb(255, 128, 0)";
            break;
          case 7:
            n1.fillStyle = "rgb(255, 255, 0)";
            break;
        }
        if (a == 7) n1.fillRect(x * 25 + 1, y * 25 + 1, 23, 23);
        else if (a == 1) n1.fillRect(x * 25 + 1, y * 25 + 10 + 1, 23, 23);
        else n1.fillRect(x * 25 + 1 + 12, y * 25 - 25 + 1, 23, 23);
      }
    }
  }
  n1.closePath();
  n2.beginPath();
  n2.clearRect(0, 0, 80, 80);
  let b = block_box[1];
  if(b == undefined)b=0;
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (blocks[b][0][y][x] == 1) {
        switch (b) {
          case 1:
            n2.fillStyle = "rgb(128, 128, 255)";
            break;
          case 2:
            n2.fillStyle = "rgb(255, 0, 255)";
            break;
          case 3:
            n2.fillStyle = "rgb(255, 0, 0)";
            break;
          case 4:
            n2.fillStyle = "rgb(0, 255, 0)";
            break;
          case 5:
            n2.fillStyle = "rgb(0, 0, 255)";
            break;
          case 6:
            n2.fillStyle = "rgb(255, 128, 0)";
            break;
          case 7:
            n2.fillStyle = "rgb(255, 255, 0)";
            break;
        }
        if (b == 7) n2.fillRect(x * 20 + 1, y * 20 + 1, 18, 18);
        else if (b == 1) n2.fillRect(x * 20 + 1, y * 20 + 12 + 1, 18, 18);
        else n2.fillRect(x * 20 + 1 + 12, y * 20 - 25 + 6, 18, 18);
      }
    }
  }
  n2.closePath();
}
