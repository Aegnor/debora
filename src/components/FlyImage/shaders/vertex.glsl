precision mediump float;

varying vec2 vUv;
uniform vec2 uOffset;
uniform float uProgress;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += sin(pos.y * 2. + uTime) * 0.1;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
