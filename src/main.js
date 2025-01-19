import './style.css'
import * as me from 'melonjs'
import { game } from './game.js'
import { ressources } from './ressources.js'
import { Player } from './entities/player.js'
import { Family } from './entities/family.js'
import { HomeScreen } from './screens/home.js'
import { Dream } from './screens/dream.js'
import { Dialog } from './entities/dialog.js'
import { FinalScreen } from './screens/final.js'
import { Interlude } from './screens/interlude.js'

me.device.onReady(() => {
  me.video.init(384, 216, {
    antiAlias: false,
    scale: 'auto',
    scaleMethod: 'fit',
  })


  // === CONTROLS ===
  me.input.bindKey(me.input.KEY.LEFT, 'left')
  me.input.bindKey(me.input.KEY.RIGHT, 'right')
  me.input.bindKey(me.input.KEY.X, 'jump', true)
  me.input.bindKey(me.input.KEY.UP, 'jump', true)
  me.input.bindKey(me.input.KEY.SPACE, 'jump', true)
  me.input.bindKey(me.input.KEY.DOWN, 'down')

  me.input.bindKey(me.input.KEY.CTRL, 'interact', true)

  me.input.bindKey(me.input.KEY.Q, 'left')
  me.input.bindKey(me.input.KEY.D, 'right')
  me.input.bindKey(me.input.KEY.Z, 'jump', true)
  me.input.bindKey(me.input.KEY.S, 'down')


  me.loader.setOptions({ crossOrigin: 'anonymous' })
  me.audio.init('mp3,ogg')
  me.loader.preload(ressources, () => {

    me.state.set(me.state.PLAY, new HomeScreen())

    me.state.set(me.state.USER + 3, new Interlude())
    me.state.set(me.state.USER + 1, new Dream());
    me.state.set(me.state.USER + 2, new FinalScreen());

    // me.state.set(me.state.PLAY, new HomeScreen())

    // register the entities
    me.pool.register('patate', Player)
    me.pool.register('dialog', Dialog)
    me.pool.register('family', Family)

    game.hud = new me.TextureAtlas(
      me.loader.getJSON('tileset'),
      me.loader.getImage('tileset')
    )



    game.texture = new me.TextureAtlas(
      me.loader.getJSON('patate'),
      me.loader.getImage('patate')
    )

    //me.state.change(me.state.PLAY, false)
    me.state.change(me.state.PLAY, false)
  })
})
