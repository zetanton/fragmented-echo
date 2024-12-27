export class InputManager {
  private keys: Set<string> = new Set();

  constructor(private canvas: HTMLCanvasElement, private player: any) {
    this.setupKeyboardControls();
    this.setupMouseTracking();
  }

  private setupKeyboardControls() {
    const preventScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', (e) => {
      preventScroll(e);
      this.handleKeyDown(e.key);
    });

    window.addEventListener('keyup', (e) => {
      preventScroll(e);
      this.handleKeyUp(e.key);
    });
  }

  private setupMouseTracking() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      // Store mouse position for teleport targeting
    });
  }

  private handleKeyDown(key: string) {
    switch (key.toLowerCase()) {
      case 'arrowleft':
      case 'a':
        this.player.moveLeft();
        break;
      case 'arrowright':
      case 'd':
        this.player.moveRight();
        break;
      case ' ':
      case 'arrowup':
      case 'w':
        this.player.jump();
        break;
      case 'x':
        this.player.shoot();
        break;
      case 't':
        // Handle teleport
        break;
    }
  }

  private handleKeyUp(key: string) {
    switch (key.toLowerCase()) {
      case 'arrowleft':
      case 'a':
      case 'arrowright':
      case 'd':
        this.player.stop();
        break;
    }
  }
}