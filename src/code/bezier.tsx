import React from 'react'
import Canvas, { InitFn } from '../utils/Canvas'

const initFn: InitFn = (container) => {

  container.innerHTML = 'Hello world'
}

export default () => (
  <Canvas initFn={initFn} />
)
