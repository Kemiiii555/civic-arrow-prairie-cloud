/**
 * All copy & media for the surprise.
 * Swap names, letter, wishes, photos here when you have the final versions.
 */

export const NAME = "Esha Fatima";
export const SHORT_NAME = "Esha";
export const AGE = 17;

export const PASSKEY_HINT = "The current year";

export function currentPasskey() {
  return String(new Date().getFullYear());
}

export const LETTER = {
  greeting: `Dear ${SHORT_NAME},`,
  body: `Seventeen looks beautiful on you. This birthday isn't just another number, it's the opening page of a chapter you've already started writing in your own quiet, determined way. Every plan you've mapped out, every skill you've been building late into the night, every dream you refuse to let go of, it's all leading somewhere, and today is proof of how far you've come.

May this year meet your effort with opportunity, your patience with reward, and your heart with exactly the peace and privacy it deserves. Here's to you, ${NAME}, thoughtful, driven, and only just getting started.`,
  signOff: "With love, always",
};

export const HERO = {
  title: `Happy ${AGE}th Birthday!`,
  urdu: `Saalgirah mubarak ho, meri pyaari ${SHORT_NAME}`,
};

export const WISHES: { icon: "cake" | "spark" | "book" | "star" | "shield" | "bloom"; text: string }[] = [
  {
    icon: "cake",
    text: `May every candle you blow out light up a new blessing in your life, ${SHORT_NAME}.`,
  },
  {
    icon: "spark",
    text: `${AGE} looks amazing on you. Here's to bigger dreams, bolder plans, and even bigger wins.`,
  },
  {
    icon: "book",
    text: "May every page you fill, in your journals and in your life, bring you closer to who you're becoming.",
  },
  {
    icon: "star",
    text: "This is just the beginning. Go chase everything you've been quietly working toward.",
  },
  {
    icon: "shield",
    text: "Stay steady, stay guarded where you need to be, and keep shining exactly the way you do.",
  },
  {
    icon: "bloom",
    text: "Wishing you a year filled with success, calm, and the space to be entirely yourself.",
  },
];

export const BALLOON_LINES = ["YOU ARE AMAZING", "ESHA!"];

export const HIDDEN_NOTE = `You made it to ${AGE}, ${SHORT_NAME}. Every quiet late night, every plan, every version of yourself you've worked to become, it all counts. This is your year to be bold, guard your peace, and chase every dream on your own terms.`;

export type Photo = {
  src: string;
  caption: string;
  focus?: string;
};

export const PHOTOS: Photo[] = [
  { src: "/assets/photo-1.jpg", caption: "That soft, easy smile" },
  { src: "/assets/photo-2.jpg", caption: "Golden hour, your room, your world" },
  { src: "/assets/photo-3.jpg", caption: "Mirror moments worth keeping" },
  { src: "/assets/photo-4.jpg", caption: "Dressed up, glowing, unforgettable" },
  { src: "/assets/photo-5.jpg", caption: "Eyes that tell the whole story", focus: "center 70%" },
  { src: "/assets/photo-6.jpg", caption: "Magenta, gold, and that glow" },
  { src: "/assets/photo-7.jpg", caption: "I don't care — and it suits you" },
  { src: "/assets/photo-8.jpg", caption: "Fuzzy hat, film grain, unforgettable" },
];

export const LAST_THING = `No matter where the next few years take you, near or far, remember how loved and valued you are. Seventeen is just a number. What truly matters is the heart you carry, the discipline you've built, and the dreams you keep chasing quietly and on your own terms. Thank you for being exactly who you are. Here's to celebrating you, today and always.`;

export const CELEBRATE = {
  kicker: `${AGE} & Unstoppable`,
  body: `Today marks a new beginning, ${SHORT_NAME}. Step into this year with confidence, chase your goals fearlessly, and know that the best is still ahead of you. Happy ${AGE}th Birthday, once again! Enjoy your special day to the fullest.`,
};

export const ENDING = `Thank you for going through this little surprise, ${SHORT_NAME}. Hope it brought a smile to your face. Happy ${AGE}th Birthday, once again!`;
