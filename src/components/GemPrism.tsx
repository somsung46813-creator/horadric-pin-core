import type { RarityTier } from "@/lib/gem-forge";

type Props = {
  hue: string;
  tier: RarityTier;
  /** Rendered size in px. */
  size?: number;
  /** Show girdle / table / step labels. */
  labelled?: boolean;
  className?: string;
};

/**
 * Rainbow facet cutting map.
 *
 * Table  = centre square (light window)
 * Steps  = concentric borders descending to the girdle
 * Girdle = outer square, raw-material boundary
 * Index  = diagonals & crosses cut across intersections
 */
export function GemPrism({
  hue,
  tier,
  size = 160,
  labelled = false,
  className,
}: Props) {
  const uid = `${tier.key}-${Math.round(size)}`;
  const half = 50;
  const girdle = 48; // half-width of outer square
  const table = 12; // half-width of centre square
  const stepGap = (girdle - table) / (tier.steps + 1);

  const rings = Array.from({ length: tier.steps }, (_, i) => girdle - stepGap * (i + 1));
  const indexAngles = Array.from(
    { length: tier.indexLines },
    (_, i) => (360 / tier.indexLines) * i,
  );

  const sq = (h: number) => ({ x: half - h, y: half - h, width: h * 2, height: h * 2 });

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${tier.label} facet cutting map with ${tier.steps} step cuts and ${tier.indexLines} index lines`}
    >
      <defs>
        <linearGradient id={`rainbow-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.2 25)" />
          <stop offset="20%" stopColor="oklch(0.82 0.17 75)" />
          <stop offset="40%" stopColor="oklch(0.88 0.18 120)" />
          <stop offset="60%" stopColor="oklch(0.78 0.14 200)" />
          <stop offset="80%" stopColor="oklch(0.68 0.18 275)" />
          <stop offset="100%" stopColor="oklch(0.7 0.2 330)" />
        </linearGradient>
        <radialGradient id={`core-${uid}`} cx="38%" cy="32%">
          <stop offset="0%" stopColor={`color-mix(in oklch, ${hue} 70%, white)`} />
          <stop offset="55%" stopColor={hue} />
          <stop offset="100%" stopColor={`color-mix(in oklch, ${hue} 55%, black)`} />
        </radialGradient>
        <clipPath id={`crown-${uid}`}>
          <rect {...sq(girdle)} rx="2" />
        </clipPath>
      </defs>

      {/* Girdle — raw material boundary */}
      <rect {...sq(girdle)} rx="2" fill={`url(#core-${uid})`} />

      {/* Rainbow dispersion across the crown */}
      <rect
        {...sq(girdle)}
        rx="2"
        fill={`url(#rainbow-${uid})`}
        opacity={tier.dispersion * 0.62}
        style={{ mixBlendMode: "screen" }}
      />

      <g clipPath={`url(#crown-${uid})`}>
        {/* Diagonals & crosses — index grooves */}
        {indexAngles.map((a) => (
          <line
            key={a}
            x1={half}
            y1={half}
            x2={half}
            y2={-10}
            stroke="oklch(1 0 0)"
            strokeOpacity={0.18 + tier.dispersion * 0.22}
            strokeWidth={0.5}
            transform={`rotate(${a} ${half} ${half})`}
          />
        ))}
      </g>

      {/* Concentric step cuts */}
      {rings.map((h, i) => (
        <rect
          key={h}
          {...sq(h)}
          fill="none"
          stroke="oklch(1 0 0)"
          strokeOpacity={0.22 + (i / Math.max(rings.length, 1)) * 0.3}
          strokeWidth={0.7}
        />
      ))}

      {/* Table — the light window */}
      <rect
        {...sq(table)}
        fill={`color-mix(in oklch, ${hue} 45%, white)`}
        fillOpacity={0.55 + tier.dispersion * 0.35}
        stroke="oklch(1 0 0)"
        strokeOpacity={0.55}
        strokeWidth={0.8}
      />

      {/* Girdle outline on top */}
      <rect
        {...sq(girdle)}
        rx="2"
        fill="none"
        stroke={tier.tierColor}
        strokeWidth={1.4}
      />

      {labelled && (
        <g
          fontSize="3.2"
          fontFamily="var(--font-body)"
          fill="oklch(1 0 0 / 0.75)"
          textAnchor="middle"
        >
          <text x={half} y={half + 1.2}>
            TABLE
          </text>
          <text x={half} y={half - girdle + 4.5}>
            GIRDLE
          </text>
        </g>
      )}
    </svg>
  );
}
