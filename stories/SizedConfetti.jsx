import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'

import ConfettiReact from '../src/ConfettiReact'

export default React.forwardRef((passedProps, ref) => {
  const { width, height } = useWindowSize()
  return (
    <ConfettiReact
      width={width}
      height={height}
      {...passedProps}
      ref={ref}
    />
  )
})
