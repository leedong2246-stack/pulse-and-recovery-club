export const user = { name: "Alex", initials: "AK" };

export type Sport = "Gym" | "Running" | "Climbing" | "Soccer";

export const sportColors: Record<Sport, string> = {
  Gym: "bg-primary/15 text-primary",
  Running: "bg-energy/15 text-energy",
  Climbing: "bg-primary/15 text-primary",
  Soccer: "bg-energy/15 text-energy",
};

export const stats = [
  { label: "Recovery", value: "82%", hint: "Ready to train" },
  { label: "Weekly load", value: "1,240", hint: "+12% vs last wk" },
  { label: "Sleep", value: "7h 40m", hint: "Avg this week" },
  { label: "Streak", value: "9 days", hint: "Keep it up" },
];

export const weekLoad = [
  { day: "Mon", value: 60 }, { day: "Tue", value: 85 }, { day: "Wed", value: 30 },
  { day: "Thu", value: 95 }, { day: "Fri", value: 45 }, { day: "Sat", value: 100 }, { day: "Sun", value: 20 },
];

export const recentActivities: { sport: Sport; title: string; detail: string; when: string; load: number }[] = [
  { sport: "Running", title: "Tempo Run", detail: "8.2 km · 5:02 /km", when: "Today", load: 180 },
  { sport: "Gym", title: "Lower Body Strength", detail: "Squat 5×5 @ 110kg", when: "Yesterday", load: 220 },
  { sport: "Climbing", title: "Bouldering Session", detail: "Top grade V5 · 90 min", when: "Sat", load: 160 },
  { sport: "Soccer", title: "5-a-side Match", detail: "60 min · 2 goals", when: "Fri", load: 240 },
];

export const muscleFatigue = [
  { area: "Legs", value: 78 }, { area: "Back", value: 40 }, { area: "Forearms", value: 65 }, { area: "Shoulders", value: 30 },
];

export const mates = [
  { name: "Jordan Lee", sport: "Climbing" as Sport, level: "Intermediate", distance: "1.2 km", initials: "JL" },
  { name: "Sam Rivera", sport: "Running" as Sport, level: "Advanced", distance: "2.5 km", initials: "SR" },
  { name: "Priya Shah", sport: "Gym" as Sport, level: "Beginner", distance: "0.8 km", initials: "PS" },
  { name: "Diego Alves", sport: "Soccer" as Sport, level: "Advanced", distance: "3.1 km", initials: "DA" },
];
