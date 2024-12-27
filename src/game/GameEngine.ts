import { CANVAS_WIDTH, CANVAS_HEIGHT, COLORS } from './constants';
import { Player } from './entities/Player';
import { Level } from './levels/Level';
import { level1 } from './levels/level1';
import { CircuitBackground } from './effects/CircuitBackground';
import { Scanlines } from './effects/Scanlines';
import { HUD } from './ui/HUD';
import { GameTitle } from './ui/GameTitle';
import { InputManager } from './input/InputManager';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private level: Level;
  private background: CircuitBackground;
  private scanlines: Scanlines;
  private hud: HUD;
  private gameTitle: GameTitle;
  private inputManager: InputManager;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) throw new Error(`Canvas with id ${canvasId} not found`);

    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D context');
    this.ctx = context;

    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    
    this.background = new CircuitBackground(this.ctx);
    this.scanlines = new Scanlines(this.ctx);
    this.hud = new HUD(this.ctx);
    this.gameTitle = new GameTitle(this.ctx);
    this.player = new Player(100, 100);
    this.level = new Level(level1);
    this.inputManager = new InputManager(this.canvas, this.player);
  }

  private update() {
    this.player.update(this.level.platforms);
    this.level.update();
    this.handleCollisions();
  }

  private handleCollisions() {
    // Handle power-up collection
    this.level.powerUps = this.level.powerUps.filter(powerUp => {
      if (this.player.checkCollision(powerUp)) {
        this.player.collectPowerUp(powerUp);
        return false;
      }
      return true;
    });

    // Handle enemy collisions
    this.level.enemies.forEach(enemy => {
      if (this.player.checkCollision(enemy)) {
        if (this.player.takeDamage()) {
          this.gameOver();
        }
      }
    });
  }

  private render() {
    this.background.draw();
    this.level.draw(this.ctx);
    this.player.draw(this.ctx);
    this.hud.drawHealth(this.player.getHealth());
    this.gameTitle.draw();
    this.scanlines.draw();
  }

  private gameOver() {
    console.log('Game Over');
  }

  public gameLoop = () => {
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop);
  }

  public start() {
    this.gameLoop();
  }
}