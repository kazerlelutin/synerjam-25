import * as me from 'melonjs'
import { Player } from '../entities/player'
import { Family } from '../entities/family'

export class FinalScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    me.level.load('home')
    me.game.viewport.fadeOut('#000', 150);
    me.game.world.addChild(new Player(130, 192 - 32), 1)

    const family = [

      {
        x: 300,
        y: 192 - 42,
        opts: {
          userName: 'Mother',
          type: 'mother',
        }

      },
      {
        x: 300,
        y: 192 - 32,
        opts: {
          userName: 'Jimmy',
          type: 'brother',
        }
      },
      {
        x: 280,
        y: 192 - 32,
        opts: {
          userName: 'Dylan',
          type: 'brother',
        }

      },
      {
        x: 320,
        y: 192 - 32,
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
