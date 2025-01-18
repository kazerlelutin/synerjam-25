import * as me from 'melonjs'
import { Player } from '../entities/player'
import { Brother } from '../entities/brothers'
import UIContainer from '../entities/HUD'

export class HomeScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    me.level.load('home')

    // add our HUD to the game world
    if (typeof this.HUD === 'undefined') {
      this.HUD = new UIContainer()
    }

    me.game.world.addChild(this.HUD)

    me.game.world.addChild(new Player(130, 100), 1)

    me.game.world.addChild(new Brother(230, 100), 1)

    me.game.world.addChild(new Brother(200, 100), 1)

    me.game.world.addChild(new Brother(300, 100), 1)
  }
}
