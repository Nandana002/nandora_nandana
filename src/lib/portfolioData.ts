export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  year: string;
  client: string;
  tools: string[];
  gallery: string[];
};

export const categories = [
  "All",
  "Logos",
  "Posters",
  "Menu Cards",
  "Social Media",
  "Websites",
  "Branding",
  "Wedding Designs"
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Ethereal Essence",
    category: "Branding",
    image: "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671236/project_branding_1.jpg",
    description: "A luxury skincare brand identity focusing on minimalism and organic textures.",
    tags: ["Identity", "Minimal", "Packaging"],
    year: "2024",
    client: "Ethereal Skincare",
    tools: ["Illustrator", "Photoshop", "Figma"],
    gallery: [
      "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671236/project_branding_1_a.jpg",
      "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671236/project_branding_1_b.jpg"
    ]
  },
  {
    id: "2",
    title: "Vanguard Tech",
    category: "Websites",
    image: "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671237/project_web_1.jpg",
    description: "Futuristic interactive website for a deep-tech startup based in Singapore.",
    tags: ["Next.js", "GSAP", "Three.js"],
    year: "2023",
    client: "Vanguard Solutions",
    tools: ["Next.js", "Tailwind", "Framer Motion"],
    gallery: [
      "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671237/project_web_1_a.jpg"
    ]
  },
  {
    id: "3",
    title: "Royal Kerala",
    category: "Wedding Designs",
    image: "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671238/project_wedding_1.jpg",
    description: "Premium wedding invitation system inspired by traditional Kerala architecture.",
    tags: ["Illustration", "Print", "Luxury"],
    year: "2024",
    client: "Private Client",
    tools: ["Photoshop", "Illustrator"],
    gallery: [
      "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671238/project_wedding_1_a.jpg"
    ]
  },
  {
    id: "4",
    title: "Aura Coffee",
    category: "Menu Cards",
    image: "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671239/project_menu_1.jpg",
    description: "Modern minimalist menu design for a high-end specialty coffee roastery.",
    tags: ["Typography", "Layout", "Print"],
    year: "2023",
    client: "Aura Brews",
    tools: ["Indesign", "Illustrator"],
    gallery: [
      "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671239/project_menu_1_a.jpg"
    ]
  },
  {
    id: "5",
    title: "Cosmic Beats",
    category: "Posters",
    image: "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671240/project_poster_1.jpg",
    description: "Experimental poster series for an underground electronic music festival.",
    tags: ["Experimental", "Glow", "Poster"],
    year: "2024",
    client: "Moonlight Events",
    tools: ["Photoshop", "After Effects"],
    gallery: [
      "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671240/project_poster_1_a.jpg"
    ]
  },
  {
    id: "6",
    title: "Zenith Logo",
    category: "Logos",
    image: "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671241/project_logo_1.jpg",
    description: "Abstract geometric logo design for a premium watchmaker brand.",
    tags: ["Logo", "Minimal", "Vector"],
    year: "2023",
    client: "Zenith Watches",
    tools: ["Illustrator"],
    gallery: [
      "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671241/project_logo_1_a.jpg"
    ]
  }
];
