import GameObject from "./gameobject.js"
import Particle from "./particle.js"
import Physics from "./physics.js"

class ParticleSystem extends GameObject{
    constructor(x,y,color,count,lifeDuration, emitDuration){
        super(x,y);
        this.color = color;
        this.count = count;
        this.lifeDuration = lifeDuration;
        this.emitDuration = emitDuration;
        this.particleEmitted = 0;
    }

    update(deltaTime){
        if(this.emitDuration > 0 ){
            this.emitParticles(deltaTime)
            //Decrease the emit duration by the time that has passed since last frame
            this.emitDuration -= deltaTime;
        }
        else if(this.emitDuration <= 0){
            this.game.removeGameObject(this);
        }
        super.update(deltaTime);
    }
    emitParticles(deltaTime){
        const particlesToEmit = Math.ceil((this.count/this.emitDuration)*deltaTime);

        for(let i = 0; i < particlesToEmit&& this.particleEmitted < this.count; i++){
            const lifeDuration = this.lifeDuration + Math.random() -0.5;
            const particle = new Particle(this.x, this.y, Math.random()*5, Math.random()* 5, this.color, lifeDuration);
            particle.addComponent(new Physics({x: (Math.random()-.5)*50,y:(Math.random()-0.5)*50}, {x:0,y:0}));
            this.game.addGameObject(particle);
            this.particlesEmitted++;
        }
    }
}
    export default ParticleSystem;