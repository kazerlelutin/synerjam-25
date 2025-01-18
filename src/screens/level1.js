import * as me from 'melonjs'
import { Player } from '../entities/player'
import UIContainer from '../entities/HUD'

export class HomeScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    me.level.load('level1')

    // add our HUD to the game world
    if (typeof this.HUD === 'undefined') {
      this.HUD = new UIContainer()
    }

    me.game.world.addChild(this.HUD)

    me.game.world.addChild(new Player(130, 192 -32), 1)
  }
}