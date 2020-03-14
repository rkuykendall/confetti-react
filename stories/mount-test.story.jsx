import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import ConfettiReact from '../src/ConfettiReact';

const Toggler = ({ children }) => {
  const [isVisible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(!isVisible);
  };
  return (
    <div>
      {isVisible && children}
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <button onClick={handleClick}>Toggle</button>
        <aside style={{ marginTop: '2rem' }}>
          This is just to test that the confetti is cleaned up properly when the component is unmounted.
        </aside>
      </div>
    </div>
  );
};

storiesOf('Tests|Lifecycle', module).add('Cleanup on mount', () => (
  <div>
    <Toggler>
      <ConfettiReact style={{ zIndex: 0 }} />
    </Toggler>
  </div>
));
