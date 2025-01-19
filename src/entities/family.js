import * as me from 'melonjs';
import { game } from '../game';
import UIContainer from './HUD';

const SIZES = {
  mother: { width: 32, height: 48 },
  brother: { width: 16, height: 32 },
};

const DIAL = {
  Mother: "Coucou Patate! Tu peux te deplacer avec les\nfleches et utiliser Ctrl pour interagir !",
  Jimmy: 'Jimmy: "tu ne sais meme pas sauter..."',
  Dylan: 'Dylan: "degages Patate!!\ntu ne sais pas rebondir..." ',
  Kevin: "Kevin",
};


const DIAL_END = {
  Mother: "Tu te sens mieux Patate ?",
  Jimmy: 'Jimmy: "Visiblement tu as pris une balle perdue !"',
  Dylan: 'Dylan: "Il est de retour le platiste ?!" ',
  Kevin: "Tu es reveille Patate? \nTu ne supporte pas bien les chocs.",
};
export class Family extends me.Entity {
  dialog = null;
  hud = null;
  isColliding = false; // Nouveau suivi d'état de collision
  userName = 'Mother';
  name = 'mother';

  constructor(x = 0, y = 0, { userName = 'Mother', type = 'mother' }) {
    super(x, y, SIZES[type]);

    this.userName = userName;
    this.name = type; // Pour les sprites

    // PHYSIQUE ==========================
    this.body.collisionType = me.collision.types.NPC_OBJECT;

    this.body.setMaxVelocity(3, 15);
    this.body.setFriction(0.7, 0);
    this.body.gravityScale = 0;

    // Ne pas mettre à jour en dehors de la vue
    this.alwaysUpdate = false;

    this.texture = new me.TextureAtlas(
      me.loader.getJSON(this.name),
      me.loader.getImage(this.name)
    );

    // RENDERING ==========================
    this.renderable = this.texture.createAnimationFromName();
    this.renderable.setCurrentAnimation('stand');
    this.renderable.flipX(true);

    this.anchorPoint.set(0, 0);
  }

  showDialog() {
    if (this.hud) {
      this.hideDialog();
    } else {


    }

    if (game.level === 4 && game.family.find(f => f === this.userName)) {

      game.playerMove = false
      game.stopMove = true
      this.hud = new UIContainer(DIAL_END[this.userName], this.userName);
      me.game.world.addChild(this.hud);

      me.timer.setTimeout(() => {

        game.stopMove = false

        game.playerMove = true
        this.hideDialog();

        game.family = game.family.filter(f => f !== this.userName);

      }, 2000);
    }
  }


  hideDialog() {
    if (this.dialog) {
      me.game.world.removeChild(this.dialog);
      this.dialog = null;
    }
    if (this.hud) {
      me.game.world.removeChild(this.hud);
      this.hud = null;
    }
  }

  onCollision(response, other) {
    if (other.body.collisionType === me.collision.types.PLAYER_OBJECT) {



      if (this.userName === "Mother" &&
        game.isKinematic && !this.stopMove) {
        this.stopMove = true;
        this.showDialog();

        game.isKinematic = false;
      }

      if (!this.dialog) {
        this.dialog = me.pool.pull('dialog', this.pos.x, this.pos.y - 35);
        me.game.world.addChild(this.dialog);
      }

      if (me.input.isKeyPressed('interact')) {
        this.showDialog();
      }

      if (game.level === 4) {
        this.showDialog();
        return false
      }
    }

    return false;
  }


  update(dt) {

    if (this.userName === "Mother") {
      // move to left 
      if (game.isKinematic && game.level === 1) {
        this.body.vel.x = this.stopMove === true ? 0 : -3;
      }
    }

    if (game.playerMove === true) {
      this.hideDialog();
    }

    return super.update(dt);
  }
}
