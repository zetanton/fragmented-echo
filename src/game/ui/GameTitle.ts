import { COLORS, GAME_TITLE, GAME_SUBTITLE } from '../constants';

export class GameTitle {
  private glitchOffset = { x: 0, y: 0 };
  private glitchTimer = 0;

  constructor(private ctx: CanvasRenderingContext2D) {}

  draw() {
    // Update glitch effect
    if (Math.random() < 0.05) {
      this.glitchOffset = {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4
      };
      this.glitchTimer = 3;
    }
    if (this.glitchTimer > 0) this.glitchTimer--;
    else this.glitchOffset = { x: 0, y: 0 };

    // Draw main title
    this.ctx.font = '32px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = COLORS.text;
    this.ctx.fillText(
      GAME_TITLE,
      this.ctx.canvas.width / 2 + this.glitchOffset.x,
      50 + this.glitchOffset.y
    );

    // Draw subtitle
    this.ctx.font = '16px monospace';
    this.ctx.fillStyle = COLORS.corruption;
    this.ctx.fillText(
      GAME_SUBTITLE,
      this.ctx.canvas.width / 2,
      80
    );
  }
}