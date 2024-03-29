This is a fork of [react-confetti](https://github.com/alampros/react-confetti) which was created when that library was unsupported and the latest release was completely broken. It is my understanding that the original library is once again actively maintained. This fork has cleaner builds, but is not as active.

For live examples and demo's of this code, you can reference the [react-confetti live documentation](https://alampros.github.io/react-confetti/).

# confetti-react

Confetti without the cleanup.

[![Build Status](https://travis-ci.org/rkuykendall/confetti-react.svg?branch=master)](https://travis-ci.org/rkuykendall/confetti-react)
[![npm](https://img.shields.io/npm/v/confetti-react.svg)](https://www.npmjs.com/package/confetti-react)
[![npm bundle size](https://img.shields.io/bundlephobia/min/confetti-react.svg)](https://bundlephobia.com/result?p=confetti-react)
![npm type definitions](https://img.shields.io/npm/types/confetti-react.svg)

Based on a pen by @Gthibaud: https://codepen.io/Gthibaud/pen/ENzXbp

[![demogif][2]][1]

[1]: http://rkuykendall.github.com/confetti-react
[2]: https://user-images.githubusercontent.com/796717/113315634-7d24f800-92db-11eb-9a01-4c83413a5756.png 'demo gif'

## Install

```sh
npm install confetti-react
```

## Use

`width` and `height` props are recommended. They will default to the initial window dimensions, but will not respond to
resize events. It is recommended to provide the dimensions yourself. Here is an example using
[a hook](https://github.com/streamich/react-use/blob/master/docs/useWindowSize.md):

```jsx
import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'confetti-react';

export default () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
};
```

## Props

| Property             | Type                                                                                                       | Default                                                                                                                                                                                                                                                                            | Description                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `width`              | `Number`                                                                                                   | `window.innerWidth \|\| 300`                                                                                                                                                                                                                                                       | Width of the `<canvas>` element.                                      |
| `height`             | `Number`                                                                                                   | `window.innerHeight \|\| 200`                                                                                                                                                                                                                                                      | Height of the `<canvas>` element.                                     |
| `numberOfPieces`     | `Number`                                                                                                   | 200                                                                                                                                                                                                                                                                                | Number of confetti pieces at one time.                                |
| `confettiSource`     | `{ x: Number, y: Number, w: Number, h: Number }`                                                           | `{x: 0, y: 0, w: canvas.width, h:0}`                                                                                                                                                                                                                                               | Rectangle where the confetti should spawn. Default is across the top. |
| `friction`           | `Number`                                                                                                   | 0.99                                                                                                                                                                                                                                                                               |                                                                       |
| `wind`               | `Number`                                                                                                   | 0                                                                                                                                                                                                                                                                                  |                                                                       |
| `gravity`            | `Number`                                                                                                   | 0.1                                                                                                                                                                                                                                                                                |                                                                       |
| `initialVelocityX`   | `Number`                                                                                                   | 4                                                                                                                                                                                                                                                                                  | How fast confetti is emitted horizontally                             |
| `initialVelocityY`   | `Number`                                                                                                   | 10                                                                                                                                                                                                                                                                                 | How fast confetti is emitted vertically                               |
| `colors`             | `String[]`                                                                                                 | `['#f44336'`</br>`'#e91e63'`</br>`'#9c27b0'`</br>`'#673ab7'`</br>`'#3f51b5'`</br>`'#2196f3'`</br>`'#03a9f4'`</br>`'#00bcd4'`</br>`'#009688'`</br>`'#4CAF50'`</br>`'#8BC34A'`</br>`'#CDDC39'`</br>`'#FFEB3B'`</br>`'#FFC107'`</br>`'#FF9800'`</br>`'#FF5722'`</br>`'#795548']`</br> | All available Colors for the confetti pieces.                         |
| `opacity`            | `Number`                                                                                                   | 1.0                                                                                                                                                                                                                                                                                |                                                                       |
| `recycle`            | `Bool`                                                                                                     | true                                                                                                                                                                                                                                                                               | Keep spawning confetti after `numberOfPieces` pieces have been shown. |
| `run`                | `Bool`                                                                                                     | true                                                                                                                                                                                                                                                                               | Run the animation loop                                                |
| `tweenDuration`      | `Number`                                                                                                   | 5000                                                                                                                                                                                                                                                                               | How fast the confetti is added                                        |
| `tweenFunction`      | `(currentTime: number, currentValue: number, targetValue: number, duration: number, s?: number) => number` | easeInOutQuad                                                                                                                                                                                                                                                                      | See [tween-functions](https://github.com/chenglou/tween-functions)    |
| `drawShape`          | `(context: CanvasRenderingContext2D) => void`                                                              | `undefined`                                                                                                                                                                                                                                                                        | See below                                                             |
| `onConfettiComplete` | `(confetti: Confetti) => void`                                                                             | `undefined`                                                                                                                                                                                                                                                                        | Called when all confetti has fallen off-canvas.                       |

# `drawShape()`

Draw a custom shape for a particle. If not provided, defaults to a random selection of a square, circle or strip
confetto. The function is called with the canvas context as a parameter and the [Particle](src/Particle.ts) as the
`this` context.

For example, to draw all spirals:

```jsx
<Confetti
  drawShape={ctx => {
    ctx.beginPath();
    for (let i = 0; i < 22; i++) {
      const angle = 0.35 * i;
      const x = (0.2 + 1.5 * angle) * Math.cos(angle);
      const y = (0.2 + 1.5 * angle) * Math.sin(angle);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.closePath();
  }}
/>
```
