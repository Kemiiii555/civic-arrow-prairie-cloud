import { useEffect } from "react";
import { setMusicEnabled, unlockAudio } from "@/lib/audio";
import { useSurprise, type Scene } from "@/store/surprise";
import { Footer, MusicToggle } from "./chrome";
import { ConfettiLayer } from "./effects";
import {
  CountdownScene,
  FireworksScene,
  GiftScene,
  LockScene,
  PreparingScene,
} from "./intro";
import {
  CakeScene,
  CelebrateScene,
  HeroScene,
  LastThingScene,
  LetterScene,
  WishesScene,
} from "./middle";
import { BalloonsScene, EndScene, HiddenNoteScene, MemoriesScene } from "./finale";

export function SurpriseApp() {
  const scene = useSurprise((s) => s.scene);
  const veil = useSurprise((s) => s.veil);
  const confetti = useSurprise((s) => s.confetti);
  const musicOn = useSurprise((s) => s.musicOn);

  useEffect(() => {
    if (musicOn) {
      void unlockAudio();
      setMusicEnabled(true);
    } else {
      setMusicEnabled(false);
    }
    return () => setMusicEnabled(false);
  }, [musicOn]);

  return (
    <div className="surprise-root">
      <MusicToggle />
      {confetti ? <ConfettiLayer /> : null}
      <div key={scene} className="scene-enter">
        <ActiveScene scene={scene} />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[55] bg-ink transition-opacity duration-500"
        style={{ opacity: veil ? 1 : 0 }}
        aria-hidden="true"
      />
      <Footer />
    </div>
  );
}

function ActiveScene({ scene }: { scene: Scene }) {
  switch (scene) {
    case "lock":
      return <LockScene />;
    case "countdown":
      return <CountdownScene />;
    case "fireworks":
      return <FireworksScene />;
    case "preparing":
      return <PreparingScene />;
    case "gift":
      return <GiftScene />;
    case "hero":
      return <HeroScene />;
    case "letter":
      return <LetterScene />;
    case "cake":
      return <CakeScene />;
    case "wishes":
      return <WishesScene />;
    case "balloons":
      return <BalloonsScene />;
    case "note":
      return <HiddenNoteScene />;
    case "memories":
      return <MemoriesScene />;
    case "last":
      return <LastThingScene />;
    case "celebrate":
      return <CelebrateScene />;
    case "end":
      return <EndScene />;
    default:
      return <LockScene />;
  }
}
