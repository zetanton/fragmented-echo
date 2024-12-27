import { COLORS } from '../constants';

export class DirectionalGlow {
  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    facingRight: boolean
  ) {
    // Save context state
    ctx.save();
    
    // Create multiple layers of glow for a more intense effect
    const glowWidth = 4;
    const glowLayers = 3;
    
    for (let i = 0; i < glowLayers; i++) {
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 8 + i * 4;
      ctx.globalAlpha = 0.8 - (i * 0.2);

      if (facingRight) {
        // Right-facing glow
        ctx.fillStyle = 'white';
        ctx.fillRect(
          x + width - glowWidth + (i * 0.5),
          y,
          glowWidth - (i * 0.5),
          height
        );
      } else {
        // Left-facing glow
        ctx.fillStyle = 'white';
        ctx.fillRect(
          x - (i * 0.5),
          y,
          glowWidth - (i * 0.5),
          height
        );
      }
    }

    // Add a bright white border on the facing edge
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    
    if (facingRight) {
      ctx.fillRect(x + width - 2, y, 2, height);
    } else {
      ctx.fillRect(x, y, 2, height);
    }

    // Restore context state
    ctx.restore();
  }
}