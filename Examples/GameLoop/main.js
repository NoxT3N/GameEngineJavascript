const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const playerWitdth = 50;
const playerHeight = 50;
let playerX = 0;
let playerY = canvas.height/2 - playerHeight/2;
const enemyWitdth = 50;
const enemyHeight = 50;
let enemyX = canvas.width - enemyWitdth;
let enemyY = canvas.height/2 - enemyHeight;

function gameLoop(){
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);