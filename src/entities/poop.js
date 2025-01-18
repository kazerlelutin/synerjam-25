import * as me from 'melonjs'

export const LASER_SIZE = {
  WIDTH: 8,
  HEIGHT: 8,
}

export class Poop extends me.Entity {
  isOnTheFloor = false
  /**
   * constructor
   */
  constructor(x, y, direction) {
    super(x, y, { width: 8, height: 8 })

    this.name = 'poop'

    // add a physic body and configure it
    // this.body = new me.Body(this);
    // add a default collision shape

    this.texture = new me.TextureAtlas(
      me.loader.getJSON('poop'),
      me.loader.getImage('poop')
    )

    this.renderable = this.texture.createAnimationFromName()

    //@ts-ignore
    this.renderable.setCurrentAnimation('stand')

    // cap the velocity of the laser beam to the initial velocity
    const speed = 10
    this.body.setMaxVelocity(speed, 10)
    // this object is officially a projectile
    this.body.collisionType = me.collision.types.PROJECTILE_OBJECT

    this.body.gravityScale = 1

    this.anchorPoint.set(0.5, -0.5) // ancre en haut/milieu

    const angle = Math.PI / 4 // 45 degrees for a parabolic trajectory

    // always update, so that we can track it when outside the screen
    this.alwaysUpdate = true
    this.body.force.x = direction ? speed : -speed
    this.body.force.y = -speed * Math.sin(angle) // Negative to go upwards
    this.isOnTheFloor = false
  }

  /**
   * call when the object instance is being recycled
   */
  onResetEvent(x, y) {
    this.pos.set(x, y)
  }

  /**
   *
   * @param dt
   * @returns {boolean}
   */
  update(dt) {
    if (this.pos.x > me.game.viewport.width || this.pos.x + this.width < 0) {
      me.game.world.removeChild(this)
    }

    // Pour le stand
    return super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0
  }

  /**
   * @param response
   * @param other
   * @returns {boolean}
   */
  onCollision(response, other) {
    if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
      me.game.world.removeChild(this)
      return false
    }
    if (other.body.collisionType === me.collision.types.WORLD_SHAPE) {
      // Stop the movement when hitting the ground
      this.renderable.setCurrentAnimation('splash', () => {
        this.renderable.setAnimationFrame(this.renderable.current.length - 1)
      })
      this.body.force.y = 0
      this.body.force.x = 0
      this.body.vel.y = 0
      this.body.vel.x = 0
      this.isOnTheFloor = true
      this.body.collisionType = me.collision.types.NO_OBJECT
      this.body.gravityScale = 0

      me.audio.stop('poop_ground')
      me.audio.play('poop_ground', false)

      me.timer.setTimeout(() => {
        me.game.world.removeChild(this)
      }, 5000)

      return false
    }
  }

  draw(renderer) {
    super.draw(renderer)
  }
}

export default Poop
