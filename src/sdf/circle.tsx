/**
 * title: SDF - Circle
 * desc: 圈圈圆圆圈圈
 */
import React from 'react'
import SDFCanvas, { glsl } from '../utils/SDFCanvas'

const fragShader = glsl`
  precision mediump float;

  uniform vec3 u_color;
  uniform vec2 u_resolution;

  float circleSDF(vec2 coord, vec2 center, float r) {
    float distance = length(coord - center);
    return distance - r;
  }

  void main () {
    float dSign = circleSDF(gl_FragCoord.xy, u_resolution * vec2(0.5), 50.);

    if (dSign <= 0.1) {
      gl_FragColor = vec4(u_color, 1.);
    } else {
      gl_FragColor = vec4(vec3(0.), 0.1);
    }
  }`

export default () => (
  <SDFCanvas fragShader={fragShader} />
)
