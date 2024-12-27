export class GlitchEffect {
  private glitchInterval: number = 0;
  private glitchOffset: { x: number; y: number } = { x: 0, y: 0 };
  private isGlitching: boolean = false;

  update() {
    if (Math.random() < 0.02) { // 2% chance to trigger glitch
      this.startGlitch();
    }

    if (this.isGlitching) {
      this.glitchInterval--;
      if (this.glitchInterval <= 0) {
        this.stopGlitch();
      }
    }
  }

  private startGlitch() {
    this.isGlitching = true;
    this.glitchInterval = 5;
    this.glitchOffset = {
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4
    };
  }

  private stopGlitch() {
    this.isGlitching = false;
    this.glitchOffset = { x: 0, y: 0 };
  }

  getOffset() {
    return this.glitchOffset;
  }

  isActive() {
    return this.isGlitching;
  }
}