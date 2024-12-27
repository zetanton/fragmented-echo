import { Entity } from '../entities/Entity';
import { Enemy } from '../entities/Enemy';
import { PowerUp, PowerUpType } from '../powerups/PowerUp';
import { COLORS } from '../constants';

export class Level {
  platforms: Entity[] = [];
  enemies: Enemy[] = [];
  powerUps: PowerUp[] = [];
  
  constructor(levelData: LevelData) {
    this.loadLevel(levelData);
  }

  update() {
    // Update enemies
    this.enemies.forEach(enemy => enemy.update());
    
    // Update power-ups
    this.powerUps.forEach(powerUp => powerUp.update());
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw platforms
    this.platforms.forEach(platform => {
      ctx.fillStyle = COLORS.platform;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw enemies
    this.enemies.forEach(enemy => enemy.draw(ctx));

    // Draw power-ups
    this.powerUps.forEach(powerUp => powerUp.draw(ctx));
  }

  private loadLevel(data: LevelData) {
    // Load platforms
    data.platforms.forEach(platform => {
      this.platforms.push(new Entity(
        platform.x,
        platform.y,
        platform.width,
        platform.height
      ));
    });

    // Load enemies
    data.enemies.forEach(enemy => {
      this.enemies.push(new Enemy(enemy.x, enemy.y, enemy.patrolDistance));
    });

    // Load power-ups
    data.powerUps.forEach(powerUp => {
      this.powerUps.push(new PowerUp(powerUp.x, powerUp.y, powerUp.type));
    });
  }
}

interface LevelData {
  platforms: { x: number; y: number; width: number; height: number; }[];
  enemies: { x: number; y: number; patrolDistance: number; }[];
  powerUps: { x: number; y: number; type: PowerUpType; }[];
}