precision mediump float;

varying vec2 vUv;
uniform vec2 uOffset;
uniform float uProgress;
uniform float uVelocity;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += (sin(pos.y * 3. + uVelocity) * 0.1) * uProgress;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
