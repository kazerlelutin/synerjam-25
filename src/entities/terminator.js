import * as me from 'melonjs'
import { game } from '../game'

export class Terminator extends me.Entity {
  dying = false
  multipleJump = 1
  name = 'terminator'
  hurt = false

  /**
   * constructor
   */
  constructor(x = 0, y = 0) {
    // call the super constructor
    super(x, y, { width: 32, height: 32 })

    this.name = 'terminator'

    this.body.collisionType = me.collision.types.ENEMY_OBJECT

    this.body.setMaxVelocity(3, 15)
    this.body.setFriction(0.7, 0)

    this.body.gravityScale = 0

    // don't update the entities when out of the viewport
    this.alwaysUpdate = false

    this.walkLeft = false
    // a specific flag to recognize these enemies
    this.isMovingEnemy = false

    this.texture = new me.TextureAtlas(
      me.loader.getJSON('terminator'),
      me.loader.getImage('terminator')
    )
    // create a new sprite with all animations from the paladin atlas
    this.renderable = this.texture.createAnimationFromName()
    //@ts-ignore
    this.renderable.setCurrentAnimation('stand')
    this.renderable.flipX(true)

    this.anchorPoint.set(0.5, 0.5) // ancre en haut/milieu

    this.hurt = false
    // Load the texture atlas for terminator
  }

  draw(renderer) {
    super.draw(renderer)
  }

  update(dt) {
    /*
    if (this.alive) {
      if (this.walkLeft === true)
        if (this.pos.x <= this.startX) {
          // if reach start position
          this.walkLeft = false
          this.renderable.flipX(true)
        } else {
          this.body.force.x = -this.body.maxVel.x
        }
    }

    if (this.walkLeft === false) {
      if (this.pos.x >= this.endX) {
        // if reach the end position
        this.walkLeft = true
        this.renderable.flipX(false)
      } else {
        this.body.force.x = this.body.maxVel.x
      }
    }

    */

    // Pour le stand
    return super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0
  }

  /**
   * collision handle
   */
  onCollision(response, other) {
    // res.y >0 means touched by something on the bottom
    // which mean at top position for this one

    if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
      this.hurt = true
    }

    if (other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
      // spike or any other fixed danger

      // sens
      if (this.pos.x < other.pos.x) {
        this.body.vel.x = -300 * me.timer.tick
      } else {
        this.body.vel.x = 300 * me.timer.tick
      }
    }

    if (
      (this.alive && response.overlapV.y > 0 && response.a.body.falling) ||
      this.hurt
    ) {
      // make it dead
      this.alive = false
      //avoid further collision and delete it
      this.body.setCollisionMask(me.collision.types.NO_OBJECT)
      // make the body static
      // sens
      if (this.pos.x < other.pos.x) {
        this.body.vel.x = -700 * me.timer.tick
      } else {
        this.body.vel.x = 700 * me.timer.tick
      }
      // set dead animation

      var emitter = new me.ParticleEmitter(this.centerX, this.centerY, {
        width: this.width / 8,
        height: this.height / 8,
        totalParticles: 38,
        angle: Math.PI, // Angle vers l'arrière
        angleVariation: Math.PI / 8, // Variation de l'angle pour un petit écart
        maxLife: 5,
        speed: 0.2, // Vitesse réduite
        gravity: 0.3, // Augmente la gravité pour une trajectoire parabolique
        acceleration: { x: -200, y: 30 }, // Accélération vers le bas et légèrement vers l'arrière
        tint: '#ff0000',
      })

      // dead sfx

      me.audio.play('outch', false)

      me.timer.setTimeout(() => {
        me.audio.play('explosion', false)
        me.game.world.addChild(emitter, this.pos.z)
        me.game.world.removeChild(this)
        emitter.burstParticles()
      }, 500)

      // give some score
      game.data.score += 150
    }
    return false
  }
}
