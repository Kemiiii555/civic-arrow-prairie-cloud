import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Cake, Flower2, Heart, Mail, PartyPopper, Shield, Sparkles, Star } from "lucide-react";
import { AGE, CELEBRATE, HERO, LAST_THING, LETTER, SHORT_NAME, WISHES } from "@/lib/content";
import { useSurprise } from "@/store/surprise";
import { DisplayTitle, GoldButton, SceneFrame } from "./chrome";
import { cn } from "@/lib/utils";

const WISH_ICONS = {
  cake: Cake,
  spark: Sparkles,
  book: BookOpen,
  star: Star,
  shield: Shield,
  bloom: Flower2,
} as const;

export function HeroScene() {
  const go = useSurprise((s) => s.go);
  return (
    <SceneFrame>
      <div className="title-row">
        <PartyPopper className="size-7 text-gold" />
        <DisplayTitle className="italic">{HERO.title}</DisplayTitle>
        <PartyPopper className="size-7 text-gold" />
      </div>
      <div className="script-logo mt-5 sm:mt-8">
        <span>Happy</span>
        <span>Birthday</span>
      </div>
      <p className="mt-6 font-display text-lg text-cream sm:mt-10 sm:text-2xl">{SHORT_NAME}!</p>
      <p className="mt-2 text-sm italic text-muted">{HERO.urdu}</p>
      <GoldButton icon={Mail} trailing={ArrowRight} className="mt-8" onClick={() => go("letter")}>
        Open your letter
      </GoldButton>
    </SceneFrame>
  );
}

export function LetterScene() {
  const go = useSurprise((s) => s.go);
  const [shown, setShown] = useState(0);
  const text = LETTER.body;
  const done = shown >= text.length;

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(() => setShown((n) => n + 1), 16);
    return () => window.clearTimeout(t);
  }, [done, shown]);

  return (
    <SceneFrame>
      <DisplayTitle className="italic">A Letter for You</DisplayTitle>
      <button
        type="button"
        className="panel relative mt-6 w-full max-w-xl px-5 py-6 text-left sm:mt-8 sm:px-7 sm:py-8"
        onClick={() => setShown(text.length)}
        aria-label="Birthday letter"
      >
        <span className="absolute top-0 left-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-warm">
          <Heart className="size-3.5 text-gold" fill="currentColor" />
        </span>
        <p className="font-display text-base text-gold italic">{LETTER.greeting}</p>
        <p className="mt-4 whitespace-pre-wrap text-[0.98rem] leading-relaxed text-cream">
          {text.slice(0, shown)}
          {!done ? <span className="caret" /> : null}
        </p>
        <p className="mt-6 text-right font-display text-sm italic text-gold">{LETTER.signOff}</p>
      </button>
      {done ? (
        <GoldButton icon={Cake} trailing={ArrowRight} className="mt-8" onClick={() => go("cake")}>
          Continue to the cake
        </GoldButton>
      ) : null}
    </SceneFrame>
  );
}

export function CakeScene() {
  const go = useSurprise((s) => s.go);
  const setConfetti = useSurprise((s) => s.setConfetti);
  const [blown, setBlown] = useState(false);

  const blow = () => {
    if (blown) return;
    setBlown(true);
    setConfetti(true);
  };

  return (
    <SceneFrame>
      <div className="title-row">
        <Cake className="size-7 text-gold" />
        <DisplayTitle>Make a Wish, {SHORT_NAME}</DisplayTitle>
        <Cake className="size-7 text-gold" />
      </div>
      <img src="/assets/bears.png" alt="" className="mt-4 h-20 w-auto sm:mt-6 sm:h-32" />
      <div className={cn("cake-visual mt-2", blown && "is-blown")} aria-hidden="true">
        <div className="candles">
          {Array.from({ length: 7 }).map((_, i) => (
            <span className="candle" key={i}>
              <span className="flame" style={{ animationDelay: `${i * 90}ms` }} />
            </span>
          ))}
        </div>
        <div className="cake-tier top">
          <span className="cake-band" />
          <span className="cake-pearls" />
        </div>
        <div className="cake-tier mid">
          <span className="cake-band" />
          <span className="cake-pearls" />
        </div>
        <div className="cake-tier bot">
          <span className="cake-band" />
          <span className="cake-pearls" />
        </div>
      </div>
      {!blown ? (
        <GoldButton className="mt-8" onClick={blow}>
          Blow the candles & make a wish
        </GoldButton>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="gold-btn pointer-events-none opacity-80">Wish made!</p>
          <p className="text-sm text-gold-bright">Your wish has been sent to the universe!</p>
          <GoldButton trailing={ArrowRight} onClick={() => go("wishes")}>
            See your birthday wishes
          </GoldButton>
        </div>
      )}
      <p className="mt-6 font-display text-[0.65rem] tracking-[0.28em] text-muted">
        HAPPY {AGE}TH, {SHORT_NAME.toUpperCase()}
      </p>
    </SceneFrame>
  );
}

export function WishesScene() {
  const go = useSurprise((s) => s.go);
  return (
    <SceneFrame>
      <DisplayTitle className="mb-5 px-2 sm:mb-8">Birthday Wishes for You</DisplayTitle>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {WISHES.map((wish) => {
          const Icon = WISH_ICONS[wish.icon];
          return (
            <article key={wish.text} className="panel px-5 py-5">
              <Icon className="mb-3 size-4 text-gold" />
              <p className="text-[0.95rem] leading-relaxed text-cream">{wish.text}</p>
            </article>
          );
        })}
      </div>
      <GoldButton trailing={ArrowRight} className="mt-8" onClick={() => go("balloons", { fade: true })}>
        One more surprise
      </GoldButton>
    </SceneFrame>
  );
}

export function LastThingScene() {
  const go = useSurprise((s) => s.go);
  return (
    <SceneFrame>
      <DisplayTitle>One Last Thing, {SHORT_NAME}...</DisplayTitle>
      <div className="panel mt-6 w-full max-w-xl px-5 py-6 sm:mt-8 sm:px-7 sm:py-7">
        <p className="text-center text-[0.98rem] leading-relaxed text-cream">{LAST_THING}</p>
      </div>
      <GoldButton trailing={ArrowRight} className="mt-8" onClick={() => go("celebrate", { fade: true })}>
        Final surprise
      </GoldButton>
    </SceneFrame>
  );
}

export function CelebrateScene() {
  const go = useSurprise((s) => s.go);
  return (
    <SceneFrame>
      <div className="title-row">
        <PartyPopper className="size-7 text-gold" />
        <DisplayTitle className="tracking-[0.12em] uppercase">Celebrate {SHORT_NAME}</DisplayTitle>
        <PartyPopper className="size-7 text-gold" />
      </div>
      <p className="mt-3 font-display text-lg text-gold-bright">{CELEBRATE.kicker}</p>
      <div className="panel mt-6 w-full max-w-xl px-5 py-6 sm:mt-8 sm:px-7 sm:py-7">
        <p className="text-center text-[0.98rem] leading-relaxed text-cream">{CELEBRATE.body}</p>
      </div>
      <GoldButton trailing={ArrowRight} className="mt-8" onClick={() => go("end", { fade: true })}>
        Continue
      </GoldButton>
    </SceneFrame>
  );
}
