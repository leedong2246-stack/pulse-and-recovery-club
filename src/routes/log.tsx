import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Dumbbell, Footprints, Mountain, Trophy } from "lucide-react";
import type { Sport } from "@/lib/mock-data";

export const Route = createFileRoute("/log")({
  head: () => ({
    meta: [
      { title: "Log Activity · PulseBalance" },
      { name: "description", content: "Log a gym, running, climbing or soccer session." },
      { property: "og:title", content: "Log Activity · PulseBalance" },
      { property: "og:description", content: "Log a gym, running, climbing or soccer session." },
    ],
  }),
  component: LogPage,
});

const sports: { name: Sport; icon: typeof Dumbbell }[] = [
  { name: "Gym", icon: Dumbbell }, { name: "Running", icon: Footprints },
  { name: "Climbing", icon: Mountain }, { name: "Soccer", icon: Trophy },
];

function LogPage() {
  const [sport, setSport] = useState<Sport>("Gym");
  const [rpe, setRpe] = useState(7);
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Log Activity</h1>
      <div className="grid grid-cols-4 gap-2">
        {sports.map(({ name, icon: Icon }) => (
          <button key={name} onClick={() => setSport(name)}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-xs font-medium transition ${sport === name ? "border-primary bg-primary/10 text-primary shadow-glow" : "bg-card text-muted-foreground"}`}>
            <Icon className="size-6" />{name}
          </button>
        ))}
      </div>
      <div className="space-y-4 rounded-2xl border bg-card p-5">
        <label className="block text-sm">Duration (min)
          <input type="number" defaultValue={60} className="mt-1.5 w-full rounded-xl border bg-input/40 px-3 py-2.5 outline-none focus:border-primary" />
        </label>
        <label className="block text-sm">Notes
          <textarea rows={3} placeholder={`How did your ${sport.toLowerCase()} session go?`} className="mt-1.5 w-full rounded-xl border bg-input/40 px-3 py-2.5 outline-none focus:border-primary" />
        </label>
        <label className="block text-sm">Effort (RPE): <span className="font-semibold text-energy">{rpe}</span>
          <input type="range" min={1} max={10} value={rpe} onChange={(e) => setRpe(+e.target.value)} className="mt-2 w-full accent-[var(--energy)]" />
        </label>
        <button className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground shadow-glow">Save session</button>
      </div>
    </div>
  );
}
