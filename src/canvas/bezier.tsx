import React from 'react'
import Canvas, { InitFn } from '../utils/Canvas'

const initFn: InitFn = (_, container) => {

  container.innerHTML = 'Hello, Bézier curve.'
}

export default () => (
  <Canvas initFn={initFn} />
)
