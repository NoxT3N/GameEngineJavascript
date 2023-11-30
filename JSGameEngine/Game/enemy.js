import GameObject from "../GameEngine/gameobject";
import Renderer from "../GameEngine/renderer";
import Physics from "../GameEngine/physics";
import { Images } from "../GameEngine/resources";
import Player from "./player";
import Platform from "./platform";

class Enemy extends GameObject{
    constructor(x,y){
        super(x,y);
        this.addComponent(new Renderer("green",50,50, Images.enemy));
        this.addComponent(new Physics({x:50,y:0},{x:0,y:0}));
        this.movementDistance = 0;
        this.movementLimit = 100;
        this.movingRight = true;
    }
    update(deltaTime){
        const physics = this.getComponent(Physics);

        if(this.movingRight){
            if(this.movementDistance < this.movementLimit){
                physics.velocity.x = 50;
                this.movementDistance += Math.abs(physics.velocity.x)*deltaTime;
                this.getComponent(Renderer).gameObject.direction = 1;
            }
            else{
                this.movingRight = false;
                this.movementDistance = 0;
            }
        }
        else{
            if(this.movementDistance < this.movementLimit){
                physics.velocity.x = -50;
                this.movementDistance += Math.abs(physics.velocity.x)*deltaTime;
                this.getComponent(Renderer).gameObject.direction = -1;
            }
            else{
                this.movingRight = true;
                this.movementDistance = 0;
            }
        }
        const player = this.game.gameObject.find((obj)=> obj instanceof Player);
        if(physics.isColliding(player.getComponent(Physics))){
            player.collidedWithEnemy();
        }

        const platform = this.game.gameObject.filter((obj)=> obj instanceof Platform);
        this.isOnPlatform = false;
        for(const platform of platform){
            if(physics.isColliding(platform.getComponent(Physics))){
                physics.velocity.y=0;
                physics.acceleration.y = 0;
                this.y = platform.y - this.getComponent(Renderer).height
                
            }
        }
        

    }
    

}