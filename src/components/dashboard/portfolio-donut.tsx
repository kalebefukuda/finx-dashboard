import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { name: "FIIs", value: 5839, color: "#4F46E5" },
  { name: "Ações", value: 2076, color: "#A3E635" },
  { name: "Renda Fixa", value: 1177, color: "#FACC15" },
  { name: "Criptos", value: 786, color: "#F87171" },
  { name: "ETFs", value: 122, color: "#5EEAD4" },
]

const chartConfig = {
  FIIs: { label: "FIIs", color: "#4F46E5" },
  Ações: { label: "Ações", color: "#A3E635" },
  "Renda Fixa": { label: "Renda Fixa", color: "#FACC15" },
  Criptos: { label: "Criptos", color: "#F87171" },
  ETFs: { label: "ETFs", color: "#5EEAD4" },
} satisfies ChartConfig

export function PortfolioDonutChart() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Ativos na carteira</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={50}
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${(percent * 100).toFixed(2)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
