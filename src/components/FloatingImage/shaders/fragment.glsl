precision mediump float;
uniform sampler2D uTexture;
uniform float uAlpha;
uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;

#pragma glslify: noise = require(glsl-noise/simplex/3d);

void main(){
  vec3 pos = vPos;
  float noiseFreq = 3.5;
  float noiseAmp = .15;
  float deformationX = pos.x * noiseFreq + uTime;
  vec3 noisePos = vec3(deformationX, pos.y, pos.z);
  float wave = (noise(noisePos) * noiseAmp) * 0.1;

  vec3 color = texture2D(uTexture, vUv + wave).rgb;
  gl_FragColor = vec4(color, uAlpha);
}
