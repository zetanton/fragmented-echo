export class TeleportEffect {
  private particles: Array<{ x: number; y: number; age: number }> = [];
  private readonly maxAge = 20;

  constructor(private startX: number, private startY: number, 
              private endX: number, private endY: number) {
    this.initializeParticles();
  }

  private initializeParticles() {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: this.startX + Math.random() * 32,
        y: this.startY + Math.random() * 32,
        age: Math.random() * this.maxAge
      });
    }
  }

  update(): boolean {
    this.particles.forEach(p => p.age++);
    return this.particles.some(p => p.age < this.maxAge);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(p => {
      const progress = p.age / this.maxAge;
      const x = p.x + (this.endX - this.startX) * progress;
      const y = p.y + (this.endY - this.startY) * progress;
      const alpha = 1 - progress;

      ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, 2, 2);
    });
  }
}