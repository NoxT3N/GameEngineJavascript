import Renderer from "../GameEngine/renderer.js";
import Component from "../GameEngine/component.js";

class Animation extends Component{
  constructor(animName, frameRate, renderer) {
    super();
    this.images = [];
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.isPlaying = false;
    this.frameDuration = 1 / frameRate;
    this.elapsedTime = 0;
    this.renderer = renderer;

    // Load images asynchronously
    this.loadImages(animName);
  }

  async loadImages(animName) {
    for (let i = 1; i < 10; i++) {
      const src = `./resources/images/player/idle/idle${i}.png`;
      const image = await this.loadImage(src);
      this.images.push(image);
    }
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
      console.log(`Image loaded: ${src}`);
    });
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.elapsedTime = 0;
    this.timerId = requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    cancelAnimationFrame(this.timerId);
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime;

    while (this.elapsedTime >= this.frameDuration) {
      this.currentFrame = (this.currentFrame + 1) % this.images.length;
      this.elapsedTime -= this.frameDuration;
    }

    const currentImage = this.images[this.currentFrame];
    this.gameObject.getComponent(Renderer).image = currentImage;

    if (this.isPlaying) {
      this.timerId = requestAnimationFrame(this.update.bind(this));
    }
  }
}

export default Animation;
