import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Dumbbell, Footprints, Mountain, Trophy, AlertTriangle, Sparkles, RefreshCw, Check, Clock, Flame } from "lucide-react";
import type { Sport } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · PulseBalance" },
      { name: "description", content: "Your recovery, weekly sport balance and recent workouts at a glance." },
      { property: "og:title", content: "Dashboard · PulseBalance" },
      { property: "og:description", content: "Your recovery, weekly sport balance and recent workouts at a glance." },
    ],
  }),
  component: Dashboard,
});

const icons: Record<Sport, typeof Dumbbell> = { Gym: Dumbbell, Running: Footprints, Climbing: Mountain, Soccer: Trophy };
const barColor: Record<Sport, string> = { Gym: "bg-primary", Running: "bg-energy", Climbing: "bg-chart-2", Soccer: "bg-chart-4" };
const tagColor: Record<Sport, string> = {
  Gym: "bg-primary/15 text-primary", Running: "bg-energy/15 text-energy",
  Climbing: "bg-chart-2/15 text-chart-2", Soccer: "bg-chart-4/15 text-chart-4",
};
const SPORTS: Sport[] = ["Gym", "Running", "Climbing", "Soccer"];

const week: { day: string; mins: Record<Sport, number> }[] = [
  { day: "Mon", mins: { Gym: 60, Running: 0, Climbing: 0, Soccer: 0 } },
  { day: "Tue", mins: { Gym: 0, Running: 35, Climbing: 0, Soccer: 0 } },
  { day: "Wed", mins: { Gym: 45, Running: 0, Climbing: 0, Soccer: 90 } },
  { day: "Thu", mins: { Gym: 0, Running: 25, Climbing: 0, Soccer: 0 } },
  { day: "Fri", mins: { Gym: 50, Running: 0, Climbing: 0, Soccer: 0 } },
  { day: "Sat", mins: { Gym: 0, Running: 0, Climbing: 0, Soccer: 0 } },
  { day: "Sun", mins: { Gym: 0, Running: 20, Climbing: 100, Soccer: 0 } },
];

const workouts = [
  { id: 1, sport: "Climbing" as Sport, title: "Bouldering at The Wall", tag: "V4 Cleared", when: "Yesterday", mins: 100, kcal: 540 },
  { id: 2, sport: "Running" as Sport, title: "Morning River Loop", tag: "5km 24:30", when: "2 days ago", mins: 25, kcal: 320 },
  { id: 3, sport: "Gym" as Sport, title: "Push Day", tag: "Bench 80kg × 5", when: "3 days ago", mins: 50, kcal: 380 },
  { id: 4, sport: "Soccer" as Sport, title: "Sunday League", tag: "Match 90min", when: "4 days ago", mins: 90, kcal: 820 },
  { id: 5, sport: "Gym" as Sport, title: "Pull Day", tag: "Deadlift 140kg", when: "5 days ago", mins: 45, kcal: 360 },
];

const recs = [
  { title: "Leg Day in Gym", sport: "Gym" as Sport, mins: 55, intensity: "Moderate", why: "Legs are fresh and your upper body needs a break from yesterday's climb." },
  { title: "Light Recovery Jog", sport: "Running" as Sport, mins: 30, intensity: "Easy", why: "Zone 2 cardio boosts blood flow without loading your grip or forearms." },
  { title: "Technical Ball Drills", sport: "Soccer" as Sport, mins: 40, intensity: "Light", why: "Low-impact footwork keeps your touch sharp while you recover." },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Today's <span className="text-pulse">Balance</span></h1>
        <p className="text-sm text-muted-foreground">Here's how your body is doing across all your sports.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2"><RecoveryCard /></div>
        <div className="lg:col-span-3"><RecommendationCard /></div>
      </div>
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3"><WeeklyBreakdown /></div>
        <div className="lg:col-span-2"><WorkoutFeed /></div>
      </div>
    </div>
  );
}

const card = "rounded-2xl border bg-card p-5 transition duration-300 hover:border-primary/30 hover:shadow-glow";

function RecoveryCard() {
  const areas = [
    { name: "Grip & Forearms", value: 32, note: "Yesterday's Climbing" },
    { name: "Shoulders", value: 58, note: "Climbing + Push Day" },
    { name: "Legs", value: 88, note: "Fully recovered" },
    { name: "Core", value: 74, note: "Light fatigue" },
  ];
  const [sel, setSel] = useState(0);
  const score = 78, r = 54, c = 2 * Math.PI * r;
  return (
    <section className={`${card} h-full`}>
      <h2 className="font-semibold">Recovery Score</h2>
      <div className="mt-4 flex items-center gap-5">
        <div className="relative size-36 shrink-0">
          <svg viewBox="0 0 128 128" className="size-full -rotate-90">
            <circle cx="64" cy="64" r={r} strokeWidth="10" className="fill-none stroke-muted" />
            <circle cx="64" cy="64" r={r} strokeWidth="10" strokeLinecap="round" strokeDasharray={c}
              strokeDashoffset={c * (1 - score / 100)} className="fill-none stroke-primary transition-all duration-700" />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div><p className="font-display text-3xl font-bold">{score}%</p><p className="text-xs text-primary">Ready</p></div>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-energy/10 p-3 text-sm text-energy">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <p><b>Grip & Forearms</b> need rest today due to yesterday's Climbing!</p>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {areas.map((a, i) => {
          const low = a.value < 50, mid = a.value < 70;
          return (
            <button key={a.name} onClick={() => setSel(i)}
              className={`w-full rounded-xl border p-3 text-left transition hover:bg-muted ${sel === i ? "border-primary/50 bg-muted" : "border-transparent"}`}>
              <div className="flex justify-between text-sm">
                <span>{a.name}</span>
                <span className={low ? "text-energy" : mid ? "text-chart-4" : "text-primary"}>{a.value}%</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${low ? "bg-energy" : mid ? "bg-chart-4" : "bg-primary"}`} style={{ width: `${a.value}%` }} />
              </div>
              {sel === i && <p className="mt-1.5 text-xs text-muted-foreground">{a.note}</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function RecommendationCard() {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);
  const rec = recs[i] ?? recs[0]!;
  const Icon = icons[rec.sport];
  return (
    <section className={`${card} relative h-full overflow-hidden`}>
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-pulse opacity-20 blur-3xl" />
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold"><Sparkles className="size-4 text-energy" /> Recommended Today</h2>
        <button onClick={() => { setI((i + 1) % recs.length); setStarted(false); }}
          className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary hover:text-primary">
          <RefreshCw className="size-3.5" /> Another idea
        </button>
      </div>
      <div key={i} className="mt-6 flex animate-in fade-in slide-in-from-bottom-2 flex-col gap-5 duration-500 sm:flex-row sm:items-center">
        <span className={`grid size-20 shrink-0 place-items-center rounded-3xl ${tagColor[rec.sport]}`}><Icon className="size-9" /></span>
        <div className="flex-1">
          <p className="font-display text-2xl font-bold md:text-3xl">{rec.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{rec.why}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1"><Clock className="size-3" />{rec.mins} min</span>
            <span className="rounded-full bg-muted px-2.5 py-1">{rec.intensity}</span>
          </div>
        </div>
      </div>
      <button onClick={() => setStarted((s) => !s)}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold transition active:scale-[0.98] ${started ? "bg-muted text-primary" : "bg-primary text-primary-foreground hover:brightness-110"}`}>
        {started ? <><Check className="size-4" /> Added to today's plan</> : "Start this workout"}
      </button>
    </section>
  );
}

function WeeklyBreakdown() {
  const [hover, setHover] = useState<Sport | null>(null);
  const totals = SPORTS.map((s) => ({ s, m: week.reduce((a, d) => a + d.mins[s], 0) }));
  const total = totals.reduce((a, t) => a + t.m, 0);
  const max = Math.max(...week.map((d) => SPORTS.reduce((a, s) => a + d.mins[s], 0)));
  return (
    <section className={card}>
      <div className="flex items-baseline justify-between">
        <h2 className="font-semibold">Weekly Activity</h2>
        <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{Math.floor(total / 60)}h {total % 60}m</span> total</p>
      </div>
      <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-muted">
        {totals.map(({ s, m }) => (
          <div key={s} className={`${barColor[s]} transition-opacity ${hover && hover !== s ? "opacity-25" : ""}`} style={{ width: `${(m / total) * 100}%` }} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {totals.map(({ s, m }) => (
          <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(null)} onClick={() => setHover(hover === s ? null : s)}
            className={`rounded-xl border p-2.5 text-left transition hover:bg-muted ${hover === s ? "border-primary/50 bg-muted" : ""}`}>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className={`size-2 rounded-full ${barColor[s]}`} />{s}</div>
            <p className="mt-1 font-semibold">{m} min <span className="text-xs font-normal text-muted-foreground">{Math.round((m / total) * 100)}%</span></p>
          </button>
        ))}
      </div>
      <div className="mt-6 flex h-44 items-end gap-2 sm:gap-4">
        {week.map((d) => {
          const sum = SPORTS.reduce((a, s) => a + d.mins[s], 0);
          return (
            <div key={d.day} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[10px] text-muted-foreground opacity-0 transition group-hover:opacity-100">{sum}m</span>
              <div className="flex w-full max-w-10 flex-col-reverse overflow-hidden rounded-lg transition group-hover:scale-105" style={{ height: `${(sum / max) * 100}%` }}>
                {SPORTS.map((s) => d.mins[s] > 0 && (
                  <div key={s} className={`${barColor[s]} transition-opacity ${hover && hover !== s ? "opacity-20" : ""}`} style={{ height: `${(d.mins[s] / sum) * 100}%` }} />
                ))}
              </div>
              {sum === 0 && <div className="h-1 w-full max-w-10 rounded bg-muted" />}
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WorkoutFeed() {
  const [filter, setFilter] = useState<Sport | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = workouts.filter((w) => filter === "All" || w.sport === filter);
  return (
    <section className={`${card} h-full`}>
      <h2 className="font-semibold">Recent Workouts</h2>
      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
        {(["All", ...SPORTS] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs transition ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{f}</button>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {list.map((w) => {
          const Icon = icons[w.sport];
          return (
            <li key={w.id}>
              <button onClick={() => setOpen(open === w.id ? null : w.id)}
                className="w-full rounded-xl border bg-surface p-3 text-left transition hover:-translate-y-0.5 hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tagColor[w.sport]}`}><Icon className="size-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{w.title}</p>
                    <span className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[11px] font-medium ${tagColor[w.sport]}`}>{w.sport} · {w.tag}</span>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{w.when}</span>
                </div>
                {open === w.id && (
                  <div className="mt-3 flex animate-in fade-in gap-4 border-t pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="size-3.5" />{w.mins} min</span>
                    <span className="flex items-center gap-1"><Flame className="size-3.5 text-energy" />{w.kcal} kcal</span>
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
