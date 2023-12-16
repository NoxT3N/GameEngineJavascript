const Images = {
    player: new Image(),
    enemy: new Image(),
    playerIdle: [],  
};

const AudioFiles = {
    jump: "...",
    collect: "...",
};

Images.player.src = './resources/images/player/player.png'
Images.enemy.src = './resources/images/enemy/enemy.png'

for(let i = 1; i < 9; i++){
    const playerIdleImage = new Image();
    playerIdleImage.src = './resources/images/player/idle/idle'+i+'.png';
    Images.playerIdle.push(playerIdleImage); // Push the image into the array
}


export{Images, AudioFiles};