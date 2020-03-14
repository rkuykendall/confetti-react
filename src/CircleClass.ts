import { Point } from './Point';

export interface Circle extends Point {
  radius: number;
}

export default class CircleClass implements Circle {
  constructor(init: Circle) {
    this.x = init.x;
    this.y = init.y;
    this.radius = init.radius;
  }

  x: number;

  y: number;

  radius: number;
}
