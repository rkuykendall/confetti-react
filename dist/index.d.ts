import React, { CanvasHTMLAttributes } from 'react';
import { ConfettiOptions } from './Confetti';
export declare type Props = Partial<ConfettiOptions> & CanvasHTMLAttributes<HTMLCanvasElement> & {
    canvasRef?: React.Ref<HTMLCanvasElement>;
};
export declare const Index: React.ForwardRefExoticComponent<Partial<ConfettiOptions> & React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    canvasRef?: React.Ref<HTMLCanvasElement>;
} & React.RefAttributes<HTMLCanvasElement>>;
export default Index;
