import * as me from 'melonjs'
import { Player } from '../entities/player'
import { Brother } from '../entities/brothers'
import { Mother } from '../entities/mother'
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

    me.game.world.addChild(new Player(130, 192 -32), 1)

    me.game.world.addChild(new Mother(250, 192 -42), 1)

    me.game.world.addChild(new Brother(230, 192 -32, "bro1"), 1)

    me.game.world.addChild(new Brother(200, 192 -32, "bro2"), 1)

    me.game.world.addChild(new Brother(300, 192 -32, "bro3"), 1)
  }
}
