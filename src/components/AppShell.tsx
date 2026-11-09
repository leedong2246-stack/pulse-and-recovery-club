import { Link } from "@tanstack/react-router";
import { LayoutDashboard, PlusCircle, BrainCircuit, Users, Plus, Activity } from "lucide-react";
import type { ReactNode } from "react";
import { user } from "@/lib/mock-data";

const tabs = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/log", label: "Log Activity", icon: PlusCircle },
  { to: "/recovery", label: "Recovery AI", icon: BrainCircuit },
  { to: "/mates", label: "Mate Finder", icon: Users },
] as const;

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-surface p-5 md:flex">
        <Link to="/" className="mb-10 flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-pulse text-primary-foreground shadow-glow">
            <Activity className="size-5" />
          </span>
          <span className="font-display text-xl font-bold">PulseBalance</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {tabs.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: true }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-primary/10 !text-primary" }}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border bg-card p-4">
          <p className="text-xs text-muted-foreground">Weekly goal</p>
          <p className="mt-1 font-display text-lg font-semibold">4 / 5 sessions</p>
          <div className="mt-3 h-2 rounded-full bg-muted">
            <div className="h-2 w-4/5 rounded-full bg-pulse" />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/80 px-4 py-3 backdrop-blur md:px-8">
          <div className="grid size-10 place-items-center rounded-full bg-pulse font-display font-bold text-primary-foreground">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Hey, {user.name} 👋</p>
            <p className="text-xs text-muted-foreground">{today}</p>
          </div>
          <Link
            to="/log"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
          >
            <Plus className="size-4" /> <span className="hidden sm:inline">Log Workout</span><span className="sm:hidden">Log</span>
          </Link>
        </header>

        <main className="flex-1 px-4 pb-28 pt-5 md:px-8 md:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t bg-surface/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {tabs.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: true }}
            className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground"
            activeProps={{ className: "!text-primary" }}
          >
            <Icon className="size-5" />
            {label.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
