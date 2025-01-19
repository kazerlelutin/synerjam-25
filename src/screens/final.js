import * as me from 'melonjs'
import { Player } from '../entities/player'
import { Family } from '../entities/family'
import { game } from '../game'

export class FinalScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {

    game.level = 4

    game.isKinematic = true
    game.playerMove = false
    me.game.viewport.fadeOut('#000', 250);
    me.level.load('final')
    me.game.world.addChild(new Player(350, 175 - 32), 1)

    const family = [

      {
        x: 140,
        y: 192 - 19,
        opts: {
          userName: 'Mother',
          type: 'mother',
        }

      },
      {
        x: 200,
        y: 192 - 10,
        opts: {
          userName: 'Jimmy',
          type: 'brother',
        }
      },
      {
        x: 250,
        y: 192 - 10,
        opts: {
          userName: 'Dylan',
          type: 'brother',
        }

      },
      {
        x: 300,
        y: 192 - 10,
        opts: {
          userName: 'Kevin',
          type: 'brother',
        }
      }
    ]

    family.forEach(pnj => {
      me.game.world.addChild(new Family(pnj.x, pnj.y, pnj.opts), 1)
    });



  }
}
