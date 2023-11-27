import GameObject from "../GameEngine/gameobject";
import Renderer from "../GameEngine/renderer";
import Physics from "../GameEngine/physics";

class Collectible extends GameObject{
    constructor(x,y, width, height, color = "gold"){
        super(x,y);
        this.addComponent(new Renderer(color,width,height));
        this.addComponent(new Physics({x:0,y:0},{x:0,y:0}));
        
        this.tag = "collectible";

        this.value = 1;
    }
}
export default Collectible;