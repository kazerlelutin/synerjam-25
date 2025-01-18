import * as me from 'melonjs';
import { game } from '../game';

export class DialogBox extends me.Container {
  constructor(x, y, text, timeout = 3000) {
    super(x, y, 250, 60);

    this.z = Infinity;
    this.text = text;
    this.timeout = timeout;
    this.isInteractive = true; 
    this.anchorPoint.set(0, 0);

  //bg
    this.background = new me.Renderable(0, 0, this.width, this.height);
    this.background.alpha = 0.8; // Transparence
    this.background.draw = (renderer) => {

      console.log(this.pos.x, this.pos.y, this.width, this.height);
      renderer.setColor("rgba(0, 0, 0, " + this.background.alpha + ")");
      renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    };

    // text
    this.textObject = new me.BitmapText(10, 10, {
      font: "PressStart2P",
      size: 0.3,
      text: this.text,
    });

    //all element
    this.addChild(this.background);
    this.addChild(this.textObject);


    if (this.timeout > 0) {
      me.timer.setTimeout(() => {
        me.game.world.removeChild(this);
      }, this.timeout);
    }
  }



  /**
   * Update function
   */
  update(dt) {
    return true; // Toujours redessiner
  }
}
