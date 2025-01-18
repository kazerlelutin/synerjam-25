import * as me from 'melonjs'
import { game } from './../game.js'


class UIBackground extends me.Renderable {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.opacity = game.dialog ? .8 : 0;
    this.color = `rgba(0, 0, 0, ${this.opacity})`;
    this.borderRadius = .1; // obligatoire

  }

  draw(renderer) {
    this.opacity = game.dialog ? .8 : 0;
    this.color = `rgba(0, 0, 0, ${this.opacity})`;
    renderer.setColor(this.color);
    renderer.fillRoundRect(0, 0, me.game.viewport.width * 1.75, this.height, this.borderRadius);
  }
}



class DialogItem extends me.BitmapText {

  dialog = game.dialog || ' '
  /**
   * constructor
   */
  constructor() {
    // call the super constructor
    super(10, 10, {
      font: 'PressStart2P',
      textAlign: 'left',
      textBaseline: 'top',
      text: game.dialog || ' ',
      size: .35,
      lineHeight: 1.5,
      lineWidth: me.video.renderer.width - 20,
    })

    this.relative = new me.Vector2d(5, 5)

    this.floating = false

    // recalculate the object position if the canvas is resize
    me.event.on(
      me.event.CANVAS_ONRESIZE,
      function (w, h) {
        this.pos.set(w, h, 0).add(this.relative)
      }.bind(this)
    )
  }

  update(dt) {
    if (!!game.dialog) {

      this.dialog = game.dialog
      this.setText(this.dialog)


      console.log('dialog', game.dialog)


      const dialTimer = me.timer.setTimeout(() => {

        game.dialog = ""
        this.setText(game.dialog)
      }, 4000)

      if(game.dialog !== this.dialog)
        me.timer.clearTimeout(dialTimer)
      
      // this.isDirty = true
    }
    return super.update(dt)
  }
}

/**
 * a HUD container and child items
 */
class UIContainer extends me.Container {
  constructor() {

    // call the constructor
    super(0, 0,
      me.game.viewport.width,
      me.game.viewport.height,
    )



    // persistent across level change
    this.isPersistent = true

    // Use screen coordinates
    this.floating = true

    // make sure our object is always draw first
    this.z = Infinity

    // give a name
    this.name = 'HUD'

    // this.backgroundColor.setColor(255, 0, 0);
    this.addChild(new UIBackground(0, 0, me.game.viewport.width, 75));

    // add our child score object at position
    this.addChild(new DialogItem())

  }

}

export default UIContainer
