import { COLORS } from '../constants';

interface Circuit {
  x: number;
  y: number;
  length: number;
  direction: 'horizontal' | 'vertical';
  pulseOffset: number;
}

export class CircuitBackground {
  private circuits: Circuit[] = [];
  private readonly numCircuits = 20;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.initializeCircuits();
  }

  private initializeCircuits() {
    for (let i = 0; i < this.numCircuits; i++) {
      this.circuits.push({
        x: Math.random() * this.ctx.canvas.width,
        y: Math.random() * this.ctx.canvas.height,
        length: 50 + Math.random() * 150,
        direction: Math.random() > 0.5 ? 'horizontal' : 'vertical',
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  draw() {
    // Draw dark circuit board background
    this.ctx.fillStyle = COLORS.background;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Draw circuit patterns
    this.circuits.forEach(circuit => {
      const pulse = Math.sin(Date.now() / 1000 + circuit.pulseOffset);
      const alpha = 0.3 + 0.2 * pulse;
      this.ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`;
      this.ctx.lineWidth = 2;

      this.ctx.beginPath();
      if (circuit.direction === 'horizontal') {
        this.ctx.moveTo(circuit.x, circuit.y);
        this.ctx.lineTo(circuit.x + circuit.length, circuit.y);
      } else {
        this.ctx.moveTo(circuit.x, circuit.y);
        this.ctx.lineTo(circuit.x, circuit.y + circuit.length);
      }
      this.ctx.stroke();

      // Draw connection nodes
      this.ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(circuit.x, circuit.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}