import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Folder, Hand, PartyPopper, RotateCcw } from "lucide-react";
import { BALLOON_LINES, ENDING, PHOTOS, HIDDEN_NOTE, SHORT_NAME } from "@/lib/content";
import { useSurprise } from "@/store/surprise";
import { CameraFlash } from "./effects";
import { DisplayTitle, GoldButton, SceneFrame } from "./chrome";
import { cn } from "@/lib/utils";

const BALLOON_PALETTE = ["#e8d5a3", "#d4b56a", "#f3e6c0", "#c9a44a", "#ead9a0", "#f0d78c", "#dcc07a", "#f7edd4"];

export function BalloonsScene() {
  const go = useSurprise((s) => s.go);
  const letters = useMemo(() => BALLOON_LINES.join("").replace(/ /g, "").split(""), []);
  const slots = useMemo(() => {
    let n = 0;
    return BALLOON_LINES.map((line) =>
      line.split("").map((ch) => {
        if (ch === " ") return { ch, id: null as number | null };
        const id = n++;
        return { ch, id };
      }),
    );
  }, []);
  const assignment = useMemo(() => {
    const idx = letters.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const a = idx[i] ?? 0;
      idx[i] = idx[j] ?? 0;
      idx[j] = a;
    }
    return idx;
  }, [letters]);
  const [popped, setPopped] = useState<Set<number>>(() => new Set());
  const revealed = popped.size;
  const complete = revealed >= letters.length;

  useEffect(() => {
    if (!complete) return;
    const t = window.setTimeout(() => go("note", { fade: true }), 1800);
    return () => window.clearTimeout(t);
  }, [complete, go]);

  return (
    <SceneFrame>
      <div className="title-row">
        <PartyPopper className="size-6 text-gold" />
        <DisplayTitle>Pop Every Balloon</DisplayTitle>
        <PartyPopper className="size-6 text-gold" />
      </div>
      <p className="mt-2 px-2 text-center text-sm text-muted">Pop them all to reveal a secret message!</p>
      <img src="/assets/balloon-bear.png" alt="" className="mt-3 h-16 w-auto sm:mt-4 sm:h-28" />
      <div className="mt-4 flex max-w-full flex-col items-center gap-2 sm:mt-6 sm:gap-3">
        {slots.map((line, li) => (
          <div key={li} className="flex max-w-full flex-wrap justify-center gap-1 sm:gap-2">
            {line.map((slot, i) => {
              if (slot.id === null) return <span key={`${li}-sp-${i}`} className="w-2 sm:w-3" />;
              return (
                <span key={`${li}-${i}`} className="letter-slot">
                  {popped.has(slot.id) ? slot.ch : "\u00a0"}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div className="panel mt-6 w-full max-w-lg px-3 py-4 sm:mt-8 sm:px-5 sm:py-6">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {letters.map((_, balloon) => {
            const letterIndex = assignment[balloon] ?? balloon;
            const color = BALLOON_PALETTE[balloon % BALLOON_PALETTE.length];
            return (
              <button
                key={balloon}
                type="button"
                aria-label="Pop balloon"
                className={cn("balloon", popped.has(letterIndex) && "is-popped")}
                style={{ background: color, animationDelay: `${balloon * 80}ms` }}
                onClick={() =>
                  setPopped((prev) => {
                    const next = new Set(prev);
                    next.add(letterIndex);
                    return next;
                  })
                }
              />
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
}

export function HiddenNoteScene() {
  const go = useSurprise((s) => s.go);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  const scratch = useCallback((cx: number, cy: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fill();
    const { width, height } = canvas;
    const sample = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    for (let i = 3; i < sample.length; i += 32) {
      if ((sample[i] ?? 255) < 40) cleared += 1;
    }
    const total = sample.length / 32;
    if (cleared / total > 0.38) setReady(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#c9a44a");
    g.addColorStop(0.5, "#e6c97a");
    g.addColorStop(1, "#b8892a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(80, 60, 20, 0.18)";
    for (let i = 0; i < 40; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 18, 6);
    }
  }, []);

  const pointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons === 0 && e.pointerType === "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * e.currentTarget.width;
    const y = ((e.clientY - rect.top) / rect.height) * e.currentTarget.height;
    scratch(x, y);
  };

  return (
    <SceneFrame>
      <DisplayTitle>A Hidden Note</DisplayTitle>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
        <Hand className="size-3.5 text-gold" />
        Rub the card with your mouse or finger!
      </p>
      <div className="relative mt-6 w-full max-w-md overflow-hidden border border-gold bg-[#e6c97a]">
        <div className="px-6 py-8 text-center text-sm leading-relaxed text-[#1a1408]">
          {HIDDEN_NOTE}
        </div>
        <canvas
          ref={canvasRef}
          width={520}
          height={220}
          className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            pointer(e);
          }}
          onPointerMove={pointer}
        />
      </div>
      {ready ? (
        <GoldButton trailing={ArrowRight} className="mt-8" onClick={() => go("memories", { fade: true })}>
          Continue
        </GoldButton>
      ) : (
        <button
          type="button"
          className="mt-8 text-xs tracking-wide text-muted underline-offset-4 hover:text-gold hover:underline"
          onClick={() => go("memories", { fade: true })}
        >
          Skip
        </button>
      )}
    </SceneFrame>
  );
}

export function MemoriesScene() {
  const go = useSurprise((s) => s.go);
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (count >= PHOTOS.length) return;
    const t = window.setTimeout(() => {
      setFlash(true);
      setCount((c) => c + 1);
      window.setTimeout(() => setFlash(false), 420);
    }, count === 0 ? 700 : 1050);
    return () => window.clearTimeout(t);
  }, [count]);

  return (
    <SceneFrame className="py-16 sm:py-20">
      <CameraFlash show={flash} />
      <div className="title-row">
        <Folder className="size-6 text-gold" />
        <DisplayTitle>Captured Memories</DisplayTitle>
        <Folder className="size-6 text-gold" />
      </div>
      <p className="mt-2 px-2 text-center text-sm text-muted">Say cheese, {SHORT_NAME}! The little photographer is ready.</p>
      <img
        src="/assets/photographer.png"
        alt=""
        className={cn("mt-3 w-auto", count > 2 ? "hidden sm:block sm:h-20" : "h-16 sm:h-24")}
      />
      <div className="mt-5 grid w-full max-w-5xl grid-cols-2 items-end justify-items-center gap-2 sm:grid-cols-4 sm:gap-3">
        {PHOTOS.slice(0, count).map((photo, i) => (
          <figure
            key={photo.src}
            className="polaroid"
            style={{ rotate: i % 2 === 0 ? "-2.2deg" : "1.8deg" }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              style={photo.focus ? { objectPosition: photo.focus } : undefined}
            />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-5 font-display text-[0.65rem] tracking-[0.28em] text-muted">
        PHOTO {Math.min(count, PHOTOS.length)} OF {PHOTOS.length}
      </p>
      {count >= PHOTOS.length ? (
        <GoldButton trailing={ArrowRight} className="mt-6" onClick={() => go("last", { fade: true })}>
          Continue
        </GoldButton>
      ) : null}
    </SceneFrame>
  );
}

export function EndScene() {
  const replay = useSurprise((s) => s.replay);
  const setConfetti = useSurprise((s) => s.setConfetti);

  useEffect(() => {
    setConfetti(true);
  }, [setConfetti]);

  return (
    <SceneFrame>
      <DisplayTitle className="italic">The End</DisplayTitle>
      <img src="/assets/heart-bear.png" alt="" className="mt-6 h-40 w-auto sm:h-48" />
      <div className="panel mt-6 max-w-md px-5 py-5 sm:mt-6 sm:px-6 sm:py-6">
        <p className="text-center text-[0.98rem] leading-relaxed text-cream">{ENDING}</p>
      </div>
      <GoldButton
        icon={RotateCcw}
        className="mt-8"
        onClick={() => {
          setConfetti(false);
          replay();
        }}
      >
        Replay surprise
      </GoldButton>
    </SceneFrame>
  );
}
