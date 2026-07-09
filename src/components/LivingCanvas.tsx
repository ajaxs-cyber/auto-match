import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_waveSpeed;
uniform float u_waveIntensity;
uniform vec2 u_mouse;

#define PI 3.14159265359
#define TAU 6.28318530718

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

float warpedFbm(vec2 p, float t) {
  vec2 q = vec2(fbm(p + t * 0.02), fbm(p + vec2(5.2, 1.3) + t * 0.015));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.01), fbm(p + 3.0 * q + vec2(8.3, 2.8) + t * 0.012));
  return fbm(p + 2.5 * r);
}

float waveFunction(vec2 p, float t) {
  float h = 0.0;
  float d = 0.0;

  // Layer 1
  float f1 = 1.0;
  float a1 = 0.4 * u_waveIntensity;
  float s1 = 0.8;
  float fi1 = fbm(p * s1 + t * 0.3 * u_waveSpeed + vec2(10.0, 20.0));
  float w1 = sin(p.x * f1 * TAU + fi1 * 2.0 + t * 0.5 * u_waveSpeed) * cos(p.y * f1 * 0.7 * TAU + fi1 * 1.5 - t * 0.3 * u_waveSpeed);
  h += w1 * a1;
  d += a1;

  // Layer 2
  float f2 = 2.3;
  float a2 = 0.25 * u_waveIntensity;
  float s2 = 1.5;
  float fi2 = fbm(p * s2 + t * 0.25 * u_waveSpeed + vec2(50.0, 30.0));
  float w2 = sin(p.x * f2 * TAU * 0.8 + fi2 * 1.8 + t * 0.4 * u_waveSpeed) * sin(p.y * f2 * TAU * 1.2 + fi2 * 2.0 - t * 0.35 * u_waveSpeed);
  h += w2 * a2;
  d += a2;

  // Layer 3
  float f3 = 4.7;
  float a3 = 0.15 * u_waveIntensity;
  float s3 = 2.5;
  float fi3 = fbm(p * s3 + t * 0.2 * u_waveSpeed + vec2(90.0, 70.0));
  float w3 = sin(p.x * f3 * TAU * 0.6 + fi3 * 1.5 + t * 0.3 * u_waveSpeed) * cos(p.y * f3 * TAU * 0.9 + fi3 * 1.2 - t * 0.25 * u_waveSpeed);
  h += w3 * a3;
  d += a3;

  // Layer 4
  float f4 = 8.0;
  float a4 = 0.08 * u_waveIntensity;
  float s4 = 4.0;
  float fi4 = fbm(p * s4 + t * 0.15 * u_waveSpeed + vec2(130.0, 110.0));
  float w4 = sin(p.x * f4 * TAU * 0.5 + fi4 + t * 0.2 * u_waveSpeed) * sin(p.y * f4 * TAU * 0.7 + fi4 - t * 0.18 * u_waveSpeed);
  h += w4 * a4;
  d += a4;

  // Layer 5
  float f5 = 16.0;
  float a5 = 0.04 * u_waveIntensity;
  float s5 = 6.0;
  float fi5 = fbm(p * s5 + t * 0.1 * u_waveSpeed + vec2(170.0, 150.0));
  float w5 = sin(p.x * f5 * TAU * 0.4 + fi5 + t * 0.12 * u_waveSpeed) * cos(p.y * f5 * TAU * 0.5 + fi5 - t * 0.1 * u_waveSpeed);
  h += w5 * a5;
  d += a5;

  return d > 0.0 ? h / d : 0.0;
}

vec3 getNormal(vec2 p, float t, float eps) {
  float c = waveFunction(p, t);
  float r = waveFunction(p + vec2(eps, 0.0), t);
  float u = waveFunction(p + vec2(0.0, eps), t);
  return normalize(vec3(c - r, c - u, eps * 1.5));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;

  float t = u_time;

  vec2 sp = p + vec2(sin(t * 0.07) * 0.15, cos(t * 0.09) * 0.12);

  float h = waveFunction(sp, t);
  float warp = warpedFbm(sp * 0.5, t);
  float detail = fbm(sp * 3.0 + t * 0.1);

  vec3 N = getNormal(sp, t, 0.01);

  vec3 lightDir1 = normalize(vec3(0.4, 0.6, 0.8));
  vec3 lightDir2 = normalize(vec3(-0.5, -0.3, 0.7));
  vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));

  float diff1 = max(dot(N, lightDir1), 0.0);
  float diff2 = max(dot(N, lightDir2), 0.0);

  vec3 halfDir1 = normalize(lightDir1 + viewDir);
  float spec1 = pow(max(dot(N, halfDir1), 0.0), 32.0);

  vec3 halfDir2 = normalize(lightDir2 + viewDir);
  float spec2 = pow(max(dot(N, halfDir2), 0.0), 16.0);

  // AutoMatch color palette
  vec3 colDeep = vec3(0.055, 0.141, 0.235);
  vec3 colMid1 = vec3(0.290, 0.420, 0.553);
  vec3 colMid2 = vec3(0.910, 0.365, 0.298);
  vec3 colHigh1 = vec3(0.957, 0.616, 0.216);
  vec3 colHigh2 = vec3(0.482, 0.380, 1.0);
  vec3 colPeak = vec3(0.961, 0.953, 0.933);

  float hm = h * 0.5 + 0.5;
  vec3 col = mix(colDeep, colMid1, smoothstep(0.0, 0.3, hm));
  col = mix(col, colMid2, smoothstep(0.2, 0.5, hm));
  col = mix(col, colHigh1, smoothstep(0.4, 0.7, hm));
  col = mix(col, colHigh2, smoothstep(0.6, 0.85, hm));
  col = mix(col, colPeak, smoothstep(0.8, 1.0, hm));

  col = mix(col, colHigh1 * 1.1, warp * 0.3);
  col = mix(col, colMid1 * 1.1, detail * 0.15);

  col += vec3(0.25, 0.2, 0.15) * diff1 * 0.5;
  col += vec3(0.1, 0.08, 0.2) * diff2 * 0.3;

  col += vec3(0.5, 0.4, 0.3) * spec1 * 0.4;
  col += vec3(0.15, 0.1, 0.25) * spec2 * 0.2;

  float depth = length(p);
  col *= 1.0 - depth * 0.15;

  float pulse = sin(t * 0.5) * 0.5 + 0.5;
  col += vec3(0.04, 0.025, 0.015) * pulse;

  if (u_mouse.x > 0.0) {
    vec2 mUV = u_mouse / u_res;
    vec2 mPos = mUV * 2.0 - 1.0;
    mPos.x *= u_res.x / u_res.y;
    float dist = length(p - mPos);
    float cursor = exp(-dist * dist * 3.0);
    col += vec3(0.15, 0.08, 0.05) * cursor;
    col *= 1.0 + cursor * 0.3;
  }

  float vig = pow(1.0 - dot(uv - 0.5, uv - 0.5) * 0.6, 0.5);
  col *= vec3(1.0, vig * 0.97 + 0.03, vig * 0.94 + 0.06);

  float grain = (hash(gl_FragCoord.xy + fract(t * 43.0) * 1000.0) - 0.5) * 0.02;
  col += grain;

  col = col / (col + vec3(0.6)) * 1.3;
  col = pow(col, vec3(0.95, 1.0, 1.08));

  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export default function LivingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uWaveSpeed = gl.getUniformLocation(prog, 'u_waveSpeed');
    const uWaveIntensity = gl.getUniformLocation(prog, 'u_waveIntensity');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouseX = -1.0;
    let mouseY = -1.0;

    const onMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 2.0);
      mouseX = e.clientX * dpr;
      mouseY = canvas.height - e.clientY * dpr;
      gl!.uniform2f(uMouse, mouseX, mouseY);
    };

    const onMouseLeave = () => {
      mouseX = -1.0;
      mouseY = -1.0;
      gl!.uniform2f(uMouse, mouseX, mouseY);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2.0);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(uRes, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    gl.uniform1f(uWaveSpeed, 0.3);
    gl.uniform1f(uWaveIntensity, 1.0);

    let animationId = 0;
    const render = () => {
      gl!.uniform1f(uTime, performance.now() * 0.001);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      animationId = requestAnimationFrame(render);
    };
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  );
}
