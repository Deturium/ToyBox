/**
 * title: REGL - triangle
 * desc: 图形学的 hello world
 */
import React from 'react'
import Canvas, { InitFn } from '../utils/Canvas'

import REGL from 'regl'
const glsl = (x: any) => x;

const initFn: InitFn = (canvas) => {
  canvas.width = 400
  canvas.height = 240

  const regl = REGL(canvas)

  regl.clear({
    color: [0, 0, 0, .1],
    depth: 1
  })

  regl({
    vert: glsl`
    precision mediump float;
    attribute vec2 position;
    uniform vec2 translate;

    void main () {
      gl_Position = vec4(position + translate, 0, 1);
    }`,

    frag: glsl`
    precision mediump float;
    uniform vec4 color;

    void main () {
      gl_FragColor = color;
    }`,

    attributes: {
      position: [
        [0, 1],
        [0.5, -0.5],
        [-0.75, -0.5],
      ]
    },

    uniforms: {
      translate: [0, -0.22],
      color: [102/255, 204/255, 1, 1], // #66CCFF
    },

    count: 3,
  })()
}

export default () => (
  <Canvas initFn={initFn} />
)
