import * as me from 'melonjs'
import { game } from './../game.js'


class UIBackground extends me.Renderable {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.opacity = .8 ;
    this.color = `rgba(0, 0, 0, ${this.opacity})`;
    this.borderRadius = .1; // obligatoire

  }

  draw(renderer) {

    renderer.setColor(this.color);
    renderer.fillRoundRect(0, 0, me.game.viewport.width * 1.75, this.height, this.borderRadius);
  }
}



class DialogItem extends me.BitmapText {

  dialog = game.dialog || ' '

  constructor(text) {
    super(10, 10, {
      font: 'PressStart2P',
      textAlign: 'left',
      textBaseline: 'top',
      text,
      size: .35,
      lineHeight: 1.5,
      lineWidth: me.video.renderer.width - 20,
    })

    this.relative = new me.Vector2d(5, 5)

    this.floating = false

    me.event.on(
      me.event.CANVAS_ONRESIZE,
      function (w, h) {
        this.pos.set(w, h, 0).add(this.relative)
      }.bind(this)
    )
  }

  update(dt) {
    return super.update(dt)
  }
}

/**
 * a HUD container and child items
 */
class UIContainer extends me.Container {
  constructor(text, userName) {
    super(0, 0,
      me.game.viewport.width,
      me.game.viewport.height

    )
    this.isPersistent = true

    this.floating = true
    this.z = Infinity
    this.name = 'HUD'
    this.userName = userName
    this.addChild(new UIBackground(0, 0, me.game.viewport.width, 75));
    this.addChild(new DialogItem(text))
  }

}

export default UIContainer
