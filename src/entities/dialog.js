import * as me from 'melonjs';

export class Dialog extends me.Entity {
  constructor(x, y) {
    super(x, y,  { width: 16, height: 16 });

    this.z = Infinity;

    this.anchorPoint.set(0, 0);
    this.texture = new me.TextureAtlas(
      me.loader.getJSON('dialog'),
      me.loader.getImage('dialog')
    )

    this.body.gravityScale = 0

    this.body.setMaxVelocity(0,0)

    this.body.collisionType = me.collision.types.NO_OBJECT

    this.renderable = this.texture.createAnimationFromName()
    this.renderable.setCurrentAnimation('stand')
  }

  update(dt) {
    return true; 
  }
}
