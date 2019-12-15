/**
 * title: SDF - Circle2
 * desc: 用 RGB Blend 简单做下抗锯齿，再加点“呼吸”
 */
import React from 'react'
import SDFCanvas, { glsl } from '../utils/SDFCanvas'

const fragShader = glsl`
  precision mediump float;

  uniform vec3 u_color;
  uniform vec2 u_resolution;
  uniform float u_time;

  float circleSDF(vec2 coord, float r) {
    float distance = length(coord);
    return smoothstep(r - 2., r, distance);
  }

  void main () {
    vec2 st = gl_FragCoord.xy - u_resolution * vec2(0.5);
    float dSign = circleSDF(st, 50. + abs(sin(u_time)) * 10.);

    vec3 color = mix(u_color, vec3(0.9), dSign);
    gl_FragColor = vec4(color, 1.);
  }`

export default () => (
  <SDFCanvas fragShader={fragShader} nonStatic />
)
