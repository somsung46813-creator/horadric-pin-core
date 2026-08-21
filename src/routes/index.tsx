import { createFileRoute } from "@tanstack/react-router";
import gemImage from "@/assets/horadric-gem.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PIN — Popping Interning NPU | Horadric Interpreter" },
      {
        name: "description",
        content:
          "PIN (Popping Interning NPU) by Jonathan R Mckinney — a presetted, offsetted procedural pipeline bound to the Horadric Orifice gemstone.",
      },
      { property: "og:title", content: "PIN — Popping Interning NPU" },
      {
        property: "og:description",
        content:
          "Preloaded, offloaded, parametering pipeline: updating, sort-pull-filter-poll caching, and a reader/writer packetizer handler.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stages = [
  {
    id: "01",
    name: "Updating",
    sub: "Upgrades",
    lines: [
      "Version deltas resolved before dispatch",
      "Hot-swap of preset tables at the offset boundary",
      "Rollback anchor retained per interned frame",
    ],
  },
  {
    id: "02",
    name: "SortPullFilterPoll",
    sub: "Caching / Memory Mapping",
    lines: [
      "Sort: rank residents by resonance weight",
      "Pull: fetch mapped pages from the ember cache",
      "Filter: discard non-resonant packets",
      "Poll: re-arm the descriptor ring",
    ],
  },
  {
    id: "03",
    name: "Handler",
    sub: "Reader / Writer Packetizer",
    lines: [
      "Reader binds to the interpreter tap",
      "Writer frames payloads into 8-point packets",
      "Backpressure returned to the preset stage",
    ],
  },
];

const spec = [
  { k: "Type", v: "Horadric Artifact" },
  { k: "Shape", v: "Octagonal (8-Point Focus)" },
  { k: "Color", v: "Ancient Topaz / Ember Core" },
  { k: "Dimension", v: "~3.2 cm diameter" },
  { k: "Weight", v: "~42.7 g" },
  { k: "Composition", v: "Arcane Crystal, Horadric Essence, Imbued Flame" },
  { k: "Properties", v: "Resonates with the Horadric Orifice. Reacts to the Horadric Staff." },
];

function Index() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Linked Pin Interpreter
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-rune sm:text-6xl">
            PIN
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-primary sm:text-base">
            Popping Interning NPU
          </p>
          <p className="mt-4 text-xs text-muted-foreground">by Jonathan R Mckinney</p>
        </header>

        <section className="mt-14 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ember rounded-full glow-ember" />
            <img
              src={gemImage}
              alt="Octagonal ancient topaz Horadric gemstone with a glowing ember core"
              width={1024}
              height={1024}
              className="relative w-64 max-w-full sm:w-80"
            />
          </div>
          <p className="mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            A crystalline manifestation of the ancient horadric mechanism that once bound
            Tal Rasha&apos;s tomb. This gemstone holds the extracted spatial energy of the
            Orifice Chamber, resonating with the same power that unlocks forbidden
            passageways.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Presetted — Offsetted · Proceduring
          </h2>
          <p className="mt-2 text-xs text-muted-foreground/80">
            &amp; Preloaded / Offloaded / Parametering
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {stages.map((s) => (
              <article key={s.id} className="panel-etched rounded-lg p-5">
                <span className="font-display text-xs tracking-[0.3em] text-primary">
                  {s.id}
                </span>
                <h3 className="mt-3 text-lg font-bold text-foreground">{s.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-accent">
                  {s.sub}
                </p>
                <ul className="mt-4 space-y-2">
                  {s.lines.map((l) => (
                    <li
                      key={l}
                      className="border-l border-border pl-3 text-xs leading-relaxed text-muted-foreground"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Gemstone Details
          </h2>
          <dl className="panel-etched mt-6 divide-y divide-border rounded-lg">
            {spec.map((row) => (
              <div
                key={row.k}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <dt className="w-48 shrink-0 text-xs uppercase tracking-[0.2em] text-primary">
                  {row.k}
                </dt>
                <dd className="text-sm text-foreground">{row.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="mt-16 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          PIN · Linked Pin Interpreter — bound to the Horadric Orifice
        </footer>
      </div>
    </main>
  );
}
