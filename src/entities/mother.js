import * as me from 'melonjs'
import { game } from '../game'

export class Mother extends me.Entity {
  dying = false
  multipleJump = 1
  name = 'mother'
  hurt = false

  /**
   * constructor
   */
  constructor(x = 0, y = 0) {
    // call the super constructor
    super(x, y, { width: 32, height: 48 })

    this.name = 'mother'

    this.body.collisionType = me.collision.types.NPC_OBJECT

    this.body.setMaxVelocity(3, 15)
    this.body.setFriction(0.7, 0)

    this.body.gravityScale = 0

    // don't update the entities when out of the viewport
    this.alwaysUpdate = false

    this.walkLeft = false
    // a specific flag to recognize these enemies
    this.isMovingEnemy = false

    this.texture = new me.TextureAtlas(
      me.loader.getJSON('mother'),
      me.loader.getImage('mother')
    )
    // create a new sprite with all animations from the paladin atlas
    this.renderable = this.texture.createAnimationFromName()
    //@ts-ignore
    this.renderable.setCurrentAnimation('stand')
    this.renderable.flipX(true)

    this.anchorPoint.set(0, 0) // ancre en haut/milieu

    this.hurt = false
    // Load the texture atlas for terminator
  }

  draw(renderer) {
    super.draw(renderer)
  }

  update(dt) {
    // Pour le stand
    return super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0
  }

  showDialogue() {

    game.dialog = "Un essai de dialogue vraiment beaucoup plus long\n pour voir et si c'est pas trop long"
  }
  

  onCollision(response, other) {

    if (other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
      // spike or any other fixed danger

    }

    
    return false
  }
}
