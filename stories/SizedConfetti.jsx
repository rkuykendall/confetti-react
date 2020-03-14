import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';

import Index from '../src';

export default React.forwardRef((passedProps, ref) => {
  const { width, height } = useWindowSize();
  return <Index width={width} height={height} {...passedProps} ref={ref} />;
});
