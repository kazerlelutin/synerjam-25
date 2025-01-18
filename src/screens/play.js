import * as me from 'melonjs'
import { Player } from '../entities/player'
import UIContainer from '../entities/HUD'

export class PlayScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    me.level.load('finald')

    // add our HUD to the game world
    if (typeof this.HUD === 'undefined') {
      this.HUD = new UIContainer()
    }
    me.game.world.addChild(this.HUD)

    me.game.world.addChild(new me.ColorLayer('background', '#000033'), 0)

    /*
    me.game.world.addChild(new Player(130, 100), 1)

    me.game.world.addChild(new Terminator(100, 280), 1)

    me.game.world.addChild(new Terminator(300, 280), 1)
    // me.game.world.addChild(new Terminator(310, 192), 1);

    */
  }
}
