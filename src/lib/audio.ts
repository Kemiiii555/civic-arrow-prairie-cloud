const MELODY: Array<[number, number]> = [
  [523.25, 0.28],
  [523.25, 0.28],
  [587.33, 0.55],
  [523.25, 0.55],
  [698.46, 0.55],
  [659.26, 1.05],
  [523.25, 0.28],
  [523.25, 0.28],
  [587.33, 0.55],
  [523.25, 0.55],
  [783.99, 0.55],
  [698.46, 1.05],
  [523.25, 0.28],
  [523.25, 0.28],
  [1046.5, 0.55],
  [880.0, 0.55],
  [698.46, 0.55],
  [659.26, 0.55],
  [587.33, 0.9],
  [932.33, 0.28],
  [932.33, 0.28],
  [880.0, 0.55],
  [698.46, 0.55],
  [783.99, 0.55],
  [698.46, 1.4],
];

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let filter: BiquadFilterNode | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let playing = false;

function ensure() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.07;
    filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    master.connect(filter);
    filter.connect(ctx.destination);
  }
  return ctx;
}

function pluck(freq: number, when: number, dur: number) {
  if (!ctx || !master) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  const overtone = ctx.createOscillator();
  const og = ctx.createGain();
  overtone.type = "triangle";
  overtone.frequency.value = freq * 2;
  og.gain.value = 0.18;
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(0.9, when + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(g);
  overtone.connect(og);
  og.connect(g);
  g.connect(master);
  osc.start(when);
  overtone.start(when);
  osc.stop(when + dur + 0.05);
  overtone.stop(when + dur + 0.05);
}

function scheduleLoop() {
  if (!ctx || !playing) return;
  let t = ctx.currentTime + 0.05;
  for (const [freq, beats] of MELODY) {
    const dur = beats * 0.42;
    pluck(freq, t, dur * 0.92);
    t += dur;
  }
  const wait = (t - ctx.currentTime + 0.6) * 1000;
  timer = setTimeout(scheduleLoop, wait);
}

export async function unlockAudio() {
  const ac = ensure();
  if (!ac) return;
  if (ac.state === "suspended") await ac.resume();
}

export function startMusic() {
  const ac = ensure();
  if (!ac || playing) return;
  playing = true;
  if (ac.state === "suspended") void ac.resume();
  scheduleLoop();
}

export function stopMusic() {
  playing = false;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

export function setMusicEnabled(on: boolean) {
  if (on) startMusic();
  else stopMusic();
}
