import * as me from 'melonjs'
import { game } from '../game'
import { LASER_SIZE } from './poop'

export class Player extends me.Entity {
  /**
   * constructor
   */

  constructor(x = 0, y = 0) {
    // call the super constructor
    super(x, y, { width: 32, height: 32 })

    this.projectDialCount = 0
    this.facingRight = true

    this.invincible = false
    this.body.collisionType = me.collision.types.PLAYER_OBJECT

    this.alwaysUpdate = true
    this.body.setMaxVelocity(3, 15)
    this.body.setFriction(0.7, 0)

    this.dying = false

    this.multipleJump = 1

    me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.1)

    // enable keyboard
    me.input.bindKey(me.input.KEY.LEFT, 'left')
    me.input.bindKey(me.input.KEY.RIGHT, 'right')
    me.input.bindKey(me.input.KEY.X, 'jump', true)
    me.input.bindKey(me.input.KEY.UP, 'jump', true)
    me.input.bindKey(me.input.KEY.SPACE, 'jump', true)
    me.input.bindKey(me.input.KEY.DOWN, 'down')

    me.input.bindKey(me.input.KEY.E, 'shoot', true)

    me.input.bindKey(me.input.KEY.A, 'left')
    me.input.bindKey(me.input.KEY.D, 'right')
    me.input.bindKey(me.input.KEY.W, 'jump', true)
    me.input.bindKey(me.input.KEY.S, 'down')

    // create a new sprite with all animations from the paladin atlas
    this.renderable = game.texture.createAnimationFromName()

    this.anchorPoint.set(0.5, 0.5) // ancre en haut/milieu
    // this.renderable.setCurrentAnimation('stand')
  }

  /**
   ** update the force applied
   */
  update(dt) {
    if (me.input.isKeyPressed('shoot')) {
      this.projectDialCount++

      if (this.projectDialCount > 10) {
        me.audio.stop('projet')
        me.audio.play('projet', false)
        this.projectDialCount = 0
      }

      this.isNotStand = true
      const laserX = this.facingRight
        ? this.getBounds().right
        : this.getBounds().left - LASER_SIZE.WIDTH
      const laserY = this.pos.y + this.height / 2 - LASER_SIZE.HEIGHT / 2
      this.renderable.setCurrentAnimation('launch', (ctx) => {
        me.game.world.addChild(
          me.pool.pull('poop', laserX, laserY, this.facingRight)
        )
        console.log('launching poop', ctx)
        this.isNotStand = false
      })
    }

    if (me.input.isKeyPressed('left')) {
      if (this.body.vel.y === 0) {
        //@ts-ignore
        this.renderable.setCurrentAnimation('walk')
      }
      this.body.force.x = -this.body.maxVel.x
      this.renderable.flipX(true)
      this.facingRight = false
    } else if (me.input.isKeyPressed('right')) {
      if (this.body.vel.y === 0) {
        //@ts-ignore
        this.renderable.setCurrentAnimation('walk')
      }
      this.facingRight = true
      this.body.force.x = this.body.maxVel.x
      this.renderable.flipX(false)
    }

    if (me.input.isKeyPressed('jump')) {
      if (this.body.jumping || this.body.falling) return
      //@ts-ignore
      this.renderable.setCurrentAnimation('jump')

      this.body.jumping = true

      if (this.multipleJump <= 2) {
        // easy "math" for double jump
        this.body.force.y = -this.body.maxVel.y

        // LE SON
        me.audio.stop('jump')
        me.audio.play('jump', false)
      }
    } else {
      if (!this.body.falling && !this.body.jumping) {
        // reset the multipleJump flag if on the ground
        this.multipleJump = 1
      } else if (this.body.falling && this.multipleJump < 2) {
        // reset the multipleJump flag if falling
        this.multipleJump = 1
      }
    }

    if (
      this.body.force.x === 0 &&
      this.body.force.y === 0 &&
      !this.isNotStand
    ) {
      if (!this.renderable.isCurrentAnimation('stand')) {
        this.renderable.setCurrentAnimation('stand')
      }
    }

    // check if we fell into a hole
    if (!this.inViewport && this.getBounds().top > me.video.renderer.height) {
      // if yes reset the game
      me.game.world.removeChild(this)
      me.game.viewport.fadeIn('#fff', 150, function () {
        //  me.audio.play("die", false);
        me.level.reload()
        me.game.viewport.fadeOut('#fff', 150)
      })
      return true
    }

    // Pour le stand
    return super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0
  }

  draw(renderer) {
    super.draw(renderer)
  }

  hurt() {
    if (this.invincible) return
    this.invincible = true
    me.audio.stop('hurt')
    me.audio.play('hurt', false)
    this.renderable.setCurrentAnimation('hurt', (ctx) => {})
    me.timer.setTimeout(() => {
      this.invincible = false
    }, 1000)
  }
  /**
   * colision handler
   */
  onCollision(response, other) {
    switch (other.body.collisionType) {
      case me.collision.types.WORLD_SHAPE:
        // Simulate a platform object
        if (other.type === 'platform') {
          if (
            this.body.falling &&
            !me.input.isKeyPressed('down') &&
            // Shortest overlap would move the player upward
            response.overlapV.y > 0 &&
            // The velocity is reasonably fast enough to have penetrated to the overlap depth
            ~~this.body.vel.y >= ~~response.overlapV.y
          ) {
            // Disable collision on the x axis
            response.overlapV.x = 0
            // Respond to the platform (it is solid)
            return true
          }
          // Do not respond to the platform (pass through)
          return false
        }

        // Custom collision response for slopes
        else if (other.type === 'slope') {
          // Always adjust the collision response upward
          response.overlapV.y = Math.abs(response.overlap)
          response.overlapV.x = 0

          // Respond to the slope (it is solid)
          return true
        }
        break

      case me.collision.types.ENEMY_OBJECT:
        if (!other.isMovingEnemy) {
          // sens
          if (this.pos.x < other.pos.x) {
            this.body.vel.x = -175 * me.timer.tick
          } else {
            this.body.vel.x = 175 * me.timer.tick
          }

          this.hurt()
        } else {
          // a regular moving enemy entity
          if (response.overlapV.y > 0 && this.body.falling) {
            // jump
            //  this.body.vel.y -= this.body.maxVel.y * 1.5 * me.timer.tick
          } else {
            this.hurt()
          }
          // Not solid
          return false
        }
        break

      default:
        // Do not respond to other objects (e.g. coins)
        return false
    }

    // Make the object solid
    return true
  }
}
