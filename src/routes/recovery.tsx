import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Moon, HeartPulse, Sparkles } from "lucide-react";

export const Route = createFileRoute("/recovery")({
  head: () => ({
    meta: [
      { title: "Recovery AI · PulseBalance" },
      { name: "description", content: "Smart recovery insights tailored to your multi-sport training." },
      { property: "og:title", content: "Recovery AI · PulseBalance" },
      { property: "og:description", content: "Smart recovery insights tailored to your multi-sport training." },
    ],
  }),
  component: RecoveryPage,
});

const tips = [
  { icon: Moon, title: "Prioritise sleep", text: "Aim for 8h tonight — legs are carrying 78% fatigue from squats and soccer." },
  { icon: HeartPulse, title: "Easy cardio tomorrow", text: "A 30-min zone 2 run will flush your legs without adding load." },
  { icon: Sparkles, title: "Forearm care", text: "Do 5 min of wrist flexor stretches before your next climbing session." },
];

function RecoveryPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-3xl border bg-card p-6 shadow-glow">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-pulse text-primary-foreground"><BrainCircuit /></span>
          <div>
            <h1 className="text-2xl font-bold">Recovery AI</h1>
            <p className="text-sm text-muted-foreground">Readiness score: <span className="font-semibold text-primary">82 / 100</span></p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {tips.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border bg-card p-5">
            <Icon className="size-6 text-energy" />
            <h3 className="mt-3 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
