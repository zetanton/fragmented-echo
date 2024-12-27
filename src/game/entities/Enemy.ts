import { COLORS } from '../constants';
import { Entity } from './Entity';

export class Enemy extends Entity {
  private patrolDistance: number;
  private startX: number;
  private direction: number = 1;
  private health: number = 2;

  constructor(x: number, y: number, patrolDistance: number = 100) {
    super(x, y, 32, 32);
    this.startX = x;
    this.patrolDistance = patrolDistance;
    this.velocityX = 2;
  }

  update() {
    // Patrol movement
    this.x += this.velocityX * this.direction;
    
    if (Math.abs(this.x - this.startX) > this.patrolDistance) {
      this.direction *= -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = COLORS.enemy;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw "antennae" for bug-like appearance
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x + this.width / 2 - 10, this.y - 10);
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x + this.width / 2 + 10, this.y - 10);
    ctx.strokeStyle = COLORS.enemy;
    ctx.stroke();
  }

  takeDamage() {
    this.health--;
    return this.health <= 0;
  }
}