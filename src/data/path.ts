export type PathStop = {
  id: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  /** Optional — Patna has no explicit date range (it's the origin). */
  start?: string;
  /** Optional — Patna has no end. */
  end?: string | "Present";
  /** Short one-line micro-copy shown alongside the pin and in the timeline. */
  context: string;
};

// Chronological journey. Patna is the origin; every other stop has a date range.
export const stops: PathStop[] = [
  {
    id: "patna",
    city: "Patna",
    region: "Bihar",
    country: "India",
    countryCode: "IN",
    lat: 25.61,
    lng: 85.14,
    context: "Where it started",
  },
  {
    id: "pilani",
    city: "Pilani",
    region: "Rajasthan",
    country: "India",
    countryCode: "IN",
    lat: 28.36,
    lng: 75.6,
    start: "2015-08",
    end: "2019-05",
    context: "Where the path took shape",
  },
  {
    id: "pune",
    city: "Pune",
    region: "Maharashtra",
    country: "India",
    countryCode: "IN",
    lat: 18.52,
    lng: 73.86,
    start: "2018-05",
    end: "2018-08",
    context: "First time building software professionally",
  },
  {
    id: "delhi",
    city: "Delhi",
    region: "Delhi NCR",
    country: "India",
    countryCode: "IN",
    lat: 28.61,
    lng: 77.21,
    start: "2020-08",
    end: "2020-12",
    context: "Backend engineering · Inspectinity",
  },
  {
    id: "tempe",
    city: "Tempe",
    region: "Arizona",
    country: "United States",
    countryCode: "US",
    lat: 33.42,
    lng: -111.94,
    start: "2021-01",
    end: "2022-12",
    context: "M.S. Computer Science · Arizona State",
  },
  {
    id: "bay-area",
    city: "Mountain View",
    region: "California",
    country: "United States",
    countryCode: "US",
    lat: 37.39,
    lng: -122.08,
    start: "2023-01",
    end: "2026-01",
    context: "LinkedIn · distributed systems at scale",
  },
  {
    id: "toronto",
    city: "Toronto",
    region: "Ontario",
    country: "Canada",
    countryCode: "CA",
    lat: 43.65,
    lng: -79.38,
    start: "2026-01",
    end: "Present",
    context: "The current node",
  },
];

export type PathPhoto = {
  src: string;
  alt: string;
  caption: string;
  kind: "place" | "moment" | "aesthetic";
  href: string;
};

export const pathPhotos: PathPhoto[] = [];
