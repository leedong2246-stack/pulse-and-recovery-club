import { createFileRoute } from "@tanstack/react-router";
import { Dumbbell, Footprints, Mountain, Trophy } from "lucide-react";
import { stats, weekLoad, recentActivities, muscleFatigue, sportColors, type Sport } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · PulseBalance" },
      { name: "description", content: "Your training load, recovery and recent sessions at a glance." },
      { property: "og:title", content: "Dashboard · PulseBalance" },
      { property: "og:description", content: "Your training load, recovery and recent sessions at a glance." },
    ],
  }),
  component: Dashboard,
});

export const sportIcons: Record<Sport, typeof Dumbbell> = {
  Gym: Dumbbell, Running: Footprints, Climbing: Mountain, Soccer: Trophy,
};

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Today's <span className="text-pulse">Balance</span></h1>
        <p className="text-sm text-muted-foreground">You're well recovered — a great day for intensity.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`rounded-2xl border bg-card p-4 ${i === 0 ? "shadow-glow" : ""}`}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${i === 0 ? "text-primary" : ""}`}>{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border bg-card p-5 lg:col-span-2">
          <h2 className="font-semibold">Weekly training load</h2>
          <div className="mt-6 flex h-40 items-end gap-3">
            {weekLoad.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-lg bg-pulse" style={{ height: `${d.value}%` }} />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5">
          <h2 className="font-semibold">Muscle fatigue</h2>
          <div className="mt-5 space-y-4">
            {muscleFatigue.map((m) => (
              <div key={m.area}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span>{m.area}</span>
                  <span className={m.value > 60 ? "text-energy" : "text-primary"}>{m.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className={`h-2 rounded-full ${m.value > 60 ? "bg-energy" : "bg-primary"}`} style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border bg-card p-5">
        <h2 className="font-semibold">Recent activity</h2>
        <ul className="mt-4 divide-y">
          {recentActivities.map((a) => {
            const Icon = sportIcons[a.sport];
            return (
              <li key={a.title} className="flex items-center gap-3 py-3">
                <span className={`grid size-11 place-items-center rounded-xl ${sportColors[a.sport]}`}><Icon className="size-5" /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{a.load}</p>
                  <p className="text-xs text-muted-foreground">{a.when}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
