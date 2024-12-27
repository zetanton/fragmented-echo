import { COLORS } from '../constants';

export class HUD {
  constructor(private ctx: CanvasRenderingContext2D) {}

  drawHealth(health: number) {
    const padding = 10;
    const chipWidth = 50;
    const chipHeight = 24;
    
    // Draw chip background
    this.ctx.fillStyle = COLORS.platform;
    this.ctx.fillRect(padding, padding, chipWidth, chipHeight);
    
    // Draw chip details
    this.ctx.strokeStyle = COLORS.text;
    this.ctx.lineWidth = 1;
    
    // Draw circuit lines
    this.ctx.beginPath();
    this.ctx.moveTo(padding + 10, padding);
    this.ctx.lineTo(padding + 10, padding + chipHeight);
    this.ctx.moveTo(padding + 20, padding);
    this.ctx.lineTo(padding + 20, padding + chipHeight);
    this.ctx.stroke();
    
    // Draw health value
    this.ctx.fillStyle = COLORS.text;
    this.ctx.font = '16px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      `${health}`,
      padding + chipWidth / 2,
      padding + chipHeight / 2
    );
  }
}