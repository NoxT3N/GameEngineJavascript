import Component from "./component.js";

class Animator extends Component {
  constructor(spriteSheet, frameWidth, frameHeight, frameCount, frameDuration) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameCount = frameCount;
    this.frameDuration = frameDuration;
    
    this.currentFrame = 0;
    this.elapsedTime = 0;
  }
  
  update(deltaTime) {
    this.elapsedTime += deltaTime;
    
    if (this.elapsedTime >= this.frameDuration) {
      this.currentFrame++;
      this.elapsedTime = 0;
      
      if (this.currentFrame >= this.frameCount) {
        this.currentFrame = 0;
      }
    }
  }
  
  draw(context, x, y) {
    context.drawImage(
      this.spriteSheet,
      this.currentFrame * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      x,
      y,
      this.frameWidth,
      this.frameHeight
    );
  }
}
export default Animator;

