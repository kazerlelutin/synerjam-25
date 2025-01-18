import * as me from 'melonjs'
import { game } from './../game.js'

/**
 * a basic control to toggle fullscreen on/off
 */
class FSControl extends me.UISpriteElement {
  /**
   * constructor
   */
  constructor(x, y) {
    super(x, y, {
      image: game.hud,
      region: 'fs.png',
    })
    this.setOpacity(0.5)
    this.floating = false
  }

  /**
   * function called when the pointer is over the object
   */
  onOver(/* event */) {
    this.setOpacity(1.0)
  }

  /**
   * function called when the pointer is leaving the object area
   */
  onOut(/* event */) {
    this.setOpacity(0.5)
  }

  /**
   * function called when the object is clicked on
   */
  onClick(/* event */) {
    if (!me.device.isFullscreen()) {
      me.device.requestFullscreen()
    } else {
      me.device.exitFullscreen()
    }
    return false
  }
}

class ScoreItem extends me.BitmapText {
  /**
   * constructor
   */
  constructor(x, y) {
    // call the super constructor
    super(x, y, {
      font: 'PressStart2P',
      textAlign: 'left',
      textBaseline: 'top',
      text: '0',
    })

    this.relative = new me.Vector2d(x, y)

    this.floating = false

    // local copy of the global score
    this.score = -1

    this.scale(0.6, 0.6)

    // recalculate the object position if the canvas is resize
    me.event.on(
      me.event.CANVAS_ONRESIZE,
      function (w, h) {
        this.pos.set(w, h, 0).add(this.relative)
      }.bind(this)
    )
  }

  /**
   * update function
   */
  update(dt) {
    if (this.score !== game.data.score) {
      this.score = game.data.score
      this.setText(this.score)
      this.isDirty = true
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
    super()

    // persistent across level change
    this.isPersistent = true

    // Use screen coordinates
    this.floating = true

    // make sure our object is always draw first
    this.z = Infinity

    // give a name
    this.name = 'HUD'

    // add our child score object at position
    this.addChild(new ScoreItem(10, 10))

    if (!me.device.isMobile) {
      // add our fullscreen control object
      this.addChild(
        new FSControl(me.game.viewport.width - 20, me.game.viewport.height - 20)
      )
    }
  }
}

export default UIContainer
