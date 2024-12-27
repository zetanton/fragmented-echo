interface Pixel {
  x: number;
  y: number;
  size: number;
  offsetX: number;
  offsetY: number;
}

export class PlayerPixelEffect {
  private pixels: Pixel[] = [];
  private readonly pixelSize = 4;

  constructor(width: number, height: number) {
    for (let x = 0; x < width; x += this.pixelSize) {
      for (let y = 0; y < height; y += this.pixelSize) {
        this.pixels.push({
          x: x,
          y: y,
          size: this.pixelSize,
          offsetX: 0,
          offsetY: 0
        });
      }
    }
  }

  update() {
    this.pixels.forEach(pixel => {
      if (Math.random() < 0.02) {
        pixel.offsetX = (Math.random() - 0.5) * 2;
        pixel.offsetY = (Math.random() - 0.5) * 2;
      } else {
        pixel.offsetX *= 0.9;
        pixel.offsetY *= 0.9;
      }
    });
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    facingRight: boolean
  ) {
    this.pixels.forEach(pixel => {
      const pixelX = facingRight ? 
        x + pixel.x + pixel.offsetX :
        x + (32 - pixel.x - pixel.size) + pixel.offsetX;
        
      ctx.fillStyle = color;
      ctx.fillRect(
        pixelX,
        y + pixel.y + pixel.offsetY,
        pixel.size,
        pixel.size
      );
    });
  }
}