precision mediump float;
uniform sampler2D uTexture;
uniform float uAlpha;
uniform float uTime;

varying vec2 vUv;

void main(){
  vec3 color = texture2D(uTexture, vUv).rgb;
  gl_FragColor = vec4(color, uAlpha);
}
