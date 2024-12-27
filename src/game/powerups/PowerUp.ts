import { COLORS } from '../constants';
import { Entity } from '../entities/Entity';

export enum PowerUpType {
  DOUBLE_JUMP = 'DOUBLE_JUMP',
  DASH = 'DASH',
  WALL_JUMP = 'WALL_JUMP'
}

export class PowerUp extends Entity {
  type: PowerUpType;
  private animationOffset: number = 0;

  constructor(x: number, y: number, type: PowerUpType) {
    super(x, y, 24, 24);
    this.type = type;
  }

  update() {
    // Floating animation
    this.animationOffset = Math.sin(Date.now() / 200) * 5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const y = this.y + this.animationOffset;
    
    ctx.fillStyle = COLORS.powerup;
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, y + this.height / 2, this.width / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw power-up symbol
    ctx.fillStyle = COLORS.background;
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const symbol = this.getSymbol();
    ctx.fillText(symbol, this.x + this.width / 2, y + this.height / 2);
  }

  private getSymbol(): string {
    switch (this.type) {
      case PowerUpType.DOUBLE_JUMP: return '↑↑';
      case PowerUpType.DASH: return '→→';
      case PowerUpType.WALL_JUMP: return '↗';
      default: return '?';
    }
  }
}