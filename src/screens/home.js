import * as me from 'melonjs'
import { Player } from '../entities/player'
import { Family } from '../entities/family'
import { game } from '../game'

export class HomeScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    game.level = 1
    me.level.load('home')
    me.game.viewport.fadeOut('#000', 850);
    me.game.world.addChild(new Player(130, 192 - 32), 1)

    const family = [

      {
        x: 300,
        y: 192 - 25,
        opts: {
          userName: 'Mother',
          type: 'mother',
        }

      },
      {
        x: 280,
        y: 192 - 16,
        opts: {
          userName: 'Jimmy',
          type: 'brother',
        }
      },
      {
        x: 230,
        y: 192 - 16,
        opts: {
          userName: 'Dylan',
          type: 'brother',
        }

      },
      {
        x: 350,
        y: 192 - 16,
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
