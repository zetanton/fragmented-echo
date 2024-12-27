import { GRAVITY, JUMP_FORCE, PLAYER_SPEED } from '../constants';
import { Entity } from '../entities/Entity';

export class PlayerMovement {
  private velocityX: number = 0;
  private velocityY: number = 0;
  private isJumping: boolean = false;
  private maxSpeed: number = PLAYER_SPEED;

  constructor(private entity: Entity) {}

  update(platforms: Entity[]) {
    // Apply gravity
    this.velocityY += GRAVITY;
    
    // Update position
    this.entity.x += this.velocityX;
    this.entity.y += this.velocityY;

    // Platform collision
    this.handlePlatformCollisions(platforms);
  }

  private handlePlatformCollisions(platforms: Entity[]) {
    for (const platform of platforms) {
      if (this.entity.checkCollision(platform)) {
        if (this.velocityY > 0) {
          this.entity.y = platform.y - this.entity.height;
          this.velocityY = 0;
          this.isJumping = false;
        }
      }
    }
  }

  getVelocityX(): number {
    return this.velocityX;
  }

  moveLeft() {
    this.velocityX = -this.maxSpeed;
  }

  moveRight() {
    this.velocityX = this.maxSpeed;
  }

  stop() {
    this.velocityX = 0;
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = JUMP_FORCE;
      this.isJumping = true;
    }
  }
}