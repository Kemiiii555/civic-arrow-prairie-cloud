import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  color: string;
  kind: "confetti" | "spark" | "rocket";
};

const CONFETTI_COLORS = ["#d4b56a", "#f0d78c", "#f3ead2", "#fff8e8", "#c9a44a", "#efe6c8"];
const SPARK_COLORS = ["#fff6d0", "#f0d78c", "#d4b56a", "#ffffff", "#e8c35a"];

export function ConfettiLayer() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let running = true;
    const particles: Particle[] = [];
    let spawn = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spawn += 1;
      if (spawn % 3 === 0 && particles.length < 140) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -12,
          vx: (Math.random() - 0.5) * 1.4,
          vy: 1.2 + Math.random() * 1.8,
          life: 0,
          max: 220 + Math.random() * 160,
          w: 4 + Math.random() * 6,
          h: 8 + Math.random() * 8,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.16,
          color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0] ?? "#d4b56a",
          kind: "confetti",
        });
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!p) continue;
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > canvas.height + 20 || p.life > p.max) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-20" aria-hidden="true" />;
}

export function FireworksCanvas({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let running = true;
    let aborted = false;
    const particles: Particle[] = [];
    let launched = 0;
    const start = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const explode = (x: number, y: number) => {
      const n = 48 + ((Math.random() * 24) | 0);
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.2;
        const s = 1.4 + Math.random() * 3.2;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 0,
          max: 50 + Math.random() * 30,
          w: 2 + Math.random() * 2,
          h: 2,
          rot: 0,
          vr: 0,
          color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0] ?? "#f0d78c",
          kind: "spark",
        });
      }
    };

    const launch = () => {
      const x = canvas.width * (0.18 + Math.random() * 0.64);
      particles.push({
        x,
        y: canvas.height + 8,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(7.2 + Math.random() * 2.4),
        life: 0,
        max: 90,
        w: 3,
        h: 10,
        rot: 0,
        vr: 0,
        color: "#f0d78c",
        kind: "rocket",
      });
      launched += 1;
    };

    launch();
    const launchTimer = window.setInterval(() => {
      if (launched < 8) launch();
    }, 520);

    const tick = () => {
      if (!running) return;
      ctx.fillStyle = "rgba(5,5,5,0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!p) continue;
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.kind === "spark") p.vy += 0.045;
        if (p.kind === "rocket") {
          p.vy += 0.04;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 1;
          ctx.fillRect(p.x, p.y, 2, 8);
          if (p.vy > -1.2 || p.life > 70) {
            explode(p.x, p.y);
            particles.splice(i, 1);
          }
          continue;
        }
        const a = Math.max(0, 1 - p.life / p.max);
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.w, 0, Math.PI * 2);
        ctx.fill();
        if (p.life > p.max) particles.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      if (performance.now() - start > 6200 && particles.length === 0) {
        running = false;
        if (!aborted) done.current();
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      aborted = true;
      running = false;
      window.clearInterval(launchTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-10" aria-hidden="true" />;
}

export function CameraFlash({ show }: { show: boolean }) {
  if (!show) return null;
  return <div className="flash" />;
}
