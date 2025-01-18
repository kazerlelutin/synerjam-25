import * as me from 'melonjs'
import { Player } from '../entities/player'
import UIContainer from '../entities/HUD'

export class Dream extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    me.level.load('dream')

    me.game.world.addChild(new Player(50, 950), 1)

  }
}