import { Entity } from './Entity';
import { COLORS } from '../constants';

export class Projectile extends Entity {
  private readonly speed = 8;
  private readonly lifetime = 60; // frames
  private age = 0;

  constructor(x: number, y: number, private direction: number) {
    super(x, y, 8, 8);
    this.velocityX = Math.cos(direction) * this.speed;
    this.velocityY = Math.sin(direction) * this.speed;
  }

  update(): boolean {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.age++;
    return this.age < this.lifetime;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const glitchOffset = Math.random() * 2;
    
    // Main projectile
    ctx.fillStyle = COLORS.player;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Glitch effect
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(this.x + glitchOffset, this.y, this.width, this.height);
    ctx.fillStyle = 'rgba(255, 0, 255, 0.5)';
    ctx.fillRect(this.x - glitchOffset, this.y, this.width, this.height);
  }
}