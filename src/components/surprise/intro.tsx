import { useEffect, useState } from "react";
import { ChevronRight, Gift, Lightbulb, Lock, PartyPopper } from "lucide-react";
import { currentPasskey, NAME, PASSKEY_HINT, SHORT_NAME } from "@/lib/content";
import { unlockAudio } from "@/lib/audio";
import { useSurprise } from "@/store/surprise";
import { DisplayTitle, GoldButton, SceneFrame } from "./chrome";
import { FireworksCanvas } from "./effects";
import { cn } from "@/lib/utils";

export function LockScene() {
  const go = useSurprise((s) => s.go);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    void unlockAudio();
    if (value.trim() === currentPasskey()) {
      go("countdown");
      return;
    }
    setWrong(true);
    window.setTimeout(() => setWrong(false), 500);
  };

  return (
    <SceneFrame>
      <form
        onSubmit={submit}
        className={cn("panel w-full max-w-[22rem] px-8 py-10 text-center", wrong && "shake")}
      >
        <Lock className="mx-auto size-8 text-gold" fill="currentColor" strokeWidth={1.5} />
        <DisplayTitle className="mt-5 text-[2rem] leading-none sm:text-[2.15rem]">
          Private
          <br />
          Surprise
        </DisplayTitle>
        <p className="mt-4 text-sm tracking-wide text-muted">Enter the passkey to unlock</p>
        <label className="sr-only" htmlFor="passkey">
          Passkey
        </label>
        <input
          id="passkey"
          className="pass-input mt-5"
          placeholder="Enter passkey"
          autoComplete="off"
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
          <Lightbulb className="size-3 text-gold" />
          Hint: {PASSKEY_HINT}
        </p>
        <GoldButton type="submit" icon={Gift} className="mt-6 w-full">
          Unlock
        </GoldButton>
      </form>
    </SceneFrame>
  );
}

export function CountdownScene() {
  const go = useSurprise((s) => s.go);
  const [n, setN] = useState(3);

  useEffect(() => {
    if (n <= 0) {
      go("fireworks");
      return;
    }
    const t = window.setTimeout(() => setN((v) => v - 1), 1000);
    return () => window.clearTimeout(t);
  }, [n, go]);

  return (
    <SceneFrame>
      {n > 0 ? <div className="count-num" key={n}>{n}</div> : null}
      <Skip />
    </SceneFrame>
  );
}

export function FireworksScene() {
  const go = useSurprise((s) => s.go);
  return (
    <SceneFrame className="p-0">
      <FireworksCanvas onDone={() => go("preparing", { fade: true })} />
      <Skip />
    </SceneFrame>
  );
}

export function PreparingScene() {
  const go = useSurprise((s) => s.go);
  return (
    <SceneFrame>
      <MiniCake />
      <p className="mt-6 font-display text-2xl italic text-cream sm:text-3xl">Preparing your surprise...</p>
      <GoldButton icon={PartyPopper} className="mt-8" onClick={() => go("gift")}>
        Start
      </GoldButton>
    </SceneFrame>
  );
}

export function GiftScene() {
  const go = useSurprise((s) => s.go);
  const setConfetti = useSurprise((s) => s.setConfetti);
  const setMusic = useSurprise((s) => s.setMusic);
  const [open, setOpen] = useState(false);

  const openGift = () => {
    if (open) return;
    setOpen(true);
    setConfetti(true);
    setMusic(true);
    window.setTimeout(() => go("hero", { fade: true }), 1700);
  };

  return (
    <SceneFrame>
      <div className="name-tag mb-5">{SHORT_NAME}</div>
      <button type="button" onClick={openGift} className="group" aria-label={`Open ${NAME}'s gift`}>
        <div className={cn("gift-stage mx-auto", open && "is-open")}>
          <img src="/assets/kitten.png" alt="" className="gift-cat" />
          <div className="gift-lid">
            <span className="gift-stripe" />
            <span className="gift-bow" />
          </div>
          <div className="gift-box">
            <span className="gift-stripe" />
          </div>
        </div>
      </button>
      <p className="mt-8 flex items-center gap-2 text-sm text-muted">
        <Gift className="size-4 text-gold" />
        Tap the gift to open your surprise!
      </p>
    </SceneFrame>
  );
}

function Skip() {
  const go = useSurprise((s) => s.go);
  return (
    <button type="button" className="skip-chip fixed right-5 bottom-6 z-40" onClick={() => go("preparing")}>
      Skip
      <ChevronRight className="size-3.5" />
    </button>
  );
}

function MiniCake() {
  return (
    <div className="relative h-16 w-16" aria-hidden="true">
      <div className="absolute top-0 left-1/2 flex -translate-x-1/2 gap-1">
        <span className="block h-4 w-0.5 bg-gold">
          <span className="flame !top-[-8px] !h-2.5 !w-1.5" />
        </span>
        <span className="block h-4 w-0.5 bg-gold">
          <span className="flame !top-[-8px] !h-2.5 !w-1.5" />
        </span>
        <span className="block h-4 w-0.5 bg-gold">
          <span className="flame !top-[-8px] !h-2.5 !w-1.5" />
        </span>
      </div>
      <div className="absolute bottom-5 left-1/2 h-4 w-8 -translate-x-1/2 rounded-sm bg-linear-to-b from-[#f7edd4] to-[#e2c994] shadow-[0_4px_0_#5c4018]" />
      <div className="absolute bottom-1 left-1/2 h-5 w-12 -translate-x-1/2 rounded-sm bg-linear-to-b from-[#f7edd4] to-[#c9a44a] shadow-[0_4px_0_#5c4018]" />
    </div>
  );
}
