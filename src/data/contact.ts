export const contact = {
  name: "Rakhi Agrawal",
  initials: "RA",
  role: "Software Engineer",
  location: "Toronto, ON",
  email: "rakhiagr2020@gmail.com",
  // About-section headshot. Set to null to fall back to the RA monogram.
  photoHref: "/rakhi.png" as string | null,
  // Fine-tuning for portrait cropping and palette treatment.
  photo: {
    // object-position (percent) — tuned so face lands in the circular crop.
    focusY: 26,
    // Palette treatments to preview.
    warmDuotone: true,
  },
  socials: [
    {
      label: "LinkedIn",
      handle: "rakhi-agr",
      href: "https://www.linkedin.com/in/rakhi-agr/",
    },
    {
      label: "GitHub",
      handle: "rakhiagr",
      href: "https://github.com/rakhiagr",
    },
    {
      label: "Instagram",
      handle: "agrawal.rakhi",
      href: "https://www.instagram.com/agrawal.rakhi/",
    },
  ],
  resumeHref: "/resume.pdf",
};
