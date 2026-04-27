// Lower Mainland cities — service area first, then alphabetized.
export const SERVICE_CITIES = ["Port Coquitlam", "Coquitlam"] as const;

export const OTHER_LOWER_MAINLAND_CITIES = [
  "Anmore", "Belcarra", "Bowen Island", "Burnaby", "Delta", "Langley City",
  "Langley Township", "Lions Bay", "Maple Ridge", "New Westminster",
  "North Vancouver", "Pitt Meadows", "Port Moody", "Richmond", "Surrey",
  "Vancouver", "West Vancouver", "White Rock",
] as const;

export const ALL_CITIES = [...SERVICE_CITIES, ...OTHER_LOWER_MAINLAND_CITIES] as const;
export type City = typeof ALL_CITIES[number];

export function isInServiceArea(city: string): boolean {
  return (SERVICE_CITIES as readonly string[]).includes(city);
}
