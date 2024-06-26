import GameObject from "../GameEngine/gameobject.js";
import Renderer from "../GameEngine/renderer.js";
import Physics from "../GameEngine/physics.js";
import Input from "../GameEngine/input.js";
import{Images} from "../GameEngine/resources.js";
import Platform from "./platform.js";
import Collectible from "./collectible.js";
import ParticleSystem from "../GameEngine/particleSystem.js";
import Enemy from "./enemy.js";
import Animation from "../GameEngine/animation.js"; 

class Player extends GameObject{
    constructor(x,y){
        super(x,y);
        this.renderer = new Renderer('blue',50,50, Images.playerIdle[0]);
        this.addComponent(this.renderer);
        this.addComponent(new Physics({x:0, y:0}));
        this.addComponent(new Input());
        this.idleAnim = new Animation("idle", "player",9, 4, this.renderer);
        this.addComponent(this.idleAnim);
        this.jumpAnim = new Animation("jump", "player",1 ,1, this.renderer);
        this.addComponent(this.jumpAnim);
        this.runAnim = new Animation("run", "player", 6, 12, this.renderer);
        this.addComponent(this.runAnim);
        this.attackAnim = new Animation("attack", "player", 5, 5, this.renderer);
        this.addComponent(this.attackAnim);
        this.hurtAnim = new Animation("hurt", "player", 2, 1, this.renderer);
        this.addComponent(this.hurtAnim);

        this.direction = 1;
        this.lives = 3;
        this.score = 0;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 400;
        this.jumpTime = 0.3;
        this.jumpTimer = 0;
        this.isInvulnerable = false;
        this.isGamepadMovement = false;
        this.isGamepadJump = false;
        this.idleAnim.play();
    }

    update(deltaTime){
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);

        if(physics.velocity.x !== 0 && !this.isJumping){
            this.runAnim.play();
        }

        if(input.isKeyDown('KeyF') && !this.isJumping && !this.attackAnim.isPlaying){
            this.idleAnim.stop();
            this.runAnim.stop();
            this.jumpAnim.stop();
            this.attackAnim.play();
            console.log("Attack");
            console.log(this.attackAnim.currentFrame);
        }
        else if(!input.isKeyDown('KeyF') && this.attackAnim.isPlaying){
            this.attackAnim.stop();
        }



        if (!input.isKeyDown('ArrowRight') && !input.isKeyDown('ArrowLeft') && !input.isKeyDown('ArrowUp')) {
            this.runAnim.stop();
            this.idleAnim.play();
        }
        else{
            this.idleAnim.stop();
        }

        this.handleGamepadInput(input);

        if(!this.isGamepadMovement && input.isKeyDown('ArrowRight')){
            physics.velocity.x = 100;
            this.direction = -1;
        }
        else if(!this.isGamepadMovement && input.isKeyDown('ArrowLeft')){
            physics.velocity.x = -100;
            this.direction = 1;
        }
        else if(!this.isGamepadMovement){
            physics.velocity.x = 0;
        }

        if(!this.isGamepadJump && input.isKeyDown('ArrowUp')&& this.isOnPlatform){
            this.startJump();
        }
        if(this.isJumping){
            this.updateJump(deltaTime);
        }

        const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
        for(const collectible of collectibles){
            if(physics.isColliding(collectible.getComponent(Physics))){
                this.collect(collectible);
                this.game.removeGameObject(collectible);
            }
        }

        const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
        for(const enemy of enemies){
            if(physics.isColliding(enemy.getComponent(Physics))){
                this.collidedWithEnemy();
            }
        }

        this.isOnPlatform = false; //resets before
        const platforms = this.game.gameObjects.filter((obj)=>obj instanceof Platform);

        for(const platform of platforms){
            if(physics.isColliding(platform.getComponent(Physics))){
                if(!this.isJumping){
                    physics.velocity.y = 0;
                    physics.acceleration.y = 0;
                    this.y = platform.y - this.renderer.height;
                    this.isOnPlatform = true;
                }
            }
        }
        if(this.y>this.game.canvas.height){
            this.resetPlayerState();
        }
        if(this.lives<=0){
            location.reload;
        }
        if(this.score >= 3){
            console.log("You Win!!")
            location.reload();
        }
        super.update(deltaTime);
    }
    handleGamepadInput(input){
        const gamepad = input.getGamepad();
        const physics = this.getComponent(Physics);
        if(gamepad){
            this.isGamepadMovement = false;
            this.isGamepadJump = false;
            const horizontalAxis = gamepad.axes[0];
            if(horizontalAxis>0.1){
                this.isGamepadMovement = true;
                physics.velocity.x = 100;
                this.direction = -1;
            }
            else if(horizontalAxis<-0.1){
                this.isGamepadMovement = true;
                physics.velocity.x = -100;
                this.direction = 1;
            }
            else{
                physics.velocity.x = 0;
            }
            if(input.isGamepadButtonDown(0)&& this.isOnPlatform){
                this.isGamepadJump = true;
                this.startJump();
            }
        }
    }
    startJump(){
        if(this.isOnPlatform){
            this.isJumping = true;
            this.jumpTimer = this.jumpTime;
            this.getComponent(Physics).velocity.y = -this.jumpForce;
            this.isOnPlatform = false;
            this.idleAnim.stop();
            this.runAnim.stop();
            this.jumpAnim.play();
        }
    }

    updateJump(deltaTime){
        this.jumpTimer -= deltaTime;
        if(this.jumpTimer<=0||this.getComponent(Physics).velocity.y>0){
            this.isJumping = false;
            this.jumpAnim.stop();
        }
    }
    collidedWithEnemy(){
        if(!this.isInvulnerable){
            this.hurtAnim.play();
            this.lives--;
            this.isInvulnerable = true;
            setTimeout(()=>{
                this.isInvulnerable = false;
                this.hurtAnim.stop();
            },2000)
        }
    }

    collect(collectible){
        this.score += collectible.value;
        console.log(`Score: ${this.score}`);
        this.emitCollectParticles(collectible);
    }

    emitCollectParticles(){
        const particleSystem = new ParticleSystem(this.x,this.y,"yellow",20,1,.5);
        this.game.addGameObject(particleSystem);
    }
    resetPlayerState(){
        this.x = this.game.canvas.width/2;
        this.y = this.game.canvas.height/2;
        this.getComponent(Physics).velocity = {x:0, y:0};
        this.getComponent(Physics).acceleration = {x:0, y:0};
        this.direction = 1;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpTimer = 0;
    }
    resetGame(){
        this.lives = 3;
        this.score = 0;
        this.resetPlayerState();
    }
} export default Player;