export type VehicleType = "sedan" | "suv" | "truck";

export type Package = {
  slug: "express-clean" | "full-detail" | "premium-detail";
  name: string;
  startingPrice: number;
  popular?: boolean;
  tagline: string;
  description: string;
  features: { title: string; detail: string }[];
  pricing: Record<VehicleType, number>;
  durationHours: [number, number]; // min, max
};

export const PACKAGES: Package[] = [
  {
    slug: "express-clean",
    name: "Express Clean",
    startingPrice: 79,
    tagline: "A quick refresh designed to maintain your vehicle's cleanliness between deeper details.",
    description: "Perfect for staying on top of regular upkeep between full details.",
    features: [
      { title: "Hand wash & dry", detail: "Safe exterior wash to remove dirt and grime without damaging the paint." },
      { title: "Wheels + tire shine", detail: "Removes brake dust and restores a clean, glossy finish." },
      { title: "Full interior vacuum", detail: "Deep vacuuming using specialized tools, including carpets, seats, and tight spaces." },
      { title: "Surface wipe down", detail: "Cleans high-touch interior areas like dash and panels." },
      { title: "Streak-free windows", detail: "Leaves all glass crystal clear." },
    ],
    pricing: { sedan: 79, suv: 99, truck: 119 },
    durationHours: [1.5, 2.5],
  },
  {
    slug: "full-detail",
    name: "Full Detail",
    startingPrice: 149,
    popular: true,
    tagline: "A complete interior and exterior reset to bring your vehicle back to life.",
    description: "Our most popular package. Perfect for bringing your car back to life.",
    features: [
      { title: "Foam soap & prewash", detail: "Breaks down dirt safely before contact washing to reduce scratches." },
      { title: "Full interior vacuum", detail: "Deep vacuuming using specialized tools across all interior areas." },
      { title: "Dash, panels & surfaces cleaned", detail: "Removes buildup and restores a clean interior look." },
      { title: "Steam clean", detail: "Vents, cracks, and cupholders — targets tight areas for deep cleaning and sanitation." },
      { title: "Hand wash & dry", detail: "Safe exterior contact wash with premium microfiber." },
      { title: "Wheels + tire shine", detail: "Removes brake dust and restores a clean, glossy finish." },
      { title: "Streak-free windows", detail: "All glass crystal clear inside and out." },
    ],
    pricing: { sedan: 149, suv: 179, truck: 199 },
    durationHours: [2.5, 3.5],
  },
  {
    slug: "premium-detail",
    name: "Premium Detail",
    startingPrice: 279,
    tagline: "A full deep-clean and protection package for a like-new finish.",
    description: "Everything in Full Detail, plus deep sanitation, shampoo, leather care, clay bar, and paint sealant. Stays protected for 1–2 months.",
    features: [
      { title: "Everything in Full Detail", detail: "All exterior and interior services from our Full Detail package." },
      { title: "Full interior steam sanitation", detail: "Deep interior cleaning and sanitizing for a fresh, reset feel." },
      { title: "Deep carpet & seat shampoo", detail: "Removes stains, dirt, and buildup from upholstery and carpets." },
      { title: "Leather conditioning", detail: "Restores and protects leather to prevent wear and cracking." },
      { title: "Clay bar treatment", detail: "Removes embedded contaminants for a smooth, polished surface." },
      { title: "Paint sealant protection", detail: "Hydrophobic layer that repels water, enhances shine, and protects your paint. Stays protected 1–2 months." },
    ],
    pricing: { sedan: 279, suv: 309, truck: 339 },
    durationHours: [3, 4],
  },
];

export const ADD_ONS = [
  { slug: "engine-bay",       name: "Engine Bay Detail",       startingPrice: 40, description: "Safely cleans the engine bay for a fresh, detailed look." },
  { slug: "odor-removal",     name: "Odor Removal",            startingPrice: 20, description: "Eliminates unwanted smells at the source, not just covering them." },
  { slug: "pet-hair",         name: "Pet Hair Removal",        startingPrice: 35, description: "Removes stubborn pet hair from carpets, seats, and tight areas." },
  { slug: "clay-bar",         name: "Clay Bar Treatment",      startingPrice: 60, description: "Extra paint decontamination for a smoother finish." },
  { slug: "paint-sealant",    name: "Paint Sealant Protection", startingPrice: 60, description: "Hydrophobic protective layer that repels water, enhances shine, and keeps your car cleaner longer." },
  { slug: "undercarriage",    name: "Undercarriage Rinse",     startingPrice: 20, description: "Rinses underneath the vehicle to remove dirt, salt, and buildup." },
] as const;

export const VEHICLE_LABELS: Record<VehicleType, string> = {
  sedan: "Sedan / Coupe",
  suv: "SUV / Crossover",
  truck: "Truck / 3-Row",
};
