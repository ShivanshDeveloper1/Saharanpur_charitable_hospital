// lib/site.ts  – ONE place for your business details.

export const SITE = {
  name: "Saharanpur Charitable Hospital",
  url: "https://www.yourdomain.com",
  phone: "+917618550475", // used in tel: links
  phoneDisplay: "+91 7618550475",
  email: "info@yourdomain.com",
  address: {
    street: "Your street address",
    locality: "Saharanpur",
    region: "Uttar Pradesh",
    postalCode: "247001",
    country: "IN",
  },
  // Right-click your hospital on Google Maps to copy the exact coordinates
  geo: { lat: 29.964, lng: 77.546 },
  social: [] as string[], // Facebook, Instagram, YouTube, Google Maps profile URLs
};