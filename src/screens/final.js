import * as me from 'melonjs'
import { Player } from '../entities/player'
import { Brother } from '../entities/brothers'
import { Mother } from '../entities/mother'
import UIContainer from '../entities/HUD'

export class PlayScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    me.level.load('final')

    // add our HUD to the game world
    if (typeof this.HUD === 'undefined') {
      this.HUD = new UIContainer()
    }
    me.game.world.addChild(this.HUD)

    me.game.world.addChild(new Player(0, 92 -32), 1)

    me.game.world.addChild(new Mother(250, 92 -32), 1)

    me.game.world.addChild(new Brother(100, 92 -32), 1)

    me.game.world.addChild(new Brother(200, 92 -32), 1)

    me.game.world.addChild(new Brother(300, 92 -32), 1)
  }
}
