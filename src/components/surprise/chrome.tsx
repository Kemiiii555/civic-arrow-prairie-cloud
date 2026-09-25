import type { LucideIcon } from "lucide-react";
import { Music, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { unlockAudio } from "@/lib/audio";
import { useSurprise } from "@/store/surprise";

export function GoldButton({
  children,
  onClick,
  icon: Icon,
  trailing,
  disabled,
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  trailing?: LucideIcon;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  const Trailing = trailing;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn("gold-btn", className)}>
      {Icon ? <Icon className="size-3.5" strokeWidth={2.2} /> : null}
      <span>{children}</span>
      {Trailing ? <Trailing className="size-3.5" strokeWidth={2.2} /> : null}
    </button>
  );
}

export function MusicToggle() {
  const musicOn = useSurprise((s) => s.musicOn);
  const toggleMusic = useSurprise((s) => s.toggleMusic);

  return (
    <button
      type="button"
      className="music-chip fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-50"
      onClick={() => {
        void unlockAudio();
        toggleMusic();
      }}
      aria-pressed={musicOn}
      aria-label={musicOn ? "Mute music" : "Play music"}
    >
      {musicOn ? <Music className="size-3" /> : <VolumeX className="size-3" />}
      Music: {musicOn ? "On" : "Off"}
    </button>
  );
}

export function Footer() {
  return (
    <p className="pointer-events-none fixed inset-x-0 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-30 text-center font-display text-[10px] tracking-[0.18em] text-gold-deep">
      A private surprise · 2026
    </p>
  );
}

export function SceneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative z-10 flex min-h-dvh w-full max-w-[100vw] flex-col items-center justify-center overflow-x-hidden px-4 py-16 pb-[5.5rem] sm:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function DisplayTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={cn(
        "font-display text-center text-[1.65rem] font-medium leading-[1.15] tracking-wide text-cream sm:text-4xl md:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
