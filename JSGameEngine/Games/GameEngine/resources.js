const Images = {
    player: new Image(),
    enemy: new Image(),
};

const AudioFiles = {
    jump: "...",
    collect: "...",
};

Images.player.src = "./resources/images/player.png"
Images.enemy.src = "./resources/images/enemy.png"

export{Images, AudioFiles};