import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { forgeGem, RARITY_TIERS, type Gem } from "@/lib/gem-forge";
import { GemPrism } from "@/components/GemPrism";

export const Route = createFileRoute("/forge")({
  head: () => ({
    meta: [
      { title: "Gem Forge — Random Fire, Water, Air & Earth Artifacts" },
      {
        name: "description",
        content:
          "Forge random elemental gemstones — fire, water, air and earth Horadric artifacts with generated shape, mass, composition and resonance.",
      },
      { property: "og:title", content: "Gem Forge — Elemental Horadric Artifacts" },
      {
        property: "og:description",
        content:
          "Roll a random fire, water, air or earth gemstone and read its full Horadric artifact record.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgePage,
});

function ForgePage() {
  const [gem, setGem] = useState<Gem | null>(null);
  const [vault, setVault] = useState<Gem[]>([]);

  useEffect(() => {
    setGem(forgeGem());
  }, []);

  const roll = () => {
    const next = forgeGem();
    setGem(next);
    setVault((v) => [next, ...v].slice(0, 12));
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="text-center">
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            ← PIN Interpreter
          </Link>
          <h1 className="mt-6 text-3xl font-black text-rune sm:text-5xl">Gem Forge</h1>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-primary">
            Fire · Water · Air · Earth
          </p>
        </header>

        <section className="panel-etched mt-10 rounded-lg p-6 sm:p-9">
          {gem ? (
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
              <div className="animate-ember shrink-0">
                <GemPrism hue={gem.hue} tier={gem.tier} size={168} labelled />
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: gem.hue }}
                >
                  {gem.element} Aspect
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {gem.name}
                </h2>
                <p
                  className="mt-3 inline-block rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]"
                  style={{ color: gem.tier.tierColor, borderColor: gem.tier.tierColor }}
                >
                  {gem.rarity}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{gem.tier.note}</p>

                <dl className="mt-6 divide-y divide-border border-y border-border text-left">
                  <Row k="Type" v={gem.type} />
                  <Row k="Shape" v={gem.shape} />
                  <Row k="Color" v={gem.color} />
                  <Row k="Dimension" v={gem.dimension} />
                  <Row k="Weight" v={gem.weight} />
                  <Row k="Composition" v={gem.composition} />
                  <Row k="Properties" v={gem.properties} />
                  <Row
                    k="Facet Cut"
                    v={`Table + ${gem.tier.steps} step cuts, ${gem.tier.indexLines}-index crosses`}
                  />
                  <Row
                    k="Dispersion"
                    v={`${Math.round(gem.tier.dispersion * 100)}% rainbow refraction`}
                  />
                </dl>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Resonance</span>
                    <span style={{ color: gem.hue }}>{gem.resonance}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${gem.resonance}%`, backgroundColor: gem.hue }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Attuning the Orifice…
            </p>
          )}

          <button
            onClick={roll}
            className="glow-ember mt-9 w-full rounded-md border border-primary/60 bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Forge Gemstone
          </button>
        </section>

        {vault.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Vault
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {vault.map((g, i) => (
                <li
                  key={`${g.name}-${i}`}
                  className="panel-etched flex items-center gap-3 rounded-lg p-3"
                >
                  <span
                    className="gem-facet size-9 shrink-0"
                    style={{ ["--gem-hue" as string]: g.hue }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-foreground">{g.name}</span>
                    <span
                      className="block text-[0.65rem] uppercase tracking-widest"
                      style={{ color: g.hue }}
                    >
                      {g.element} · {g.resonance}%
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-5">
      <dt className="w-32 shrink-0 text-[0.65rem] uppercase tracking-[0.2em] text-primary">
        {k}
      </dt>
      <dd className="text-sm text-foreground">{v}</dd>
    </div>
  );
}
