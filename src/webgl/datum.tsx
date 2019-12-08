/**
 * title: REGL - datum
 * desc: 金坷垃好处都有啥，谁说对了就给他！
 */
import React from 'react'
import Canvas, { InitFn } from '../utils/Canvas'

import REGL from 'regl'
const glsl = (x: any) => x;

// util func
function randamFromRange(min: number, max: number, isInt = false) {
  const num = Math.random() * (max - min) + min;
  return isInt ? ~~num : num
}

interface Datum {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}


// REGL types
interface Uniforms {
  color: REGL.Vec3
  canvasWidth: number
  canvasHeight: number
}

interface Attributes {
  position: REGL.Vec2[]
  size: number[]
  opacity: number[]
}

interface Props {
  datums: Datum[]
}

// 画布大小
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 300

const initFn: InitFn = (canvas) => {
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  // 弹幕生成器
  const geneDatum = (id: number) => ({
    id,
    x: 0,
    y: randamFromRange(20, CANVAS_HEIGHT - 20),
    size: randamFromRange(10, 30),
    speed: randamFromRange(1, 5),
    opacity: randamFromRange(0.5, 1),
  })

  // 准备弹幕
  const datums: Datum[] = new Array(40)
    .fill(null)
    .map((_, idx) => geneDatum(idx))

  const regl = REGL(canvas)

  const datmuREGL = regl<Uniforms, Attributes, Props>({
    vert: glsl`
    precision mediump float;
    attribute vec2 position;
    attribute float size;
    attribute float opacity;
    varying float v_opacity;

    uniform float canvasWidth;
    uniform float canvasHeight;

    vec2 normalizeCoords(vec2 position) {
      float x = position[0];
      float y = position[1];

      return vec2(
        2.0 * ((x / canvasWidth) - 0.5),
        -(2.0 * ((y / canvasHeight) - 0.5)));
    }

    void main () {
      gl_Position = vec4(normalizeCoords(position), 0, 1);
      gl_PointSize = size;
      v_opacity = opacity;
    }`,

    frag: glsl`
    precision mediump float;
    uniform vec3 color;
    varying float v_opacity;

    void main () {
      gl_FragColor = vec4(color, v_opacity);
    }`,

    attributes: {
      position: (_, props) => {
        return props.datums.map(d => [d.x, d.y])
      },
      size: (_, props) => {
        return props.datums.map(d => d.size)
      },
      opacity: (_, props) => {
        return props.datums.map(d => d.opacity)
      },
    },

    uniforms: {
      color: [102/255, 204/255, 1], // #66CCFF
      canvasWidth: regl.context("drawingBufferWidth"),
      canvasHeight: regl.context("drawingBufferHeight"),
    },

    count: (_, props) => {
      return props.datums.length
    },

    primitive: "points",
  })


  regl.frame(_ => {
    regl.clear({
      color: [0, 0, 0, .1],
    })

    datums.map(d => {
      d.x += d.speed
      if (d.x > CANVAS_WIDTH) {
        // 不能使用 d = geneDatum(d.id)
        Object.assign(d, geneDatum(d.id))
      }
    })

    datmuREGL({
      datums,
    })
  })
}

export default () => (
  <Canvas initFn={initFn} />
)
