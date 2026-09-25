import { create } from "zustand";

export type Scene =
  | "lock"
  | "countdown"
  | "fireworks"
  | "preparing"
  | "gift"
  | "hero"
  | "letter"
  | "cake"
  | "wishes"
  | "balloons"
  | "note"
  | "memories"
  | "last"
  | "celebrate"
  | "end";

type Store = {
  scene: Scene;
  musicOn: boolean;
  confetti: boolean;
  veil: boolean;
  go: (scene: Scene, opts?: { fade?: boolean }) => void;
  toggleMusic: () => void;
  setMusic: (on: boolean) => void;
  setConfetti: (v: boolean) => void;
  replay: () => void;
};

let veilTimer: ReturnType<typeof setTimeout> | undefined;

export const useSurprise = create<Store>((set, get) => ({
  scene: "lock",
  musicOn: false,
  confetti: false,
  veil: false,
  go: (scene, opts) => {
    if (opts?.fade) {
      set({ veil: true });
      window.clearTimeout(veilTimer);
      veilTimer = setTimeout(() => {
        set({ scene, veil: true });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => set({ veil: false }));
        });
      }, 460);
      return;
    }
    set({ scene });
  },
  toggleMusic: () => set({ musicOn: !get().musicOn }),
  setMusic: (on) => set({ musicOn: on }),
  setConfetti: (v) => set({ confetti: v }),
  replay: () =>
    set({
      scene: "countdown",
      confetti: false,
      veil: false,
    }),
}));
