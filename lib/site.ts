export const SITE = {
  name: "Crystal Coat Mobile Auto Spa",
  shortName: "Crystal Coat Mobile",
  tagline: "Professional mobile detailing — we come to you",
  description:
    "Premium mobile auto detailing in Port Coquitlam and Coquitlam, BC. Hand wash, full interior steam clean, paint sealant, and more — booked in minutes, done at your driveway.",
  url: "http://localhost:3000", // swap to production domain when purchased
  ogImage: "/og-image.jpg",
  founded: 2025,
  serviceAreas: ["Port Coquitlam", "Coquitlam"] as const,
  expansionNote: "Expanding across the Lower Mainland soon.",
  contact: {
    primaryPhone: { name: "Luc", number: "236-878-9312", tel: "+12368789312" },
    secondaryPhone: { name: "Sam", number: "604-788-3116", tel: "+16047883116" },
    primaryEmail: "crystalcoatmobile@gmail.com",
    personalEmail: "lucalatay@gmail.com",
  },
  hours: {
    // 24h format. null = closed.
    monday:    { open: "16:00", close: "22:00" },
    tuesday:   { open: "16:00", close: "22:00" },
    wednesday: null,
    thursday:  null,
    friday:    { open: "16:00", close: "22:00" },
    saturday:  { open: "09:00", close: "22:00" },
    sunday:    { open: "09:00", close: "22:00" },
  },
  hoursDisplay: [
    "Monday, Tuesday, Friday — 4:00 PM to 10:00 PM",
    "Saturday, Sunday — 9:00 AM to 10:00 PM",
    "Wednesday, Thursday — Closed",
  ],
  social: {
    instagram: "https://instagram.com/crystalcoatmobile",
    tiktok: "https://tiktok.com/@crystalcoatmobile",
  },
  city: "Port Coquitlam",
  region: "British Columbia",
  regionCode: "BC",
  country: "Canada",
  countryCode: "CA",
} as const;
