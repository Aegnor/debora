varying float pulse;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float time;
uniform sampler2D uTexture;
uniform float startColor;
uniform vec3 colorPrimary;
uniform vec3 colorSecondary;

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 perm(vec4 x){
  return mod289(((x * 34.0) + 1.0) * x);
}

float createNoise(vec3 p){
  vec3 a = floor(p);
  vec3 d = p - a;

  d = d * d * (3.0 - 2.0 * d);

  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);

  vec4 k1 = perm(b.xyxy);
  vec4 k2 = perm(k1.xyxy + b.zzww);

  vec4 c = k2 + a.zzzz;

  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);

  vec4 o1 = fract(k3 * (1.0 / 41.0));
  vec4 o2 = fract(k4 * (1.0 / 41.0));
  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

  return o4.y * d.y + o4.x * (1.0 - d.y);
}

float lines(vec2 uv, float offset){
  return smoothstep(0., startColor + offset * 0.1, abs(0.2 * sin(uv.x * 20.) + offset * 1.));
}

mat2 rotate2d(float angle){
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
  float noise = createNoise(vPosition - startColor * 10. + time / 5.);

  vec3 changingColor = vec3(startColor * noise, startColor * noise, startColor * noise);

  vec2 baseUV = rotate2d(noise) * vPosition.xy * 0.1;

  float basePattern = lines(baseUV, 0.5);
  float secondPattern = lines(baseUV, 0.2);

  vec3 baseColor = mix(changingColor, colorPrimary, basePattern);
  vec3 secondBaseColor = mix(baseColor, colorSecondary, secondPattern);

  gl_FragColor = vec4(vec3(secondBaseColor), 1.);
}
