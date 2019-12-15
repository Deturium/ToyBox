/**
 * title: SDF - Circle
 */
import React from 'react'
import REGL from 'regl'
import Canvas from './Canvas'

export const glsl = (x: any) => x;

type Props = {
  /** 片段着色器 */
  fragShader: string
  /** 随着时间重绘 */
  nonStatic?: boolean
}

const WIDTH = 400
const HEIGHT = 240

const sdfFn = (props: Props) => (canvas: HTMLCanvasElement) => {
  canvas.width = WIDTH
  canvas.height = HEIGHT

  const regl = REGL(canvas)

  regl.clear({
    color: [0.9, 0.9, 0.9, 1],
    depth: 1
  })

  const drawSDF = regl({
    vert: glsl`
    precision mediump float;
    attribute vec2 position;

    void main () {
      gl_Position = vec4(position, 0, 1);
    }`,

    frag: props.fragShader,

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
      u_color: [102/255, 204/255, 1], // #66CCFF
      u_time: (_, props) => {
        return (props as any).time
      },
    },

    count: 4,

    primitive: 'triangle fan',
  })


  if (!props.nonStatic) {
    drawSDF({ time: 0 })
  } else {
    regl.frame(({ time }) => {
      drawSDF({ time })
    })
  }
}

const SDFCanvas: React.FC<Props> = (props) => (
  <Canvas initFn={sdfFn(props)} />
)

export default React.memo(SDFCanvas)
