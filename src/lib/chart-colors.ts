export const CHART_COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  accent: "hsl(var(--chart-3))",
  warning: "hsl(var(--chart-4))",
  destructive: "hsl(var(--chart-5))",
  info: "hsl(var(--chart-6))",
  success: "hsl(var(--chart-7))",
  muted: "hsl(var(--chart-8))",
  purple: "hsl(var(--chart-9))",
  orange: "hsl(var(--chart-10))",
} as const;

export const CHART_COLOR_ARRAY = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-10))",
] as const;

export function getChartColor(index: number): string {
  return CHART_COLOR_ARRAY[index % CHART_COLOR_ARRAY.length];
}

export function getChartColorByKey(key: string): string {
  const hash = key.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return CHART_COLOR_ARRAY[Math.abs(hash) % CHART_COLOR_ARRAY.length];
}
