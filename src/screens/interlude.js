import * as me from 'melonjs'
import { game } from '../game'

export class Interlude extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    me.level.load('interlude')
    me.game.viewport.fadeOut('#000', 550);
    game.level = 3

    me.timer.setTimeout(() => {
      console.log('Changement de niveau')
      me.game.viewport.fadeIn('#000', 150, function () {
        me.state.change(me.state.USER + 1);
      })
    }, 4000)
  }
}