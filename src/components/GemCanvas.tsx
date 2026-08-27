import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
};

/**
 * Animated Horadric gemstone — a crystalline manifestation of the ancient
 * mechanism that bound Tal Rasha's tomb. Octagonal topaz facets rotate
 * slowly around a breathing ember core while imbued sparks rise from it.
 */
export function GemCanvas({ size = 384 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.34; // gem outer radius (octagon)
    const SIDES = 8;
    const sparks: Spark[] = [];
    let raf = 0;
    let t = 0;

    const spawn = () => {
      if (sparks.length > 70) return;
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * R * 0.5;
      sparks.push({
        x: cx + Math.cos(a) * d,
        y: cy + Math.sin(a) * d,
        r: 0.6 + Math.random() * 1.8,
        vy: -(0.15 + Math.random() * 0.45),
        vx: (Math.random() - 0.5) * 0.2,
        life: 0,
        maxLife: 180 + Math.random() * 160,
      });
    };

    const octagon = (
      radius: number,
      rot: number,
      path: CanvasRenderingContext2D
    ) => {
      path.beginPath();
      for (let i = 0; i < SIDES; i++) {
        const a = rot + (i / SIDES) * Math.PI * 2;
        const px = cx + Math.cos(a) * radius;
        const py = cy + Math.sin(a) * radius;
        i === 0 ? path.moveTo(px, py) : path.lineTo(px, py);
      }
      path.closePath();
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, size, size);

      const breath = 0.5 + 0.5 * Math.sin(t * 1.4); // 0..1 core breathing
      const rot = t * 0.12; // slow facet rotation

      // --- Ambient orifice glow -------------------------------------------
      const amb = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.5);
      amb.addColorStop(0, `rgba(255, 168, 60, ${0.16 + breath * 0.1})`);
      amb.addColorStop(0.5, "rgba(200, 90, 20, 0.06)");
      amb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, size, size);

      // --- Concentric spatial-energy rings --------------------------------
      for (let i = 0; i < 3; i++) {
        const ringT = (t * 0.35 + i / 3) % 1;
        const rr = R * (1.05 + ringT * 0.75);
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 170, 70, ${(1 - ringT) * 0.14})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // --- Octagonal crystal body ------------------------------------------
      // Base fill: ancient topaz glass
      octagon(R, rot, ctx);
      const body = ctx.createRadialGradient(
        cx - R * 0.25,
        cy - R * 0.3,
        R * 0.05,
        cx,
        cy,
        R * 1.15
      );
      body.addColorStop(0, "rgba(255, 214, 130, 0.55)");
      body.addColorStop(0.45, "rgba(210, 130, 40, 0.5)");
      body.addColorStop(0.8, "rgba(120, 55, 15, 0.7)");
      body.addColorStop(1, "rgba(45, 22, 8, 0.85)");
      ctx.fillStyle = body;
      ctx.fill();

      // Facet wedges: alternate shading, shimmering as they turn
      for (let i = 0; i < SIDES; i++) {
        const a0 = rot + (i / SIDES) * Math.PI * 2;
        const a1 = rot + ((i + 1) / SIDES) * Math.PI * 2;
        const shimmer =
          0.06 + 0.1 * Math.max(0, Math.sin(t * 1.1 + i * 1.7));
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a0) * R, cy + Math.sin(a0) * R);
        ctx.lineTo(cx + Math.cos(a1) * R, cy + Math.sin(a1) * R);
        ctx.closePath();
        ctx.fillStyle =
          i % 2 === 0
            ? `rgba(255, 226, 150, ${shimmer})`
            : `rgba(60, 25, 5, ${0.18 - shimmer * 0.5})`;
        ctx.fill();
      }

      // Inner step ring (cutting-map concentric square → octagon echo)
      octagon(R * 0.62, rot + Math.PI / SIDES, ctx);
      ctx.strokeStyle = `rgba(255, 200, 110, ${0.35 + breath * 0.2})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Girdle edge
      octagon(R, rot, ctx);
      ctx.strokeStyle = `rgba(255, 190, 100, ${0.5 + breath * 0.3})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Index lines (diagonals & crosses across intersections)
      ctx.strokeStyle = `rgba(255, 215, 140, ${0.22 + breath * 0.12})`;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < SIDES; i++) {
        const a = rot + (i / SIDES) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.stroke();
      }

      // --- Ember core --------------------------------------------------------
      const coreR = R * (0.24 + breath * 0.05);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.8);
      core.addColorStop(0, `rgba(255, 244, 210, ${0.85 + breath * 0.15})`);
      core.addColorStop(0.35, `rgba(255, 176, 70, ${0.7 + breath * 0.2})`);
      core.addColorStop(0.75, `rgba(214, 84, 18, ${0.35 + breath * 0.2})`);
      core.addColorStop(1, "rgba(120, 30, 5, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Core table facet (the flat window for entering light)
      octagon(coreR, rot + Math.PI / SIDES, ctx);
      ctx.fillStyle = `rgba(255, 236, 180, ${0.5 + breath * 0.3})`;
      ctx.fill();

      // --- Imbued flame sparks ----------------------------------------------
      for (let i = 0; i < 2; i++) spawn();
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        if (!s) continue;
        s.life++;
        s.x += s.vx + Math.sin((t + i) * 2) * 0.15;
        s.y += s.vy;
        const fade = 1 - s.life / s.maxLife;
        if (fade <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${170 + Math.floor(fade * 60)}, 80, ${
          fade * 0.8
        })`;
        ctx.fill();
      }

      // --- Sweeping highlight (light refracting through the crystal) --------
      const sweepA = t * 0.5;
      const sx = cx + Math.cos(sweepA) * R * 0.5;
      const sy = cy + Math.sin(sweepA) * R * 0.5;
      const hl = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * 0.55);
      hl.addColorStop(0, `rgba(255, 255, 235, ${0.12 + breath * 0.06})`);
      hl.addColorStop(1, "rgba(255,255,255,0)");
      ctx.save();
      octagon(R, rot, ctx);
      ctx.clip();
      ctx.fillStyle = hl;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <canvas
      ref={ref}
      style={{ width: size, height: size }}
      className="max-w-full"
      role="img"
      aria-label="Animated octagonal Horadric gemstone — topaz facets turning around a glowing ember core"
    />
  );
}
