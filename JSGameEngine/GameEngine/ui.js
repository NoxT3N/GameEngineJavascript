class UI extends Component{
    constructor(text,x,y,font = "20px", color = "white",textAllign="left",textBaseline="top"){
        super();
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.textAllign = textAllign;
        this.textBaseline = textBaseline;
    }
    draw(ctx){
        const camera = this.gameObject.game.camera;

        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.textAllign = this.textAllign;
        ctx.textBaseline = this.textBaseline;

        ctx.fillText(this.text, this.x + camera.x, this.y + camera.y);
    }
    setText(newText){
        this.text = newText;
    }
}
export default UI;