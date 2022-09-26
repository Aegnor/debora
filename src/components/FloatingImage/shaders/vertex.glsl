precision mediump float;

varying vec2 vUv;
varying vec3 vPos;
uniform vec2 uOffset;
uniform float uProgress;

#pragma glslify: noise = require(glsl-noise/simplex/3d);

void main() {
  vUv = uv;

  vec3 pos = position;
  vPos = pos;
  float noiseFreq = 7.;
  float noiseAmp = .30;
  float deformationX = pos.x * noiseFreq + uOffset.x;
  float deformationY = sin(pos.y + uOffset.y) * 2.5;
  vec3 noisePos = vec3(deformationX, deformationY, pos.z) * uProgress;
  pos.z = noise(noisePos) * noiseAmp;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
