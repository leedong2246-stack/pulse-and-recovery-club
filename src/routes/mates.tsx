import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { mates, sportColors } from "@/lib/mock-data";

export const Route = createFileRoute("/mates")({
  head: () => ({
    meta: [
      { title: "Mate Finder · PulseBalance" },
      { name: "description", content: "Find training partners nearby for gym, running, climbing and soccer." },
      { property: "og:title", content: "Mate Finder · PulseBalance" },
      { property: "og:description", content: "Find training partners nearby for gym, running, climbing and soccer." },
    ],
  }),
  component: MatesPage,
});

function MatesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Mate Finder</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {mates.map((m) => (
          <div key={m.name} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
            <div className="grid size-12 place-items-center rounded-full bg-pulse font-display font-bold text-primary-foreground">{m.initials}</div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{m.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className={`rounded-full px-2 py-0.5 ${sportColors[m.sport]}`}>{m.sport}</span>
                <span className="text-muted-foreground">{m.level}</span>
                <span className="flex items-center gap-0.5 text-muted-foreground"><MapPin className="size-3" />{m.distance}</span>
              </div>
            </div>
            <button className="rounded-full border border-primary px-3 py-1.5 text-xs font-semibold text-primary">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}
