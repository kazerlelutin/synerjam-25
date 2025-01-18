import './style.css'
import * as me from 'melonjs'
import { game } from './game.js'
import { ressources } from './ressources.js'
import { PlayScreen } from './screens/play.js'
import { Player } from './entities/player.js'
import { Brother } from './entities/brothers.js'
import { Mother } from './entities/mother.js'
import { HomeScreen } from './screens/home.js'
import { Dialog } from './entities/dialog.js'

me.device.onReady(() => {
  me.video.init(384, 216, {
    antiAlias: false,
    scale: 'auto',
    scaleMethod: 'fit',
  })
  me.loader.setOptions({ crossOrigin: 'anonymous' })
  me.audio.init('mp3,ogg')
  me.loader.preload(ressources, () => {
    me.state.set(me.state.PLAY, new HomeScreen())

    // register the entities
    me.pool.register('patate', Player)
    me.pool.register('brother', Brother)
    me.pool.register('mother', Mother)
    me.pool.register('dialog', Dialog)

    game.hud = new me.TextureAtlas(
      me.loader.getJSON('tileset'),
      me.loader.getImage('tileset')
    )

 

    game.texture = new me.TextureAtlas(
      me.loader.getJSON('patate'),
      me.loader.getImage('patate')
    )

    me.state.change(me.state.PLAY, false)
  })
})
