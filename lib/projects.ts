import blueRiverSign from "@/assets/blue-river-sign.jpg";
import brlcBrandBoard from "@/assets/brlc-brand-board.png";
import brlcPhoneMockup from "@/assets/brlc-phone-mockup.png";
import smileBunnyPhones from "@/assets/smile-bunny-phones.png";
import smileBunnyWebsite from "@/assets/smile-bunny-website.png";
import smileBunnyResources from "@/assets/smile-bunny-resources.png";
import smileBunnyGacha from "@/assets/smile-bunny-gacha.png";
import smileBunnyIcon from "@/assets/smile-bunny-icon.png";
import cinnamonrollDieline from "@/assets/cinnamonroll-package.png";
import coverBlueRiver from "@/assets/projects/cover-blue-river.jpg";
import blueRiverPhoneHand from "@/assets/projects/blue-river-phone-hand.jpg";
import blueRiverSticker from "@/assets/projects/blue-river-sticker.jpg";
import coverGoodDropouts from "@/assets/projects/cover-good-dropouts.jpg";
import gdCollage from "@/assets/projects/good-dropouts-collage.jpg";
import gdPosterSocials from "@/assets/projects/good-dropouts-poster-socials.jpg";
import gdPosterBand from "@/assets/projects/good-dropouts-poster-band.jpg";
import coverTchp from "@/assets/projects/cover-tchp.jpg";
import tchpBoard from "@/assets/projects/tchp-brand-board.jpg";
import tchpDieline from "@/assets/projects/tchp-dieline.jpg";
import tchpContainers from "@/assets/projects/tchp-containers.jpg";
import tchpBrown from "@/assets/projects/tchp-render-brown.jpg";
import tchpDark from "@/assets/projects/tchp-render-dark.jpg";
import coverKizingo from "@/assets/projects/cover-kizingo.jpg";
import kizingoRenders from "@/assets/projects/kizingo-renders.jpg";
import kizingoBlueprint from "@/assets/projects/kizingo-blueprint.png";
import coverLilies from "@/assets/projects/cover-lilies.jpg";
import liliesPair from "@/assets/projects/lilies-package-pair.jpg";
import liliesViews from "@/assets/projects/lilies-package-views.jpg";
import coverPhotoshoot from "@/assets/projects/cover-photoshoot.jpg";
import ps1 from "@/assets/projects/photoshoot-06123.jpg";
import ps2 from "@/assets/projects/photoshoot-05895.jpg";
import ps3 from "@/assets/projects/photoshoot-06168.jpg";
import ps4 from "@/assets/projects/photoshoot-05778.jpg";
import ps5 from "@/assets/projects/photoshoot-06118.jpg";
import ps6 from "@/assets/projects/photoshoot-06048.jpg";
import ps7 from "@/assets/projects/photoshoot-06076.jpg";
import ps8 from "@/assets/projects/photoshoot-05767.jpg";
import coverYoutube from "@/assets/projects/cover-youtube.jpg";
import youtubeChannel from "@/assets/projects/youtube-channel.jpg";

// ---------------------------------------------------------------------------
// YouTube video IDs (the part after /embed/ in each embed link).
// If a video shows up in the wrong project, just swap the IDs here.
// ---------------------------------------------------------------------------
const GOOD_DROPOUTS_VIDEO = "oZSjOu2HBJ4";
const VLOG_1 = "g9Wc6c8PPC0";
const VLOG_2 = "hQpBm6W9VmA";
const VLOG_3 = "fl2NLHorHV4";
const VLOG_4 = "OsYYnQ74TSQ";

export type MediaItem =
  | { kind: "image"; src: string; alt: string; narrow?: boolean; href?: string }
  | { kind: "video"; id: string; title: string };

export type Project = {
  slug: string;
  title: string;
  period: string;
  category: string;
  blurb: string;
  /** Header colour for the project page, taken from the project's own palette and softened */
  color: string;
  cover: string;
  coverAlt: string;
  ratio: string;
  tilt: string;
  place: string;
  body: string[];
  /** How many media items go in each row, top to bottom, e.g. [2, 3]. Items in a row are scaled to the same height, so there are no gaps. */
  rows: number[];
  /** Optional buttons shown under the overview, e.g. a link to a channel */
  links?: { label: string; href: string }[];
  media: MediaItem[];
};

export const PROJECTS: Project[] = [
  {
    slug: "blue-river",
    title: "Blue River Learning Center",
    period: "Summer 2026",
    category: "Social Media & Brand Identity",
    blurb: "Social media and a brand refresh for a tutoring and professional learning center.",
    color: "oklch(0.74 0.04 240)",
    cover: coverBlueRiver,
    coverAlt: "Hands placing a Blue River sticker",
    ratio: "aspect-[4/5]",
    tilt: "group-hover:rotate-[-2.5deg] group-focus-visible:rotate-[-2.5deg]",
    place: "lg:col-span-3 lg:col-start-1 lg:row-span-4 lg:row-start-2",
    body: [
      "Blue River Learning Center is a tutoring and professional help business located in Fredericksburg, VA. They have a focus in tutoring individuals who wish to become BCBAs and work to help children with special needs.",
      "In the summer of 2026 I was the Social Media Marketing Intern, and was in charge of creating a company Instagram as well as designing a suitable rebrand for the brand's identity and image.",
    ],
    rows: [2, 3],
    media: [
      { kind: "image", src: blueRiverSign, alt: "Blue River sign mockup on a wall" },
      { kind: "image", src: brlcBrandBoard, alt: "Blue River brand board" },
      { kind: "image", src: brlcPhoneMockup, alt: "Blue River Instagram profile on a phone" },
      { kind: "image", src: blueRiverPhoneHand, alt: "Hand holding a phone showing a Blue River Instagram post" },
      { kind: "image", src: blueRiverSticker, alt: "Hands placing a Blue River sticker" },
    ],
  },
  {
    slug: "good-dropouts",
    title: "The Good Dropouts Promo",
    period: "Freshman 2024",
    category: "Music Promotion",
    blurb: "Promotional posters, photos and a video for a Blacksburg band.",
    color: "oklch(0.8 0.09 55)",
    cover: coverGoodDropouts,
    coverAlt: "Collage of Good Dropouts live performance photos",
    ratio: "aspect-[4/5]",
    tilt: "group-hover:rotate-[1.8deg] group-focus-visible:rotate-[1.8deg]",
    place: "lg:col-span-3 lg:col-start-4 lg:row-span-4 lg:row-start-1",
    body: [
      "In my first semester of college I was enrolled in a class called Visual Communication Strategies, where I learned how to use Adobe Illustrator. For this class I advertised the Blacksburg local band, Good Dropouts.",
      "My partner Mia Zimmitti and I took and edited photos, and created promotional posters and a video for the band. This page features my personal photos, our collaborative posters and the video.",
    ],
    rows: [2, 2],
    media: [
      { kind: "video", id: GOOD_DROPOUTS_VIDEO, title: "Good Dropouts promo video" },
      { kind: "image", src: gdCollage, alt: "Collage of Good Dropouts live performance photos" },
      { kind: "image", src: gdPosterSocials, alt: "Good Dropouts poster with their social links" },
      { kind: "image", src: gdPosterBand, alt: "Poster reading Blacksburg's Favorite Band" },
    ],
  },
  {
    slug: "smile-bunny",
    title: "Smile Bunny App Design",
    period: "Highschool 2024",
    category: "App Design",
    blurb: "A fictional, hand-drawn app designed to help boost serotonin.",
    color: "oklch(0.8 0.06 275)",
    cover: smileBunnyPhones,
    coverAlt: "Smile Bunny app screens on phones",
    ratio: "aspect-[4/5]",
    tilt: "group-hover:rotate-[-1.5deg] group-focus-visible:rotate-[-1.5deg]",
    place: "lg:col-span-3 lg:col-start-4 lg:row-span-4 lg:row-start-5",
    body: [
      "This is a fictional app based on a research project with the question \u201CHow can you naturally and costlessly better the mindset of a suicidal teen, specifically by treating depression?\u201D",
      "In junior and senior year of high school, I created a mock app called Smile Bunny. All of the app's features are meant to help boost serotonin.",
    ],
    rows: [2, 3],
    media: [
      { kind: "image", src: smileBunnyPhones, alt: "Smile Bunny app design on phones" },
      { kind: "image", src: smileBunnyResources, alt: "Smile Bunny resources screen" },
      {
        kind: "image",
        src: smileBunnyWebsite,
        alt: "The Smile Bunny website on a laptop. Click to open the website.",
        href: "https://sites.google.com/view/thesmilebunnyproject/home",
      },
      { kind: "image", src: smileBunnyGacha, alt: "Smile Bunny reward screen with collectible bunnies" },
      { kind: "image", src: smileBunnyIcon, alt: "Smile Bunny app icon" },
    ],
  },
  {
    slug: "tchp-base-boom",
    title: "Base Boom Packaging",
    period: "Sophomore 2026",
    category: "Packaging Design",
    blurb: "Retro boombox packaging for an all-in-one makeup base from the fictional brand tchp.",
    color: "oklch(0.8 0.05 170)",
    cover: coverTchp,
    coverAlt: "Open Base Boom boombox-shaped package on a brown background",
    ratio: "aspect-[4/5]",
    tilt: "group-hover:rotate-[2.2deg] group-focus-visible:rotate-[2.2deg]",
    place: "lg:col-span-3 lg:col-start-7 lg:row-span-4 lg:row-start-3",
    body: [
      "tchp. (read \u201Ctouch up\u201D) is a fictional cosmetics company that aims to make makeup easily transportable. Perfect for busy women who are away from home for long hours.",
      "Base Boom is a tchp. product that includes foundation, concealer, and powder in one. The purpose of the product is to allow consumers to have all items needed for a basic \u201Cmakeup base.\u201D This brand aims to create a distinct image as an efficient and trendy brand for young professionals.",
    ],
    rows: [2, 1, 2],
    media: [
      { kind: "image", src: tchpBoard, alt: "tchp. brand board with logo, colors and fonts" },
      { kind: "image", src: tchpContainers, alt: "Pink tchp. compact containers" },
      { kind: "image", src: tchpDieline, alt: "Flat dieline artwork for the Base Boom carton" },
      { kind: "image", src: tchpBrown, alt: "Base Boom carton opened, on a brown background" },
      { kind: "image", src: tchpDark, alt: "Back of the Base Boom carton on a dark background" },
    ],
  },
  {
    slug: "kizingo",
    title: "Kizingo Package",
    period: "Sophomore 2026",
    category: "Packaging Design",
    blurb: "A storybook-style box for a kids' spoon and bowl set that won most creative design.",
    color: "oklch(0.82 0.04 215)",
    cover: coverKizingo,
    coverAlt: "Kizingo spoon and bowl set box",
    ratio: "aspect-[4/5]",
    tilt: "group-hover:rotate-[-2deg] group-focus-visible:rotate-[-2deg]",
    place: "lg:col-span-3 lg:col-start-1 lg:row-span-5 lg:row-start-6",
    body: [
      "This is a fictional package design for a real company, Kizingo. Kizingo is a kids nutrition company that produces specialized eating utensils and bowls to encourage comfortable eating.",
      "For this project we were meant to create the inner product holder as well as the outer box. I created a box that doubled as a story book, and won most creative design.",
    ],
    rows: [1, 1],
    media: [
      { kind: "image", src: kizingoRenders, alt: "Kizingo spoon and bowl set package, shown closed and open as a storybook box" },
      { kind: "image", src: kizingoBlueprint, alt: "Dieline blueprint for the Kizingo package" },
    ],
  },
  {
    slug: "lilies-bakery-candle",
    title: "Lilie's Bakery Candle Package",
    period: "Sophomore 2025",
    category: "Packaging Design",
    blurb: "A cinnamon roll themed vanilla candle package for the fictional Lilie's Bakery.",
    color: "oklch(0.66 0.07 15)",
    cover: coverLilies,
    coverAlt: "Hexagon Lilie's Bakery vanilla candle package",
    ratio: "aspect-[4/5]",
    tilt: "group-hover:rotate-[1.5deg] group-focus-visible:rotate-[1.5deg]",
    place: "lg:col-span-3 lg:col-start-7 lg:row-span-4 lg:row-start-7",
    body: [
      "Lilie's Bakery is a fictional brand that was created as a packaging design intro project. We were tasked to redesign a Dollar Tree candle set.",
      "I chose to create a cinnamon roll themed vanilla candle package. I used ArtiosCAD to create the box and the inner lining that would hold the candles in place.",
    ],
    rows: [1, 1, 1],
    media: [
      { kind: "image", src: liliesPair, alt: "Lilie's Bakery hexagon candle package, closed and opened to show the tea candles" },
      { kind: "image", src: liliesViews, alt: "Three views of the Lilie's Bakery vanilla candle package", narrow: true },
      { kind: "image", src: cinnamonrollDieline, alt: "ArtiosCAD blueprint for the candle package" },
    ],
  },
  {
    slug: "personal-photoshoot",
    title: "Personal Photoshoot",
    period: "Summer 2026",
    category: "Photography",
    blurb: "My first photoshoot, shot and directed by me: a vintage doll inspired editorial look.",
    color: "oklch(0.78 0.07 135)",
    cover: coverPhotoshoot,
    coverAlt: "Two models resting their heads together on the grass",
    ratio: "aspect-[4/5]",
    tilt: "group-hover:rotate-[-1.8deg] group-focus-visible:rotate-[-1.8deg]",
    place: "lg:col-span-3 lg:col-start-10 lg:row-span-5 lg:row-start-1",
    body: [
      "This is my first photoshoot, shot and directed by me. The idea was a vintage doll inspired editorial look.",
    ],
    rows: [4, 4],
    media: [
      { kind: "image", src: ps1, alt: "Two models standing together in white outfits" },
      { kind: "image", src: ps2, alt: "Model in profile holding pale pink roses" },
      { kind: "image", src: ps3, alt: "Two models close together looking at the camera" },
      { kind: "image", src: ps4, alt: "Model resting beside a lilac plush bunny, seen from behind" },
      { kind: "image", src: ps5, alt: "Two models photographed from above on the grass" },
      { kind: "image", src: ps6, alt: "Two models leaning their heads together among the trees" },
      { kind: "image", src: ps7, alt: "Two models posing side by side in a garden" },
      { kind: "image", src: ps8, alt: "Close-up of a model resting her head on a lilac plush bunny" },
    ],
  },
  {
    slug: "longform-youtube",
    title: "Longform Personal YouTube",
    period: "Highschool 2023\u20132024",
    category: "Video & Editing",
    blurb: "Vlogs shot, edited and captioned by me, from first day of school to graduation.",
    color: "oklch(0.84 0.06 5)",
    cover: coverYoutube,
    coverAlt: "Ayami's YouTube channel page",
    ratio: "aspect-[4/5]",
    tilt: "group-hover:rotate-[2.5deg] group-focus-visible:rotate-[2.5deg]",
    place: "lg:col-span-3 lg:col-start-10 lg:row-span-4 lg:row-start-6",
    body: [
      "I have always had an interest in creating videos. I grew up on apps such as YouTube and Musical.ly, and I was always in awe of the influencers I saw, which eventually inspired me to create my own videos and YouTube channel.",
      "In the summer of 2023 I began vlogging my life on YouTube. I wanted to give people an insight into what I like to think is the very relatable life of a teenage girl. The themes ranged from the first day of school, to prom, to beach week, all of which were shot, edited, and captioned by me.",
    ],
    rows: [1, 2, 2],
    links: [{ label: "Visit my YouTube channel", href: "https://www.youtube.com/@lovelilie" }],
    media: [
      { kind: "image", src: youtubeChannel, alt: "My YouTube channel page", narrow: true },
      { kind: "video", id: VLOG_1, title: "Vlog 1" },
      { kind: "video", id: VLOG_2, title: "Vlog 2" },
      { kind: "video", id: VLOG_3, title: "Vlog 3" },
      { kind: "video", id: VLOG_4, title: "Vlog 4" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
