import Component from "./component.js";
import Renderer from "./renderer.js";
import { Images } from "../GameEngine/resources.js";

class Animation extends Component {
  constructor(renderer, animName) {
    super();
    this.sprites = [];
    this.currentSpriteIndex = 0;
    this.isPlaying = false;
    this.animationFrameId = null;
    this.renderer = renderer;
    this.animName = animName;
    this.loadSprites();
  }

  async loadSprites() {
    if (this.animName === "playerIdle") {
      const imagePromises = Images.playerIdle.map((imagePath) => this.loadImage(imagePath));
      try {
        const loadedImages = await Promise.all(imagePromises);
        if (loadedImages.length > 0) {
          this.sprites = loadedImages;
          console.log('Sprites loaded:', this.sprites);
        } else {
          console.log('No sprites loaded.');
        }
      } catch (error) {
        console.error('Error loading sprites:', error);
      }
    }
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = src;
    });
  }
  

  play() {
    this.isPlaying = true;
    this.currentSpriteIndex = 0;
    this.startAnimation();
    console.log('Animation Playing');
  }

  stop() {
    this.isPlaying = false;
    this.currentSpriteIndex = 0;
    cancelAnimationFrame(this.animationFrameId);
  }

  startAnimation() {
    const animate = () => {
      if (this.isPlaying) {
        // Render the current sprite using Renderer class
        this.renderer.image = this.sprites[this.currentSpriteIndex];
        this.renderer.draw(this.renderer.ctx,this.renderer.image);

        // Increment the currentSpriteIndex
        this.currentSpriteIndex++;

        // If the currentSpriteIndex exceeds the length of sprites array, reset it to 0
        if (this.currentSpriteIndex >= this.sprites.length) {
          this.currentSpriteIndex = 0;
        }

        // Use requestAnimationFrame to call startAnimation recursively
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start the animation loop
    animate();
  }
}

export default Animation;
