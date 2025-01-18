import './style.css'
import * as me from 'melonjs'
import { game } from './game.js'
import { ressources } from './ressources.js'
import { PlayScreen } from './screens/play.js'
import { Player } from './entities/player.js'
import { Terminator } from './entities/terminator.js'
import { Poop } from './entities/poop.js'

me.device.onReady(() => {
  me.video.init(384, 216, {
    antiAlias: false,
    scale: 'auto',
    scaleMethod: 'fit',
  })
  me.loader.setOptions({ crossOrigin: 'anonymous' })
  me.audio.init('mp3,ogg')
  me.loader.preload(ressources, () => {
    me.state.set(me.state.PLAY, new PlayScreen())

    // register the entities
    me.pool.register('mcsquare', Player)
    me.pool.register('terminator', Terminator)
    me.pool.register('poop', Poop)

    game.hud = new me.TextureAtlas(
      me.loader.getJSON('tileset'),
      me.loader.getImage('tileset')
    )
    game.texture = new me.TextureAtlas(
      me.loader.getJSON('mcsquare'),
      me.loader.getImage('mcsquare')
    )

    me.state.change(me.state.PLAY, false)
  })
})
