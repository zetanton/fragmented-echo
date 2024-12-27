import { COLORS, GRAVITY, JUMP_FORCE, PLAYER_SPEED } from '../constants';
import { Entity } from './Entity';
import { PowerUp, PowerUpType } from '../powerups/PowerUp';
import { GlitchEffect } from '../effects/GlitchEffect';
import { PlayerPixelEffect } from '../effects/PlayerPixelEffect';
import { Projectile } from './Projectile';
import { TeleportEffect } from '../effects/TeleportEffect';
import { PlayerMovement } from '../movement/PlayerMovement';
import { DirectionalGlow } from '../effects/DirectionalGlow';

export class Player extends Entity {
  private movement: PlayerMovement;
  private glowEffect: DirectionalGlow;
  private glitchEffect: GlitchEffect;
  private pixelEffect: PlayerPixelEffect;
  private teleportEffect: TeleportEffect | null = null;
  private projectiles: Projectile[] = [];
  private abilities: Set<PowerUpType> = new Set();
  private health: number = 3;
  private isInvulnerable: boolean = false;
  private attackCooldown: number = 0;
  private teleportCooldown: number = 0;
  facingRight: boolean = true;

  constructor(x: number, y: number) {
    super(x, y, 32, 32);
    this.movement = new PlayerMovement(this);
    this.glowEffect = new DirectionalGlow();
    this.glitchEffect = new GlitchEffect();
    this.pixelEffect = new PlayerPixelEffect(this.width, this.height);
  }

  // Movement delegation methods
  moveLeft() {
    this.movement.moveLeft();
  }

  moveRight() {
    this.movement.moveRight();
  }

  stop() {
    this.movement.stop();
  }

  jump() {
    this.movement.jump();
  }

  update(platforms: Entity[]) {
    this.movement.update(platforms);
    this.glitchEffect.update();
    this.pixelEffect.update();
    this.updateProjectiles();
    this.updateCooldowns();
    this.updateTeleportEffect();
    
    // Update facing direction based on velocity
    const velocityX = this.movement.getVelocityX();
    if (velocityX !== 0) {
      this.facingRight = velocityX > 0;
    }
  }

  private updateProjectiles() {
    this.projectiles = this.projectiles.filter(p => p.update());
  }

  private updateCooldowns() {
    if (this.attackCooldown > 0) this.attackCooldown--;
    if (this.teleportCooldown > 0) this.teleportCooldown--;
  }

  private updateTeleportEffect() {
    if (this.teleportEffect && !this.teleportEffect.update()) {
      this.teleportEffect = null;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.teleportEffect) {
      this.teleportEffect.draw(ctx);
    }

    this.projectiles.forEach(p => p.draw(ctx));

    const offset = this.glitchEffect.getOffset();
    const drawX = this.x + offset.x;
    const drawY = this.y + offset.y;

    // Draw directional glow first
    this.glowEffect.draw(ctx, drawX, drawY, this.width, this.height, this.facingRight);

    // Draw pixelated player on top
    this.pixelEffect.draw(
      ctx, 
      drawX, 
      drawY, 
      this.isInvulnerable ? COLORS.invulnerable : COLORS.player,
      this.facingRight
    );
  }

  shoot() {
    if (this.attackCooldown === 0) {
      const angle = this.facingRight ? 0 : Math.PI;
      this.projectiles.push(new Projectile(
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      ));
      this.attackCooldown = 20;
    }
  }

  teleport(targetX: number, targetY: number) {
    if (this.teleportCooldown === 0) {
      this.teleportEffect = new TeleportEffect(this.x, this.y, targetX, targetY);
      this.x = targetX;
      this.y = targetY;
      this.teleportCooldown = 60;
    }
  }

  getHealth(): number {
    return this.health;
  }

  collectPowerUp(powerUp: PowerUp) {
    this.abilities.add(powerUp.type);
  }

  hasAbility(type: PowerUpType): boolean {
    return this.abilities.has(type);
  }

  takeDamage() {
    if (!this.isInvulnerable) {
      this.health--;
      this.isInvulnerable = true;
      setTimeout(() => this.isInvulnerable = false, 1000);
    }
    return this.health <= 0;
  }
}