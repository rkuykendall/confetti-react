export interface Point {
  x: number;
  y: number;
}

export default class PointClass implements Point {
  constructor(init: PointClass) {
    this.x = init.x;
    this.y = init.y;
  }

  x: number;

  y: number;
}
