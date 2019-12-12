/**
 * title: SDF - Circle
 */
import React from 'react'
import Canvas, { InitFn } from '../utils/Canvas'

import REGL from 'regl'
const glsl = (x: any) => x;

const WIDTH = 400
const HEIGHT = 240

const initFn: InitFn = (canvas) => {
  canvas.width = WIDTH
  canvas.height = HEIGHT

  const regl = REGL(canvas)

  regl({
    vert: glsl`
    precision mediump float;
    attribute vec2 position;

    void main () {
      gl_Position = vec4(position, 0, 1);
    }`,

    frag: glsl`
    precision mediump float;

    uniform vec4 u_color;
    uniform vec2 u_resolution;

    float circleSDF(vec2 coord, vec2 center, float r) {
      vec2 offset = coord - center;
      return sqrt((offset.x * offset.x) + (offset.y * offset.y)) - r;
    }

    void main () {
      float d = circleSDF(gl_FragCoord.xy, u_resolution * vec2(0.5, 0.5), 50.0);

      if (d <= 0.) {
        gl_FragColor = u_color;
      } else {
        gl_FragColor = vec4(0., 0., 0., 0.1);
      }
    }`,

    attributes: {
      position: [
        [-1, 1],
        [1, 1],
        [1, -1],
        [-1, -1],
      ]
    },

    uniforms: {
      u_resolution: [WIDTH, HEIGHT],
      u_color: [102/255, 204/255, 1, 1], // #66CCFF
    },

    count: 4,

    primitive: 'triangle fan',
  })()
}

export default () => (
  <Canvas initFn={initFn} />
)
