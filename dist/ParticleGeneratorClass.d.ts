import { ConfettiOptions } from './Confetti';
import { Rect } from './Rect';
import Particle from './Particle';
export interface ParticleGenerator extends Rect {
    removeParticleAt: (index: number) => void;
    getParticle: () => void;
    animate: () => boolean;
    particles: Particle[];
    particlesGenerated: number;
}
export default class ParticleGeneratorClass implements ParticleGenerator {
    constructor(canvas: HTMLCanvasElement, getOptions: () => ConfettiOptions);
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    getOptions: () => ConfettiOptions;
    x: number;
    y: number;
    w: number;
    h: number;
    lastNumberOfPieces: number;
    tweenInitTime: number;
    particles: Particle[];
    particlesGenerated: number;
    removeParticleAt: (i: number) => void;
    getParticle: () => Particle;
    animate: () => boolean;
}
