export const ressources = [
  { name: 'tileset', type: 'image', src: 'img/tileset.png' },
  { name: 'tileset', type: 'json', src: 'tileset.json' },

  //PLAYER ========================================================
  { name: 'mcsquare', type: 'json', src: 'entities/mcsquare.json' },
  { name: 'mcsquare', type: 'image', src: 'entities/mcsquare.png' },

  //FOES ========================================================
  { name: 'terminator', type: 'json', src: 'entities/terminator.json' },
  { name: 'terminator', type: 'image', src: 'entities/terminator.png' },

  //PROJECTILE ========================================================
  { name: 'poop', type: 'json', src: 'entities/poop.json' },
  { name: 'poop', type: 'image', src: 'entities/poop.png' },

  //SOUNDS ========================================================
  { name: 'jump', type: 'audio', src: 'sounds/' },
  { name: 'explosion', type: 'audio', src: 'sounds/' },
  { name: 'poop_ground', type: 'audio', src: 'sounds/' },
  { name: 'hurt', type: 'audio', src: 'sounds/' },
  { name: 'outch', type: 'audio', src: 'sounds/' },
  { name: 'projet', type: 'audio', src: 'sounds/' },

  { name: 'level1', type: 'tmx', src: 'tiles/level1.tmx' },

  { name: 'tileset', type: 'tsx', src: 'tiles/tileset.tsx' },

  /* Bitmap Font
   * @example
   * { name: "example_fnt", type: "image", src: "data/img/example_fnt.png" },
   * { name: "example_fnt", type: "binary", src: "data/img/example_fnt.fnt" },
   */
  { name: 'PressStart2P', type: 'image', src: 'fnt/PressStart2P.png' },
  { name: 'PressStart2P', type: 'binary', src: 'fnt/PressStart2P.fnt' },
]
