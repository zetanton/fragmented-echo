import { PowerUpType } from '../powerups/PowerUp';

export const level1 = {
  platforms: [
    { x: 0, y: 500, width: 800, height: 40 },
    { x: 300, y: 400, width: 200, height: 20 },
    { x: 100, y: 300, width: 200, height: 20 },
    { x: 500, y: 250, width: 200, height: 20 },
  ],
  enemies: [
    { x: 300, y: 368, patrolDistance: 150 },
    { x: 500, y: 218, patrolDistance: 180 },
  ],
  powerUps: [
    { x: 150, y: 260, type: PowerUpType.DOUBLE_JUMP },
    { x: 550, y: 210, type: PowerUpType.DASH },
  ]
};