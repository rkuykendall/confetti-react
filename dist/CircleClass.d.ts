import { Point } from './Point';
export interface Circle extends Point {
    radius: number;
}
export default class CircleClass implements Circle {
    constructor(init: Circle);
    x: number;
    y: number;
    radius: number;
}
