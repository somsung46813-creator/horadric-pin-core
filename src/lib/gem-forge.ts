export type Element = "Fire" | "Water" | "Air" | "Earth";

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

const RARITIES = [
  "Common Relic",
  "Uncommon Relic",
  "Rare Horadric Artifact",
  "Sacred Horadric Artifact",
  "Singular — No Second Exists",
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]!;
const range = (min: number, max: number, dp: number) =>
  (Math.random() * (max - min) + min).toFixed(dp);

export function forgeGem(): Gem {
  const element = pick(ELEMENTS);
  const t = TABLES[element];
  const rarityIndex = Math.floor(Math.random() ** 2 * RARITIES.length);

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
