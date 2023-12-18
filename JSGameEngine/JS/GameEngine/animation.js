import Component from "../GameEngine/component.js";
import Renderer from "../GameEngine/renderer.js";

class Animation extends Component {
  constructor(animName, gameObjectName, frameNums, frameRate, renderer) {
    super();
    this.images = [];
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.isPlaying = false;
    this.frameDuration = 1 / frameRate;
    this.elapsedTime = 0;
    this.renderer = renderer;
    this.gameObjectName = gameObjectName;
    this.animName = animName;
    this.frameNums = frameNums;

    // Load images asynchronously
    this.loadImages(animName, gameObjectName, frameNums);
  }

  async loadImages(animName, gameObjectName, frameNums) {
    try {
      // Generate an array of image loading promises for each frame
      const imagePromises = Array.from({ length: frameNums }, (_, i) => {
        const src = `./resources/images/${gameObjectName}/${animName}/${animName}${i + 1}.png`;
        return this.loadImage(src);
      });

      // Wait for all image loading promises to resolve
      this.images = await Promise.all(imagePromises);

      console.log(`Images loaded successfully for ${animName}`);
    } catch (error) {
      console.error(`Error loading images for ${animName}:`, error);
    }
  }

  loadImage(src) {
    // Returns a promise that resolves with an Image object when the image is loaded
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(`Error loading image at ${src}: ${error.message}`);
      img.src = src;
    });
  }

  play() {
    // Check if the animation is already playing or if no images are loaded
    if (this.isPlaying || !this.images.length) return;
    this.isPlaying = true; 
    this.elapsedTime = 0; 
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
  }

  update(deltaTime) {
    if (!this.isPlaying) return;
  
    // Calculate the elapsed frames based on the frame rate and delta time
    this.elapsedTime += deltaTime * this.frameRate;
  
    // Get the total frames and update the current frame index
    const frameCount = this.images.length;
    this.currentFrame = Math.floor(this.elapsedTime) % frameCount;
  
    // Set the current frame image to the Renderer component
    const currentImage = this.images[this.currentFrame];
    const rendererComponent = this.gameObject.getComponent(Renderer);
  
    if (rendererComponent) {
      rendererComponent.image = currentImage;
    }
  }
  
}

export default Animation;
