import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ChevronRight, a as Shield, b as ArrowRight, c as Music, d as Lightbulb, f as Heart, g as Flower2, h as Folder, i as Sparkles, l as Mail, m as Gift, o as RotateCcw, p as Hand, r as Star, s as PartyPopper, t as VolumeX, u as Lock, v as Cake, y as BookOpen } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CakiCAux.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MELODY = [
	[523.25, .28],
	[523.25, .28],
	[587.33, .55],
	[523.25, .55],
	[698.46, .55],
	[659.26, 1.05],
	[523.25, .28],
	[523.25, .28],
	[587.33, .55],
	[523.25, .55],
	[783.99, .55],
	[698.46, 1.05],
	[523.25, .28],
	[523.25, .28],
	[1046.5, .55],
	[880, .55],
	[698.46, .55],
	[659.26, .55],
	[587.33, .9],
	[932.33, .28],
	[932.33, .28],
	[880, .55],
	[698.46, .55],
	[783.99, .55],
	[698.46, 1.4]
];
var ctx = null;
var master = null;
var filter = null;
var timer = null;
var playing = false;
function ensure() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		ctx = new (window.AudioContext || window.webkitAudioContext)();
		master = ctx.createGain();
		master.gain.value = .07;
		filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 1800;
		master.connect(filter);
		filter.connect(ctx.destination);
	}
	return ctx;
}
function pluck(freq, when, dur) {
	if (!ctx || !master) return;
	const osc = ctx.createOscillator();
	const g = ctx.createGain();
	osc.type = "sine";
	osc.frequency.value = freq;
	const overtone = ctx.createOscillator();
	const og = ctx.createGain();
	overtone.type = "triangle";
	overtone.frequency.value = freq * 2;
	og.gain.value = .18;
	g.gain.setValueAtTime(1e-4, when);
	g.gain.exponentialRampToValueAtTime(.9, when + .02);
	g.gain.exponentialRampToValueAtTime(1e-4, when + dur);
	osc.connect(g);
	overtone.connect(og);
	og.connect(g);
	g.connect(master);
	osc.start(when);
	overtone.start(when);
	osc.stop(when + dur + .05);
	overtone.stop(when + dur + .05);
}
function scheduleLoop() {
	if (!ctx || !playing) return;
	let t = ctx.currentTime + .05;
	for (const [freq, beats] of MELODY) {
		const dur = beats * .42;
		pluck(freq, t, dur * .92);
		t += dur;
	}
	const wait = (t - ctx.currentTime + .6) * 1e3;
	timer = setTimeout(scheduleLoop, wait);
}
async function unlockAudio() {
	const ac = ensure();
	if (!ac) return;
	if (ac.state === "suspended") await ac.resume();
}
function startMusic() {
	const ac = ensure();
	if (!ac || playing) return;
	playing = true;
	if (ac.state === "suspended") ac.resume();
	scheduleLoop();
}
function stopMusic() {
	playing = false;
	if (timer) {
		clearTimeout(timer);
		timer = null;
	}
}
function setMusicEnabled(on) {
	if (on) startMusic();
	else stopMusic();
}
var veilTimer;
var useSurprise = create((set, get) => ({
	scene: "lock",
	musicOn: false,
	confetti: false,
	veil: false,
	go: (scene, opts) => {
		if (opts?.fade) {
			set({ veil: true });
			window.clearTimeout(veilTimer);
			veilTimer = setTimeout(() => {
				set({
					scene,
					veil: true
				});
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
	replay: () => set({
		scene: "countdown",
		confetti: false,
		veil: false
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function GoldButton({ children, onClick, icon: Icon, trailing, disabled, className, type = "button" }) {
	const Trailing = trailing;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type,
		onClick,
		disabled,
		className: cn("gold-btn", className),
		children: [
			Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-3.5",
				strokeWidth: 2.2
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }),
			Trailing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trailing, {
				className: "size-3.5",
				strokeWidth: 2.2
			}) : null
		]
	});
}
function MusicToggle() {
	const musicOn = useSurprise((s) => s.musicOn);
	const toggleMusic = useSurprise((s) => s.toggleMusic);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "music-chip fixed top-4 right-4 z-50",
		onClick: () => {
			unlockAudio();
			toggleMusic();
		},
		"aria-pressed": musicOn,
		"aria-label": musicOn ? "Mute music" : "Play music",
		children: [
			musicOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-3" }),
			"Music: ",
			musicOn ? "On" : "Off"
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "pointer-events-none fixed inset-x-0 bottom-3 z-30 text-center font-display text-[10px] tracking-[0.18em] text-gold-deep",
		children: "A private surprise · 2026"
	});
}
function SceneFrame({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("relative z-10 flex min-h-dvh w-full flex-col items-center justify-center px-4 py-24", className),
		children
	});
}
function DisplayTitle({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: cn("font-display text-3xl font-medium tracking-wide text-cream sm:text-4xl md:text-5xl", className),
		children
	});
}
var CONFETTI_COLORS = [
	"#d4b56a",
	"#f0d78c",
	"#f3ead2",
	"#fff8e8",
	"#c9a44a",
	"#efe6c8"
];
var SPARK_COLORS = [
	"#fff6d0",
	"#f0d78c",
	"#d4b56a",
	"#ffffff",
	"#e8c35a"
];
function ConfettiLayer() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let running = true;
		const particles = [];
		let spawn = 0;
		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener("resize", resize);
		const tick = () => {
			if (!running) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			spawn += 1;
			if (spawn % 3 === 0 && particles.length < 140) particles.push({
				x: Math.random() * canvas.width,
				y: -12,
				vx: (Math.random() - .5) * 1.4,
				vy: 1.2 + Math.random() * 1.8,
				life: 0,
				max: 220 + Math.random() * 160,
				w: 4 + Math.random() * 6,
				h: 8 + Math.random() * 8,
				rot: Math.random() * Math.PI,
				vr: (Math.random() - .5) * .16,
				color: CONFETTI_COLORS[Math.random() * CONFETTI_COLORS.length | 0] ?? "#d4b56a",
				kind: "confetti"
			});
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				if (!p) continue;
				p.life += 1;
				p.x += p.vx;
				p.y += p.vy;
				p.rot += p.vr;
				if (p.y > canvas.height + 20 || p.life > p.max) {
					particles.splice(i, 1);
					continue;
				}
				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rot);
				ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
				ctx.fillStyle = p.color;
				ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
				ctx.restore();
			}
			requestAnimationFrame(tick);
		};
		const id = requestAnimationFrame(tick);
		return () => {
			running = false;
			cancelAnimationFrame(id);
			window.removeEventListener("resize", resize);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "pointer-events-none fixed inset-0 z-20",
		"aria-hidden": "true"
	});
}
function FireworksCanvas({ onDone }) {
	const ref = (0, import_react.useRef)(null);
	const done = (0, import_react.useRef)(onDone);
	done.current = onDone;
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let running = true;
		let aborted = false;
		const particles = [];
		let launched = 0;
		const start = performance.now();
		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener("resize", resize);
		const explode = (x, y) => {
			const n = 48 + (Math.random() * 24 | 0);
			for (let i = 0; i < n; i++) {
				const a = Math.PI * 2 * i / n + Math.random() * .2;
				const s = 1.4 + Math.random() * 3.2;
				particles.push({
					x,
					y,
					vx: Math.cos(a) * s,
					vy: Math.sin(a) * s,
					life: 0,
					max: 50 + Math.random() * 30,
					w: 2 + Math.random() * 2,
					h: 2,
					rot: 0,
					vr: 0,
					color: SPARK_COLORS[Math.random() * SPARK_COLORS.length | 0] ?? "#f0d78c",
					kind: "spark"
				});
			}
		};
		const launch = () => {
			const x = canvas.width * (.18 + Math.random() * .64);
			particles.push({
				x,
				y: canvas.height + 8,
				vx: (Math.random() - .5) * 1.2,
				vy: -(7.2 + Math.random() * 2.4),
				life: 0,
				max: 90,
				w: 3,
				h: 10,
				rot: 0,
				vr: 0,
				color: "#f0d78c",
				kind: "rocket"
			});
			launched += 1;
		};
		launch();
		const launchTimer = window.setInterval(() => {
			if (launched < 8) launch();
		}, 520);
		const tick = () => {
			if (!running) return;
			ctx.fillStyle = "rgba(5,5,5,0.22)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				if (!p) continue;
				p.life += 1;
				p.x += p.vx;
				p.y += p.vy;
				if (p.kind === "spark") p.vy += .045;
				if (p.kind === "rocket") {
					p.vy += .04;
					ctx.fillStyle = p.color;
					ctx.globalAlpha = 1;
					ctx.fillRect(p.x, p.y, 2, 8);
					if (p.vy > -1.2 || p.life > 70) {
						explode(p.x, p.y);
						particles.splice(i, 1);
					}
					continue;
				}
				const a = Math.max(0, 1 - p.life / p.max);
				ctx.globalAlpha = a;
				ctx.fillStyle = p.color;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.w, 0, Math.PI * 2);
				ctx.fill();
				if (p.life > p.max) particles.splice(i, 1);
			}
			ctx.globalAlpha = 1;
			if (performance.now() - start > 6200 && particles.length === 0) {
				running = false;
				if (!aborted) done.current();
				return;
			}
			requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
		return () => {
			aborted = true;
			running = false;
			window.clearInterval(launchTimer);
			window.removeEventListener("resize", resize);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "fixed inset-0 z-10",
		"aria-hidden": "true"
	});
}
function CameraFlash({ show }) {
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flash" });
}
/**
* All copy & media for the surprise.
* Swap names, letter, wishes, photos here when you have the final versions.
*/
var NAME = "Esha Fatima";
var SHORT_NAME = "Esha";
var PASSKEY_HINT = "The current year";
function currentPasskey() {
	return String((/* @__PURE__ */ new Date()).getFullYear());
}
var LETTER = {
	greeting: `Dear ${SHORT_NAME},`,
	body: `Seventeen looks beautiful on you. This birthday isn't just another number, it's the opening page of a chapter you've already started writing in your own quiet, determined way. Every plan you've mapped out, every skill you've been building late into the night, every dream you refuse to let go of, it's all leading somewhere, and today is proof of how far you've come.

May this year meet your effort with opportunity, your patience with reward, and your heart with exactly the peace and privacy it deserves. Here's to you, ${NAME}, thoughtful, driven, and only just getting started.`,
	signOff: "With love, always"
};
var HERO = {
	title: `Happy 17th Birthday!`,
	urdu: `Saalgirah mubarak ho, meri pyaari ${SHORT_NAME}`
};
var WISHES = [
	{
		icon: "cake",
		text: `May every candle you blow out light up a new blessing in your life, ${SHORT_NAME}.`
	},
	{
		icon: "spark",
		text: `17 looks amazing on you. Here's to bigger dreams, bolder plans, and even bigger wins.`
	},
	{
		icon: "book",
		text: "May every page you fill, in your journals and in your life, bring you closer to who you're becoming."
	},
	{
		icon: "star",
		text: "This is just the beginning. Go chase everything you've been quietly working toward."
	},
	{
		icon: "shield",
		text: "Stay steady, stay guarded where you need to be, and keep shining exactly the way you do."
	},
	{
		icon: "bloom",
		text: "Wishing you a year filled with success, calm, and the space to be entirely yourself."
	}
];
var BALLOON_LINES = ["YOU ARE AMAZING", "ESHA!"];
var HIDDEN_NOTE = `You made it to 17, ${SHORT_NAME}. Every quiet late night, every plan, every version of yourself you've worked to become, it all counts. This is your year to be bold, guard your peace, and chase every dream on your own terms.`;
var PHOTOS = [
	{
		src: "/assets/photo-1.jpg",
		caption: "That soft, easy smile"
	},
	{
		src: "/assets/photo-2.jpg",
		caption: "Golden hour, your room, your world"
	},
	{
		src: "/assets/photo-3.jpg",
		caption: "Mirror moments worth keeping"
	},
	{
		src: "/assets/photo-4.jpg",
		caption: "Dressed up, glowing, unforgettable"
	},
	{
		src: "/assets/photo-5.jpg",
		caption: "Eyes that tell the whole story",
		focus: "center 70%"
	},
	{
		src: "/assets/photo-6.jpg",
		caption: "Magenta, gold, and that glow"
	},
	{
		src: "/assets/photo-7.jpg",
		caption: "I don't care — and it suits you"
	},
	{
		src: "/assets/photo-8.jpg",
		caption: "Fuzzy hat, film grain, unforgettable"
	}
];
var LAST_THING = `No matter where the next few years take you, near or far, remember how loved and valued you are. Seventeen is just a number. What truly matters is the heart you carry, the discipline you've built, and the dreams you keep chasing quietly and on your own terms. Thank you for being exactly who you are. Here's to celebrating you, today and always.`;
var CELEBRATE = {
	kicker: `17 & Unstoppable`,
	body: `Today marks a new beginning, ${SHORT_NAME}. Step into this year with confidence, chase your goals fearlessly, and know that the best is still ahead of you. Happy 17th Birthday, once again! Enjoy your special day to the fullest.`
};
var ENDING = `Thank you for going through this little surprise, ${SHORT_NAME}. Hope it brought a smile to your face. Happy 17th Birthday, once again!`;
function LockScene() {
	const go = useSurprise((s) => s.go);
	const [value, setValue] = (0, import_react.useState)("");
	const [wrong, setWrong] = (0, import_react.useState)(false);
	const submit = (e) => {
		e.preventDefault();
		unlockAudio();
		if (value.trim() === currentPasskey()) {
			go("countdown");
			return;
		}
		setWrong(true);
		window.setTimeout(() => setWrong(false), 500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: cn("panel w-full max-w-[22rem] px-8 py-10 text-center", wrong && "shake"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
				className: "mx-auto size-8 text-gold",
				fill: "currentColor",
				strokeWidth: 1.5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DisplayTitle, {
				className: "mt-5 text-[2rem] leading-none sm:text-[2.15rem]",
				children: [
					"Private",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Surprise"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm tracking-wide text-muted",
				children: "Enter the passkey to unlock"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: "passkey",
				children: "Passkey"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "passkey",
				className: "pass-input mt-5",
				placeholder: "Enter passkey",
				autoComplete: "off",
				inputMode: "numeric",
				value,
				onChange: (e) => setValue(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-center justify-center gap-1.5 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-3 text-gold" }),
					"Hint: ",
					PASSKEY_HINT
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
				type: "submit",
				icon: Gift,
				className: "mt-6 w-full",
				children: "Unlock"
			})
		]
	}) });
}
function CountdownScene() {
	const go = useSurprise((s) => s.go);
	const [n, setN] = (0, import_react.useState)(3);
	(0, import_react.useEffect)(() => {
		if (n <= 0) {
			go("fireworks");
			return;
		}
		const t = window.setTimeout(() => setN((v) => v - 1), 1e3);
		return () => window.clearTimeout(t);
	}, [n, go]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [n > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "count-num",
		children: n
	}, n) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skip, {})] });
}
function FireworksScene() {
	const go = useSurprise((s) => s.go);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, {
		className: "p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FireworksCanvas, { onDone: () => go("preparing", { fade: true }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skip, {})]
	});
}
function PreparingScene() {
	const go = useSurprise((s) => s.go);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCake, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 font-display text-2xl italic text-cream sm:text-3xl",
			children: "Preparing your surprise..."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			icon: PartyPopper,
			className: "mt-8",
			onClick: () => go("gift"),
			children: "Start"
		})
	] });
}
function GiftScene() {
	const go = useSurprise((s) => s.go);
	const setConfetti = useSurprise((s) => s.setConfetti);
	const setMusic = useSurprise((s) => s.setMusic);
	const [open, setOpen] = (0, import_react.useState)(false);
	const openGift = () => {
		if (open) return;
		setOpen(true);
		setConfetti(true);
		setMusic(true);
		window.setTimeout(() => go("hero", { fade: true }), 1700);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "name-tag mb-5",
			children: SHORT_NAME
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: openGift,
			className: "group",
			"aria-label": `Open ${NAME}'s gift`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("gift-stage mx-auto", open && "is-open"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/kitten.png",
						alt: "",
						className: "gift-cat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "gift-lid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gift-stripe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gift-bow" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "gift-box",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gift-stripe" })
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 flex items-center gap-2 text-sm text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-4 text-gold" }), "Tap the gift to open your surprise!"]
		})
	] });
}
function Skip() {
	const go = useSurprise((s) => s.go);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "skip-chip fixed right-5 bottom-6 z-40",
		onClick: () => go("preparing"),
		children: ["Skip", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
	});
}
function MiniCake() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-16 w-16",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-0 left-1/2 flex -translate-x-1/2 gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block h-4 w-0.5 bg-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flame !top-[-8px] !h-2.5 !w-1.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block h-4 w-0.5 bg-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flame !top-[-8px] !h-2.5 !w-1.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block h-4 w-0.5 bg-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flame !top-[-8px] !h-2.5 !w-1.5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-5 left-1/2 h-4 w-8 -translate-x-1/2 rounded-sm bg-linear-to-b from-[#f7edd4] to-[#e2c994] shadow-[0_4px_0_#5c4018]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1 left-1/2 h-5 w-12 -translate-x-1/2 rounded-sm bg-linear-to-b from-[#f7edd4] to-[#c9a44a] shadow-[0_4px_0_#5c4018]" })
		]
	});
}
var WISH_ICONS = {
	cake: Cake,
	spark: Sparkles,
	book: BookOpen,
	star: Star,
	shield: Shield,
	bloom: Flower2
};
function HeroScene() {
	const go = useSurprise((s) => s.go);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "size-7 text-gold" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayTitle, {
					className: "italic",
					children: HERO.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "size-7 text-gold" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "script-logo mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Happy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Birthday" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-10 font-display text-xl text-cream sm:text-2xl",
			children: [SHORT_NAME, "!"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm italic text-muted",
			children: HERO.urdu
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			icon: Mail,
			trailing: ArrowRight,
			className: "mt-8",
			onClick: () => go("letter"),
			children: "Open your letter"
		})
	] });
}
function LetterScene() {
	const go = useSurprise((s) => s.go);
	const [shown, setShown] = (0, import_react.useState)(0);
	const text = LETTER.body;
	const done = shown >= text.length;
	(0, import_react.useEffect)(() => {
		if (done) return;
		const t = window.setTimeout(() => setShown((n) => n + 1), 16);
		return () => window.clearTimeout(t);
	}, [done, shown]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayTitle, {
			className: "italic",
			children: "A Letter for You"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "panel relative mt-8 w-full max-w-xl px-7 py-8 text-left",
			onClick: () => setShown(text.length),
			"aria-label": "Birthday letter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-0 left-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-warm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
						className: "size-3.5 text-gold",
						fill: "currentColor"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-base text-gold italic",
					children: LETTER.greeting
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 whitespace-pre-wrap text-[0.98rem] leading-relaxed text-cream",
					children: [text.slice(0, shown), !done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "caret" }) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-right font-display text-sm italic text-gold",
					children: LETTER.signOff
				})
			]
		}),
		done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			icon: Cake,
			trailing: ArrowRight,
			className: "mt-8",
			onClick: () => go("cake"),
			children: "Continue to the cake"
		}) : null
	] });
}
function CakeScene() {
	const go = useSurprise((s) => s.go);
	const setConfetti = useSurprise((s) => s.setConfetti);
	const [blown, setBlown] = (0, import_react.useState)(false);
	const blow = () => {
		if (blown) return;
		setBlown(true);
		setConfetti(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cake, { className: "size-7 text-gold" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DisplayTitle, { children: ["Make a Wish, ", SHORT_NAME] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cake, { className: "size-7 text-gold" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/assets/bears.png",
			alt: "",
			className: "mt-6 h-28 w-auto sm:h-32"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("cake-visual mt-2", blown && "is-blown"),
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "candles",
					children: Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "candle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flame",
							style: { animationDelay: `${i * 90}ms` }
						})
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "cake-tier top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cake-band" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cake-pearls" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "cake-tier mid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cake-band" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cake-pearls" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "cake-tier bot",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cake-band" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cake-pearls" })]
				})
			]
		}),
		!blown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			className: "mt-8",
			onClick: blow,
			children: "Blow the candles & make a wish"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "gold-btn pointer-events-none opacity-80",
					children: "Wish made!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gold-bright",
					children: "Your wish has been sent to the universe!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
					trailing: ArrowRight,
					onClick: () => go("wishes"),
					children: "See your birthday wishes"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 font-display text-[0.65rem] tracking-[0.28em] text-muted",
			children: [
				"HAPPY ",
				17,
				"TH, ",
				SHORT_NAME.toUpperCase()
			]
		})
	] });
}
function WishesScene() {
	const go = useSurprise((s) => s.go);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayTitle, {
			className: "mb-8",
			children: "Birthday Wishes for You"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: WISHES.map((wish) => {
				const Icon = WISH_ICONS[wish.icon];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel px-5 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mb-3 size-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.95rem] leading-relaxed text-cream",
						children: wish.text
					})]
				}, wish.text);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			trailing: ArrowRight,
			className: "mt-8",
			onClick: () => go("balloons", { fade: true }),
			children: "One more surprise"
		})
	] });
}
function LastThingScene() {
	const go = useSurprise((s) => s.go);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DisplayTitle, { children: [
			"One Last Thing, ",
			SHORT_NAME,
			"..."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel mt-8 max-w-xl px-7 py-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[0.98rem] leading-relaxed text-cream",
				children: LAST_THING
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			trailing: ArrowRight,
			className: "mt-8",
			onClick: () => go("celebrate", { fade: true }),
			children: "Final surprise"
		})
	] });
}
function CelebrateScene() {
	const go = useSurprise((s) => s.go);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "size-7 text-gold" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DisplayTitle, {
					className: "tracking-[0.12em] uppercase",
					children: ["Celebrate ", SHORT_NAME]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "size-7 text-gold" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-display text-lg text-gold-bright",
			children: CELEBRATE.kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel mt-8 max-w-xl px-7 py-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[0.98rem] leading-relaxed text-cream",
				children: CELEBRATE.body
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			trailing: ArrowRight,
			className: "mt-8",
			onClick: () => go("end", { fade: true }),
			children: "Continue"
		})
	] });
}
var BALLOON_PALETTE = [
	"#e8d5a3",
	"#d4b56a",
	"#f3e6c0",
	"#c9a44a",
	"#ead9a0",
	"#f0d78c",
	"#dcc07a",
	"#f7edd4"
];
function BalloonsScene() {
	const go = useSurprise((s) => s.go);
	const letters = (0, import_react.useMemo)(() => BALLOON_LINES.join("").replace(/ /g, "").split(""), []);
	const slots = (0, import_react.useMemo)(() => {
		let n = 0;
		return BALLOON_LINES.map((line) => line.split("").map((ch) => {
			if (ch === " ") return {
				ch,
				id: null
			};
			return {
				ch,
				id: n++
			};
		}));
	}, []);
	const assignment = (0, import_react.useMemo)(() => {
		const idx = letters.map((_, i) => i);
		for (let i = idx.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const a = idx[i] ?? 0;
			idx[i] = idx[j] ?? 0;
			idx[j] = a;
		}
		return idx;
	}, [letters]);
	const [popped, setPopped] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const complete = popped.size >= letters.length;
	(0, import_react.useEffect)(() => {
		if (!complete) return;
		const t = window.setTimeout(() => go("note", { fade: true }), 1800);
		return () => window.clearTimeout(t);
	}, [complete, go]);
	const rows = [
		8,
		8,
		2
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "size-6 text-gold" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayTitle, { children: "Pop Every Balloon" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "size-6 text-gold" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Pop them all to reveal a secret message!"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/assets/balloon-bear.png",
			alt: "",
			className: "mt-4 h-24 w-auto sm:h-28"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-col items-center gap-3",
			children: slots.map((line, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 sm:gap-2",
				children: line.map((slot, i) => {
					if (slot.id === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 sm:w-3" }, `${li}-sp-${i}`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "letter-slot",
						children: popped.has(slot.id) ? slot.ch : "\xA0"
					}, `${li}-${i}`);
				})
			}, li))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel mt-8 px-5 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col items-center gap-3",
				children: rows.map((count, row) => {
					const start = rows.slice(0, row).reduce((a, b) => a + b, 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 sm:gap-3",
						children: Array.from({ length: count }).map((_, i) => {
							const balloon = start + i;
							const letterIndex = assignment[balloon] ?? balloon;
							const color = BALLOON_PALETTE[balloon % BALLOON_PALETTE.length];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Pop balloon",
								className: cn("balloon", popped.has(letterIndex) && "is-popped"),
								style: {
									background: color,
									animationDelay: `${balloon * 80}ms`
								},
								onClick: () => setPopped((prev) => {
									const next = new Set(prev);
									next.add(letterIndex);
									return next;
								})
							}, balloon);
						})
					}, row);
				})
			})
		})
	] });
}
function HiddenNoteScene() {
	const go = useSurprise((s) => s.go);
	const canvasRef = (0, import_react.useRef)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const scratch = (0, import_react.useCallback)((cx, cy) => {
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
		for (let i = 3; i < sample.length; i += 32) if ((sample[i] ?? 255) < 40) cleared += 1;
		const total = sample.length / 32;
		if (cleared / total > .38) setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const { width, height } = canvas;
		const g = ctx.createLinearGradient(0, 0, width, height);
		g.addColorStop(0, "#c9a44a");
		g.addColorStop(.5, "#e6c97a");
		g.addColorStop(1, "#b8892a");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "rgba(80, 60, 20, 0.18)";
		for (let i = 0; i < 40; i++) ctx.fillRect(Math.random() * width, Math.random() * height, 18, 6);
	}, []);
	const pointer = (e) => {
		if (e.buttons === 0 && e.pointerType === "mouse") return;
		const rect = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width * e.currentTarget.width;
		const y = (e.clientY - rect.top) / rect.height * e.currentTarget.height;
		scratch(x, y);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayTitle, { children: "A Hidden Note" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 flex items-center gap-1.5 text-sm text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "size-3.5 text-gold" }), "Rub the card with your mouse or finger!"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-6 w-full max-w-md overflow-hidden border border-gold bg-[#e6c97a]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 py-8 text-center text-sm leading-relaxed text-[#1a1408]",
				children: HIDDEN_NOTE
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				width: 520,
				height: 220,
				className: "absolute inset-0 h-full w-full cursor-crosshair touch-none",
				onPointerDown: (e) => {
					e.currentTarget.setPointerCapture(e.pointerId);
					pointer(e);
				},
				onPointerMove: pointer
			})]
		}),
		ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			trailing: ArrowRight,
			className: "mt-8",
			onClick: () => go("memories", { fade: true }),
			children: "Continue"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-8 text-xs tracking-wide text-muted underline-offset-4 hover:text-gold hover:underline",
			onClick: () => go("memories", { fade: true }),
			children: "Skip"
		})
	] });
}
function MemoriesScene() {
	const go = useSurprise((s) => s.go);
	const [count, setCount] = (0, import_react.useState)(0);
	const [flash, setFlash] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (count >= PHOTOS.length) return;
		const t = window.setTimeout(() => {
			setFlash(true);
			setCount((c) => c + 1);
			window.setTimeout(() => setFlash(false), 420);
		}, count === 0 ? 700 : 1050);
		return () => window.clearTimeout(t);
	}, [count]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, {
		className: "py-16 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraFlash, { show: flash }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-6 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayTitle, { children: "Captured Memories" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-6 text-gold" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Say cheese, ",
					SHORT_NAME,
					"! The little photographer is ready."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/assets/photographer.png",
				alt: "",
				className: cn("mt-4 w-auto", count > 4 ? "h-16 sm:h-20" : "h-20 sm:h-24")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid w-full max-w-5xl grid-cols-2 items-end justify-items-center gap-2 sm:grid-cols-4 sm:gap-3",
				children: PHOTOS.slice(0, count).map((photo, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "polaroid",
					style: { rotate: i % 2 === 0 ? "-2.2deg" : "1.8deg" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo.src,
						alt: photo.caption,
						style: photo.focus ? { objectPosition: photo.focus } : void 0
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: photo.caption })]
				}, photo.src))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 font-display text-[0.65rem] tracking-[0.28em] text-muted",
				children: [
					"PHOTO ",
					Math.min(count, PHOTOS.length),
					" OF ",
					PHOTOS.length
				]
			}),
			count >= PHOTOS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
				trailing: ArrowRight,
				className: "mt-6",
				onClick: () => go("last", { fade: true }),
				children: "Continue"
			}) : null
		]
	});
}
function EndScene() {
	const replay = useSurprise((s) => s.replay);
	const setConfetti = useSurprise((s) => s.setConfetti);
	(0, import_react.useEffect)(() => {
		setConfetti(true);
	}, [setConfetti]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayTitle, {
			className: "italic",
			children: "The End"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/assets/heart-bear.png",
			alt: "",
			className: "mt-6 h-40 w-auto sm:h-48"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel mt-6 max-w-md px-6 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[0.98rem] leading-relaxed text-cream",
				children: ENDING
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
			icon: RotateCcw,
			className: "mt-8",
			onClick: () => {
				setConfetti(false);
				replay();
			},
			children: "Replay surprise"
		})
	] });
}
function SurpriseApp() {
	const scene = useSurprise((s) => s.scene);
	const veil = useSurprise((s) => s.veil);
	const confetti = useSurprise((s) => s.confetti);
	const musicOn = useSurprise((s) => s.musicOn);
	(0, import_react.useEffect)(() => {
		if (musicOn) {
			unlockAudio();
			setMusicEnabled(true);
		} else setMusicEnabled(false);
		return () => setMusicEnabled(false);
	}, [musicOn]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surprise-root",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MusicToggle, {}),
			confetti ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfettiLayer, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-enter",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveScene, { scene })
			}, scene),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-0 z-[55] bg-ink transition-opacity duration-500",
				style: { opacity: veil ? 1 : 0 },
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function ActiveScene({ scene }) {
	switch (scene) {
		case "lock": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockScene, {});
		case "countdown": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountdownScene, {});
		case "fireworks": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FireworksScene, {});
		case "preparing": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreparingScene, {});
		case "gift": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftScene, {});
		case "hero": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroScene, {});
		case "letter": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterScene, {});
		case "cake": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CakeScene, {});
		case "wishes": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishesScene, {});
		case "balloons": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BalloonsScene, {});
		case "note": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiddenNoteScene, {});
		case "memories": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoriesScene, {});
		case "last": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastThingScene, {});
		case "celebrate": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CelebrateScene, {});
		case "end": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndScene, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockScene, {});
	}
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurpriseApp, {});
}
//#endregion
export { Home as component };
