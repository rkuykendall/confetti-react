'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var tweens = _interopDefault(require('tween-functions'));

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function degreesToRads(degrees) {
  return degrees * Math.PI / 180;
}
function randomRange(min, max) {
  return min + Math.random() * (max - min);
}
function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

var ParticleShape;

(function (ParticleShape) {
  ParticleShape[ParticleShape["Circle"] = 0] = "Circle";
  ParticleShape[ParticleShape["Square"] = 1] = "Square";
  ParticleShape[ParticleShape["Strip"] = 2] = "Strip";
})(ParticleShape || (ParticleShape = {}));

var RotationDirection;

(function (RotationDirection) {
  RotationDirection[RotationDirection["Positive"] = 1] = "Positive";
  RotationDirection[RotationDirection["Negative"] = -1] = "Negative";
})(RotationDirection || (RotationDirection = {}));

var Particle = /*#__PURE__*/function () {
  function Particle(context, getOptions, x, y) {
    this.getOptions = getOptions;

    var _this$getOptions = this.getOptions(),
        colors = _this$getOptions.colors,
        initialVelocityX = _this$getOptions.initialVelocityX,
        initialVelocityY = _this$getOptions.initialVelocityY;

    this.context = context;
    this.x = x;
    this.y = y;
    this.w = randomRange(5, 20);
    this.h = randomRange(5, 20);
    this.radius = randomRange(5, 10);
    this.vx = randomRange(-initialVelocityX, initialVelocityX);
    this.vy = randomRange(-initialVelocityY, 0);
    this.shape = randomInt(0, 2);
    this.angle = degreesToRads(randomRange(0, 360));
    this.angularSpin = randomRange(-0.2, 0.2);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.rotateY = randomRange(0, 1);
    this.rotationDirection = randomRange(0, 1) ? RotationDirection.Positive : RotationDirection.Negative;
  }

  var _proto = Particle.prototype;

  _proto.update = function update() {
    var _this$getOptions2 = this.getOptions(),
        gravity = _this$getOptions2.gravity,
        wind = _this$getOptions2.wind,
        friction = _this$getOptions2.friction,
        opacity = _this$getOptions2.opacity,
        drawShape = _this$getOptions2.drawShape;

    this.x += this.vx;
    this.y += this.vy;
    this.vy += gravity;
    this.vx += wind;
    this.vx *= friction;
    this.vy *= friction;

    if (this.rotateY >= 1 && this.rotationDirection === RotationDirection.Positive) {
      this.rotationDirection = RotationDirection.Negative;
    } else if (this.rotateY <= -1 && this.rotationDirection === RotationDirection.Negative) {
      this.rotationDirection = RotationDirection.Positive;
    }

    var rotateDelta = 0.1 * this.rotationDirection;
    this.rotateY += rotateDelta;
    this.angle += this.angularSpin;
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.angle);
    this.context.scale(1, this.rotateY);
    this.context.rotate(this.angle);
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.globalAlpha = opacity;
    this.context.lineCap = 'round';
    this.context.lineWidth = 2;

    if (drawShape && typeof drawShape === 'function') {
      drawShape.call(this, this.context);
    } else {
      switch (this.shape) {
        case ParticleShape.Circle:
          {
            this.context.beginPath();
            this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
            this.context.fill();
            break;
          }

        case ParticleShape.Square:
          {
            this.context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            break;
          }

        case ParticleShape.Strip:
          {
            this.context.fillRect(-this.w / 6, -this.h / 2, this.w / 3, this.h);
            break;
          }

        default:
          {
            throw new Error('Unknown type in Particle.ts');
          }
      }
    }

    this.context.closePath();
    this.context.restore();
  };

  return Particle;
}();

var ParticleGeneratorClass = function ParticleGeneratorClass(canvas, getOptions) {
  var _this = this;

  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;
  this.lastNumberOfPieces = 0;
  this.tweenInitTime = Date.now();
  this.particles = [];
  this.particlesGenerated = 0;

  this.removeParticleAt = function (i) {
    _this.particles.splice(i, 1);
  };

  this.getParticle = function () {
    var newParticleX = randomRange(_this.x, _this.w + _this.x);
    var newParticleY = randomRange(_this.y, _this.h + _this.y);
    return new Particle(_this.context, _this.getOptions, newParticleX, newParticleY);
  };

  this.animate = function () {
    var canvas = _this.canvas,
        context = _this.context,
        particlesGenerated = _this.particlesGenerated,
        lastNumberOfPieces = _this.lastNumberOfPieces;

    var _this$getOptions = _this.getOptions(),
        run = _this$getOptions.run,
        recycle = _this$getOptions.recycle,
        numberOfPieces = _this$getOptions.numberOfPieces,
        debug = _this$getOptions.debug,
        tweenFunction = _this$getOptions.tweenFunction,
        tweenDuration = _this$getOptions.tweenDuration;

    if (!run) {
      return false;
    }

    var nP = _this.particles.length;
    var activeCount = recycle ? nP : particlesGenerated;
    var now = Date.now(); // Initial population

    if (activeCount < numberOfPieces) {
      // Use the numberOfPieces prop as a key to reset the easing timing
      if (lastNumberOfPieces !== numberOfPieces) {
        _this.tweenInitTime = now;
        _this.lastNumberOfPieces = numberOfPieces;
      }

      var tweenInitTime = _this.tweenInitTime; // Add more than one piece per loop, otherwise the number of pieces would
      // be limitted by the RAF framerate

      var progressTime = now - tweenInitTime > tweenDuration ? tweenDuration : Math.max(0, now - tweenInitTime);
      var tweenedVal = tweenFunction(progressTime, activeCount, numberOfPieces, tweenDuration);
      var numToAdd = Math.round(tweenedVal - activeCount);

      for (var i = 0; i < numToAdd; i += 1) {
        _this.particles.push(_this.getParticle());
      }

      _this.particlesGenerated += numToAdd;
    }

    if (debug) {
      // Draw debug text
      context.font = '12px sans-serif';
      context.fillStyle = '#333';
      context.textAlign = 'right';
      context.fillText("Particles: " + nP, canvas.width - 10, canvas.height - 20);
    } // Maintain the population


    _this.particles.forEach(function (p, i) {
      // Update each particle's position
      p.update(); // Prune the off-canvas particles

      if (p.y > canvas.height || p.y < -100 || p.x > canvas.width + 100 || p.x < -100) {
        if (recycle && activeCount <= numberOfPieces) {
          // Replace the particle with a brand new one
          _this.particles[i] = _this.getParticle();
        } else {
          _this.removeParticleAt(i);
        }
      }
    });

    return nP > 0 || activeCount < numberOfPieces;
  };

  this.canvas = canvas;
  var ctx = this.canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  this.context = ctx;
  this.getOptions = getOptions;
};

var confettiDefaults = {
  width: typeof window !== 'undefined' ? window.innerWidth : 300,
  height: typeof window !== 'undefined' ? window.innerHeight : 200,
  numberOfPieces: 200,
  friction: 0.99,
  wind: 0,
  gravity: 0.1,
  initialVelocityX: 4,
  initialVelocityY: 10,
  colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548'],
  opacity: 1.0,
  debug: false,
  tweenFunction: tweens.easeInOutQuad,
  tweenDuration: 5000,
  recycle: true,
  run: true
};
var Confetti = /*#__PURE__*/function () {
  function Confetti(canvas, opts) {
    var _this = this;

    this.setOptionsWithDefaults = function (opts) {
      var computedConfettiDefaults = {
        confettiSource: {
          x: 0,
          y: 0,
          w: _this.canvas.width,
          h: 0
        }
      };
      _this._options = _extends({}, computedConfettiDefaults, confettiDefaults, opts);
      Object.assign(_this, opts.confettiSource);
    };

    this.update = function () {
      var _this$options = _this.options,
          run = _this$options.run,
          onConfettiComplete = _this$options.onConfettiComplete,
          canvas = _this.canvas,
          context = _this.context;

      if (run) {
        context.fillStyle = 'white';
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (_this.generator.animate()) {
        _this.rafId = requestAnimationFrame(_this.update);
      } else {
        if (onConfettiComplete && typeof onConfettiComplete === 'function' && _this.generator.particlesGenerated > 0) {
          onConfettiComplete.call(_this, _this);
        }

        _this._options.run = false;
      }
    };

    this.reset = function () {
      if (_this.generator && _this.generator.particlesGenerated > 0) {
        _this.generator.particlesGenerated = 0;
        _this.generator.particles = [];
        _this.generator.lastNumberOfPieces = 0;
      }
    };

    this.stop = function () {
      _this.options = {
        run: false
      };

      if (_this.rafId) {
        cancelAnimationFrame(_this.rafId);
        _this.rafId = undefined;
      }
    };

    this.canvas = canvas;
    var ctx = this.canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    this.context = ctx;
    this.generator = new ParticleGeneratorClass(this.canvas, function () {
      return _this.options;
    });
    this.options = opts;
    this.update();
  }

  _createClass(Confetti, [{
    key: "options",
    get: function get() {
      return this._options;
    },
    set: function set(opts) {
      var lastRunState = this._options && this._options.run;
      var lastRecycleState = this._options && this._options.recycle;
      this.setOptionsWithDefaults(opts);

      if (this.generator) {
        Object.assign(this.generator, this.options.confettiSource);

        if (typeof opts.recycle === 'boolean' && opts.recycle && lastRecycleState === false) {
          this.generator.lastNumberOfPieces = this.generator.particles.length;
        }
      }

      if (typeof opts.run === 'boolean' && opts.run && lastRunState === false) {
        this.update();
      }
    }
  }]);

  return Confetti;
}();

var ref = /*#__PURE__*/React__default.createRef();

function extractCanvasProps(props) {
  var confettiOptions = {};
  var refs = {};
  var rest = {};
  var confettiOptionKeys = [].concat(Object.keys(confettiDefaults), ['confettiSource', 'drawShape', 'onConfettiComplete']);
  var refProps = ['canvasRef'];
  Object.keys(props).forEach(function (prop) {
    var val = props[prop];

    if (confettiOptionKeys.includes(prop)) {
      confettiOptions[prop] = val;
    } else if (refProps.includes(prop)) {
      refProps[prop] = val;
    } else {
      rest[prop] = val;
    }
  });
  return [confettiOptions, rest, refs];
}

var ConfettiReactInternal = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ConfettiReactInternal, _Component);

  function ConfettiReactInternal(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.canvas = React__default.createRef();
    _this.canvas = props.canvasRef || ref;
    return _this;
  }

  var _proto = ConfettiReactInternal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.canvas.current) {
      var opts = extractCanvasProps(this.props)[0];
      this.confetti = new Confetti(this.canvas.current, opts);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var confettiOptions = extractCanvasProps(this.props)[0];

    if (this.confetti) {
      this.confetti.options = confettiOptions;
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.confetti) {
      this.confetti.stop();
    }

    this.confetti = undefined;
  };

  _proto.render = function render() {
    var _extractCanvasProps = extractCanvasProps(this.props),
        confettiOptions = _extractCanvasProps[0],
        passedProps = _extractCanvasProps[1];

    var canvasStyles = _extends({
      zIndex: 2,
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }, passedProps.style);

    return React__default.createElement("canvas", Object.assign({
      width: confettiOptions.width,
      height: confettiOptions.height,
      ref: this.canvas
    }, passedProps, {
      style: canvasStyles
    }));
  };

  return ConfettiReactInternal;
}(React.Component);

ConfettiReactInternal.defaultProps = /*#__PURE__*/_extends({}, confettiDefaults);
ConfettiReactInternal.displayName = 'ConfettiReact'; // eslint-disable-next-line react/display-name

var Index = /*#__PURE__*/React__default.forwardRef(function (props, _ref) {
  return React__default.createElement(ConfettiReactInternal, Object.assign({
    canvasRef: ref
  }, props));
});

exports.Index = Index;
exports.default = Index;
//# sourceMappingURL=confetti-react.cjs.development.js.map
