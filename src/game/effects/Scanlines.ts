export class Scanlines {
  private offset: number = 0;

  constructor(private ctx: CanvasRenderingContext2D) {}

  draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i < this.ctx.canvas.height; i += 2) {
      this.ctx.fillRect(0, i + this.offset, this.ctx.canvas.width, 1);
    }
    this.offset = (this.offset + 0.5) % 2;
  }
}