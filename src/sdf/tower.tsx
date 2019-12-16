/**
 * title: SDF - Tower
 * desc: 通过组合，画点更有趣的图形
 */
import React from 'react'
import SDFCanvas, { glsl } from '../utils/SDFCanvas'

const fragShader = glsl`
  precision mediump float;

  uniform vec3 u_color;
  uniform vec2 u_resolution;

  float fill(float x, float size) {
    return 1.-step(size, x);
  }

  float flip(float v, float pct) {
    return mix(v, 1.-v, pct);
  }

  float stroke(float x, float size, float w) {
    float d = step(size, x+w*.5) - step(size, x-w*.5);
    return clamp(d, 0., 1.);
  }

  float rectSDF(vec2 st, vec2 s) {
    st = st*2.-1.;
    return max(abs(st.x/s.x),
               abs(st.y/s.y));
  }

  void main() {
    vec3 color = vec3(0.2);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = (st-.5)*1.2019+.5;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
        st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
    } else {
        st.x *= u_resolution.x/u_resolution.y;
        st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    }

    float rect = rectSDF(st, vec2(.5,1.));
    float diag = (st.x+st.y)*.5;
    color += flip(fill(rect, .6),
                  stroke(diag, .5, .01));

    gl_FragColor = vec4(color,1.);
  }`

export default () => (
  <SDFCanvas fragShader={fragShader} />
)

