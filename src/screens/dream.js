import * as me from 'melonjs'
import { Player } from '../entities/player'
import { game } from '../game'

export class Dream extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    me.level.load('dream')
    me.game.viewport.fadeOut('#000', 150);
    game.level = 2
    game.isKinematic = false
    me.game.world.addChild(new Player(50, 0), 1)
  }
}