import * as me from 'melonjs'
import { game } from '../game'
import UIContainer from './HUD'

export class Player extends me.Entity {
  constructor(x = 0, y = 0) {
    super(x, y, { width: 16, height: 16 })

    this.projectDialCount = 0
    this.facingRight = true

    this.invincible = false
    this.body.collisionType = me.collision.types.PLAYER_OBJECT

    this.alwaysUpdate = true
    this.body.setMaxVelocity(3, 15)
    this.body.setFriction(.9, 0)

    this.body.gravityScale = 1.2

    this.dying = false

    me.game.viewport.setDeadzone(16, 100)


    me.game.viewport.follow(this, me.game.viewport.AXIS.HORIZONTAL, 0.7)

    // create a new sprite with all animations from the paladin atlas
    this.renderable = game.texture.createAnimationFromName()
    this.anchorPoint.set(0.5, 0.5)
  }

  /**
   ** update the force applied
   */
  update(dt) {

    if (game.level === 4) {
      this.body.vel.x = game.stopMove === true ? 0 : -3;
    }

    if (
      this.body.falling &&
      !this.renderable.isCurrentAnimation('fall') &&
      this.body.vel.y >= 15 && game.level === 2
    ) {


      this.renderable.setCurrentAnimation('fall')
    }


    if (!game.isKinematic) {

      if (me.input.isKeyPressed('left')) {
        game.playerMove = true
        if (this.body.vel.y === 0) {
          //@ts-ignore
          this.renderable.setCurrentAnimation('walk')
        }
        this.body.force.x = -this.body.maxVel.x
        this.renderable.flipX(true)
        this.facingRight = false
      } else if (me.input.isKeyPressed('right')) {
        game.playerMove = true
        if (this.body.vel.y === 0) {
          //@ts-ignore
          this.renderable.setCurrentAnimation('walk')
        }
        this.facingRight = true
        this.body.force.x = this.body.maxVel.x
        this.renderable.flipX(false)
      }

      if (me.input.isKeyPressed('jump')) {
        game.playerMove = true

        if (this.body.jumping || this.body.falling || game.level !== 2) return

        this.renderable.setCurrentAnimation('crush')

        this.body.jumping = true
        // // LE SON
        // me.audio.stop('jump')
        // me.audio.play('jump', false)
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

      if (
        !me.input.isKeyPressed('left') &&
        !me.input.isKeyPressed('right') &&
        !me.input.isKeyPressed('jump') &&
        !me.input.isKeyPressed('down')
      ) {
        game.playerMove = false
      }

      if (!me.input.isKeyPressed('left') && !me.input.isKeyPressed('right')) {
        this.body.force.x = 0 // Réinitialiser les forces horizontales
      }
    } else {

      if (
        this.body.force.x === 0 &&
        this.body.force.y === 0 &&
        !this.isNotStand
      ) {
        if (!this.renderable.isCurrentAnimation('stand')) {
          this.renderable.setCurrentAnimation('stand')
        }
      }
    }

    if (game.level === 2) {
      me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.5)
    }
    return super.update(dt) || this.body.vel?.x !== 0 || this.body.vel?.y !== 0
    // Pour le stand
  }

  draw(renderer) {
    super.draw(renderer)
  }

  onCollision(response, other) {


    switch (other.body.collisionType) {
      case me.collision.types.WORLD_SHAPE:
        if (other.type === 'exit') {
          me.game.viewport.fadeIn('#000', 150, function () {
            try {
              game.level = 3
              me.state.change(me.state.USER + 2)
            } catch (e) {
              console.error('Erreur lors du chargement du niveau :', e)
            }
          })
        }
        if (this.body.jumping) {
          me.audio.stop('jump')
          me.audio.play('jump', false)
        }

        if (other.type === 'spike') {
          const spawnX = 50,
            spawnY = 0
          me.game.viewport.fadeIn('#000', 150, () => {
            me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.5)
            me.audio.stop('spike')
            me.audio.play('spike', false)

            me.game.viewport.fadeOut('#000', 150)
            this.pos.set(spawnX, spawnY, this.pos.z)
          })
        }

        if (game.level === 2) {
          if (this.body.falling && response.overlapV.y > 0.5) {
            this.isNotStand = true
            // Calculer la force du rebond en fonction de la vitesse de chute
            const reboundForce = Math.min(
              Math.abs(this.body.vel.y) * 1.5,
              this.body.maxVel.y * 2
            ) // Limiter la force max

            this.renderable.setCurrentAnimation('crush', (ctx) => {
              // Appliquer la force du rebond
              this.isNotStand = false // Rebond proportionnel à la chute
              this.body.vel.y = -reboundForce
              me.audio.stop('jump')
              me.audio.play('jump', false)
            })
            return true
          }
        }
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
            this.body.vel.x = 0
            response.overlapV.x = 0
            // Respond to the platform (it is solid)
            return true
          }

          // Do not respond to the platform (pass through)
          return false
        }


        // Custom collision response for slopes
        else if (other.type === 'slope') {

          if (game.level === 4) {
            console.log('collision slope ===>')


            this.body.jumping = true
            this.body.vel.y = -14

            this.hud = new UIContainer("Mais qu'il est bete...\nIl ne pourra jamais remonter", "Patate");
            me.game.world.addChild(this.hud);



            me.timer.setTimeout(() => {
              this.alpha = 0
              this.visible = false
              this.pos.set(-1000, -1000, this.pos.z);

            }, 500)
            me.timer.setTimeout(() => {
              me.state.change(me.state.PLAY);
            }, 3000)

          }

          // Always adjust the collision response upward
          response.overlapV.y = Math.abs(response.overlap)
          response.overlapV.x = 0
          this.body.vel.x = 0
          // Respond to the slope (it is solid)
          return true
        }
        break

      case me.collision.types.NPC_OBJECT:

        if (other.userName === 'Kevin' && game.level !== 4) {
          me.game.viewport.fadeIn(
            '#000',
            150,
            function () {
              console.log('Changement de niveau')
              return me.state.change(me.state.USER + 3)
            },
            500
          )
        }

        return false

      default:
        // Do not respond to other objects (e.g. coins)
        return false
    }

    // Make the object solid
    return true
  }
}
