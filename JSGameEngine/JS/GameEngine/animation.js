import Component from "./component.js";
import Renderer from "./renderer.js";

class Animation extends Component {
  constructor(folderPath) {
    super();
    this.folderPath = folderPath;
    this.sprites = [];
    this.currentSpriteIndex = 0;
    this.isPlaying = false;
  }

  loadSprites() {
    // Fetch the sprite files from the folderPath
    fetch(this.folderPath)
      .then(response => response.json())
      .then(data => {
        // Add each sprite to the this.sprites array
        this.sprites = data.sprites;
      })
      .catch(error => {
        console.error('Error loading sprites:', error);
        this.stop();
      });
  }

  play() {
    if (this.sprites.length === 0) {
      this.loadSprites();
    }

    this.isPlaying = true;
    this.currentSpriteIndex = 0;
    this.startAnimation();
    console.log('Animation Playing');  
  }

  stop() {
    this.isPlaying = false;
    this.currentSpriteIndex = 0;
    this.stopAnimation();
  }

  startAnimation() {
    // Start the animation loop
    // Render the current sprite using Renderer class
    // Increment the currentSpriteIndex
    // If the currentSpriteIndex exceeds the length of sprites array, reset it to 0
    // Use requestAnimationFrame to call startAnimation recursively
    for (let i = 0; i < this.sprites.length; i++) {
      Renderer.render(this.sprites[i]);
      this.currentSpriteIndex++;
      if (this.currentSpriteIndex >= this.sprites.length) {
        this.currentSpriteIndex = 0;
      }
    }
  }

  stopAnimation() {
    cancelAnimationFrame(this.startAnimation);
    clearTimeout(this.startAnimation);
  }
}

export default Animation;

