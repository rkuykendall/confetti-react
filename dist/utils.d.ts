import { Point } from './Point';
import { Rect } from './Rect';
import { Circle } from './CircleClass';
export declare function norm(value: number, min: number, max: number): number;
export declare function lerp(lnorm: number, min: number, max: number): number;
export declare function map(value: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number): number;
export declare function clamp(value: number, min: number, max: number): number;
export declare function distance(p0: Point, p1: Point): number;
export declare function distanceXY(x0: number, y0: number, x1: number, y1: number): number;
export declare function circleCollision(c0: Circle, c1: Circle): boolean;
export declare function circlePointCollision(x: number, y: number, circle: Circle): boolean;
export declare function inRange(value: number, min: number, max: number): boolean;
export declare function pointInRect(p: Point, rect: Rect): boolean;
export declare function rangeIntersect(min0: number, max0: number, min1: number, max1: number): boolean;
export declare function rectIntersect(r0: Rect, r1: Rect): boolean;
export declare function degreesToRads(degrees: number): number;
export declare function radsToDegrees(radians: number): number;
export declare function randomRange(min: number, max: number): number;
export declare function randomInt(min: number, max: number): number;
