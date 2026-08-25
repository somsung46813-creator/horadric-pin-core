export type Element = "Fire" | "Water" | "Air" | "Earth";

export type RarityKey =
  | "common"
  | "uncommon"
  | "rare"
  | "sacred"
  | "singular";

export type RarityTier = {
  key: RarityKey;
  label: string;
  /** Concentric step cuts between table and girdle. */
  steps: number;
  /** 0-1 strength of the rainbow prism dispersion. */
  dispersion: number;
  /** Index lines cut across the crown. */
  indexLines: number;
  tierColor: string;
  note: string;
};

export const RARITY_TIERS: RarityTier[] = [
  {
    key: "common",
    label: "Common Relic",
    steps: 2,
    dispersion: 0.12,
    indexLines: 4,
    tierColor: "var(--rarity-common)",
    note: "Shallow table, two step cuts. Light exits before it splits.",
  },
  {
    key: "uncommon",
    label: "Uncommon Relic",
    steps: 3,
    dispersion: 0.3,
    indexLines: 4,
    tierColor: "var(--rarity-uncommon)",
    note: "Three concentric steps. Faint spectral fringe at the girdle.",
  },
  {
    key: "rare",
    label: "Rare Horadric Artifact",
    steps: 4,
    dispersion: 0.55,
    indexLines: 8,
    tierColor: "var(--rarity-rare)",
    note: "Eight-index crosses. Rainbow bands resolve across the crown.",
  },
  {
    key: "sacred",
    label: "Sacred Horadric Artifact",
    steps: 5,
    dispersion: 0.78,
    indexLines: 8,
    tierColor: "var(--rarity-sacred)",
    note: "Deep pyramid slope. Full-spectrum dispersion through every step.",
  },
  {
    key: "singular",
    label: "Singular — No Second Exists",
    steps: 6,
    dispersion: 1,
    indexLines: 16,
    tierColor: "var(--rarity-singular)",
    note: "Sixteen index grooves. The prism holds an unbroken rainbow.",
  },
];

export type Gem = {
  name: string;
  element: Element;
  hue: string;
  type: string;
  shape: string;
  color: string;
  dimension: string;
  weight: string;
  composition: string;
  properties: string;
  rarity: string;
  tier: RarityTier;
  resonance: number;
};

type Table = {
  hue: string;
  prefixes: string[];
  cores: string[];
  colors: string[];
  compositions: string[];
  properties: string[];
};

const TABLES: Record<Element, Table> = {
  Fire: {
    hue: "var(--elem-fire)",
    prefixes: ["Ember", "Cinder", "Pyre", "Scoria", "Forge"],
    cores: ["Ruby", "Topaz", "Carnelian", "Sunstone", "Garnet"],
    colors: ["Ancient Topaz / Ember Core", "Bleeding Ruby", "Molten Amber", "Ash Crimson"],
    compositions: ["Arcane Crystal, Imbued Flame", "Cindered Quartz, Horadric Essence", "Vitrified Ash, Ember Salt"],
    properties: [
      "Ignites bound runes on contact with steel",
      "Warms in the presence of the Horadric Staff",
      "Radiates heat proportional to the bearer's resolve",
    ],
  },
  Water: {
    hue: "var(--elem-water)",
    prefixes: ["Tide", "Brine", "Abyss", "Frost", "Mist"],
    cores: ["Sapphire", "Aquamarine", "Pearl", "Moonstone", "Beryl"],
    colors: ["Deep Tidal Blue", "Glacial Cyan", "Drowned Indigo", "Pale Seafoam"],
    compositions: ["Arcane Crystal, Bound Tidewater", "Frozen Essence, Salt Lattice", "Hollow Ice, Horadric Essence"],
    properties: [
      "Condenses moisture within a two-pace radius",
      "Stills flame when submerged in the Orifice Chamber",
      "Reflects passages that do not yet exist",
    ],
  },
  Air: {
    hue: "var(--elem-air)",
    prefixes: ["Zephyr", "Gale", "Hollow", "Whisper", "Cirrus"],
    cores: ["Citrine", "Quartz", "Opal", "Diamond", "Selenite"],
    colors: ["Pale Storm Gold", "Clouded Quartz", "Static White", "Faded Sun"],
    compositions: ["Arcane Crystal, Captured Gale", "Weightless Silica, Horadric Essence", "Thunder Glass, Ozone Vein"],
    properties: [
      "Weighs less than its measured mass suggests",
      "Hums at a pitch only the interpreter registers",
      "Drifts toward unsealed doorways",
    ],
  },
  Earth: {
    hue: "var(--elem-earth)",
    prefixes: ["Loam", "Bedrock", "Verdant", "Monolith", "Tomb"],
    cores: ["Emerald", "Jade", "Obsidian", "Malachite", "Onyx"],
    colors: ["Buried Emerald", "Tomb Jade", "Root Green", "Fossil Black"],
    compositions: ["Arcane Crystal, Petrified Root", "Grave Basalt, Horadric Essence", "Iron Vein, Bound Clay"],
    properties: [
      "Grows heavier atop consecrated ground",
      "Seals fissures it is pressed into",
      "Remembers every chamber it has passed through",
    ],
  },
};

const ELEMENTS: Element[] = ["Fire", "Water", "Air", "Earth"];

const SHAPES = [
  "Octagonal (8-Point Focus)",
  "Hexagonal (6-Point Focus)",
  "Trilliant (3-Point Focus)",
  "Cabochon (Unfaceted Core)",
  "Rhombic (4-Point Focus)",
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]!;
const range = (min: number, max: number, dp: number) =>
  (Math.random() * (max - min) + min).toFixed(dp);

export function forgeGem(): Gem {
  const element = pick(ELEMENTS);
  const t = TABLES[element];
  const rarityIndex = Math.floor(Math.random() ** 2 * RARITY_TIERS.length);
  const tier = RARITY_TIERS[rarityIndex]!;

  return {
    name: `${pick(t.prefixes)} ${pick(t.cores)}`,
    element,
    hue: t.hue,
    type: "Horadric Artifact",
    shape: pick(SHAPES),
    color: pick(t.colors),
    dimension: `~${range(1.4, 5.6, 1)} cm diameter`,
    weight: `~${range(9, 88, 1)} g`,
    composition: pick(t.compositions),
    properties: `${pick(t.properties)}. Reacts to the Horadric Staff.`,
    rarity: RARITIES[rarityIndex]!,
    resonance: Math.floor(Math.random() * 100) + 1,
  };
}
