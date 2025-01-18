import * as me from 'melonjs';
import { game } from '../game';
import UIContainer from './HUD';

const SIZES = {
  mother: { width: 32, height: 48 },
  brother: { width: 16, height: 32 },
};

const DIAL = {
  Mother: "Un essai de dialogue vraiment beaucoup plus long\n pour voir et si c'est pas trop long",
  Jimmy: "Je suis Jimmy",
  Dylan: "Je suis Dylan",
  Kevin: "Je suis Kevin",
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

  /**
   * Affiche le HUD (texte)
   */
  showDialog() {
    if (this.hud) return; // Ne pas recréer si déjà visible
    this.hud = new UIContainer(DIAL[this.userName], this.userName);
    me.game.world.addChild(this.hud);
  }

  /**
   * Cache le HUD et le dialogue
   */
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

  /**
   * Gère les collisions
   */
  onCollision(response, other) {
    if (other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
      // Détecter si c'est une nouvelle collision


        // Afficher l'icône de dialogue si elle n'existe pas encore
        if (!this.dialog) {
          this.dialog = me.pool.pull('dialog', this.pos.x, this.pos.y - 35);
          me.game.world.addChild(this.dialog);
        }
      }

      // Si le joueur appuie sur la touche "interact", afficher le HUD
      if (me.input.isKeyPressed('interact')) {
        this.showDialog();
      }
  
    return false;
  }

  /**
   * Mise à jour de l'état
   */
  update(dt) {

    if (game.playerMove === true) {
      this.hideDialog();
    }

    return super.update(dt);
  }
}
