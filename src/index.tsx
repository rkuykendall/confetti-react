import React, { Component, CanvasHTMLAttributes } from 'react';
import Confetti, { ConfettiOptions, confettiDefaults } from './Confetti';

const ref = React.createRef<HTMLCanvasElement>();

interface Refs {
  [key: string]: React.Ref<HTMLElement>;
}

function extractCanvasProps(
  props: Partial<ConfettiOptions> | any,
): [Partial<ConfettiOptions>, Partial<CanvasHTMLAttributes<HTMLCanvasElement>>, Refs] {
  const confettiOptions: Partial<ConfettiOptions> = {};
  const refs: Refs = {};
  const rest: any = {};
  const confettiOptionKeys = [...Object.keys(confettiDefaults), 'confettiSource', 'drawShape', 'onConfettiComplete'];
  const refProps = ['canvasRef'];
  Object.keys(props).forEach(prop => {
    const val = props[prop as string];
    if (confettiOptionKeys.includes(prop)) {
      confettiOptions[prop] = val;
    } else if (refProps.includes(prop)) {
      refProps[prop as any] = val;
    } else {
      rest[prop] = val;
    }
  });
  return [confettiOptions, rest, refs];
}

export type Props = Partial<ConfettiOptions> &
  CanvasHTMLAttributes<HTMLCanvasElement> & {
    canvasRef?: React.Ref<HTMLCanvasElement>;
  };

class ConfettiReactInternal extends Component<Props> {
  static readonly defaultProps = {
    ...confettiDefaults,
  };

  static readonly displayName = 'ConfettiReact';

  canvas: React.RefObject<HTMLCanvasElement> = React.createRef();

  confetti?: Confetti;

  constructor(props: Props) {
    super(props);
    this.canvas = (props.canvasRef as React.RefObject<HTMLCanvasElement>) || ref;
  }

  componentDidMount() {
    if (this.canvas.current) {
      const opts = extractCanvasProps(this.props)[0];
      this.confetti = new Confetti(this.canvas.current, opts);
    }
  }

  componentDidUpdate() {
    const confettiOptions = extractCanvasProps(this.props)[0];
    if (this.confetti) {
      this.confetti.options = confettiOptions as ConfettiOptions;
    }
  }

  componentWillUnmount() {
    if (this.confetti) {
      this.confetti.stop();
    }
    this.confetti = undefined;
  }

  render() {
    const [confettiOptions, passedProps] = extractCanvasProps(this.props);
    const canvasStyles = {
      zIndex: 2,
      position: 'absolute' as 'absolute',
      pointerEvents: 'none' as 'none',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      ...passedProps.style,
    };
    return (
      <canvas
        width={confettiOptions.width}
        height={confettiOptions.height}
        ref={this.canvas}
        {...passedProps}
        style={canvasStyles}
      />
    );
  }
}

// eslint-disable-next-line react/display-name
export const Index = React.forwardRef<HTMLCanvasElement, Props>((props, _ref) => (
  <ConfettiReactInternal canvasRef={ref} {...props} />
));

export default Index;
