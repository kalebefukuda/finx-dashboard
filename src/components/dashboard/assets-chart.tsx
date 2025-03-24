
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { TrendingUp } from "lucide-react"

const chartData = [
  { month: "Jan", patrimonio: 95000 },
  { month: "Fev", patrimonio: 98000 },
  { month: "Mar", patrimonio: 102000 },
  { month: "Abr", patrimonio: 107000 },
  { month: "Mai", patrimonio: 110000 },
  { month: "Jun", patrimonio: 118000 },
  { month: "Jul", patrimonio: 125000 },
  { month: "Ago", patrimonio: 130000 },
  { month: "Set", patrimonio: 134000 },
  { month: "Out", patrimonio: 138000 },
  { month: "Nov", patrimonio: 142000 },
  { month: "Dez", patrimonio: 145890 },
]

type CustomChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    valueFormatter?: (value: number) => string
  }
}


const chartConfig: CustomChartConfig = {
  patrimonio: {
    label: "Patrimônio",
    color: "hsl(var(--primary))",
    valueFormatter: (value: number) =>
      `R$ ${value.toLocaleString("pt-BR")}`,
  },
}

export function AssetsChart() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Evolução do Patrimônio</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  valueFormatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
                />
              }
            />


            <Bar dataKey="patrimonio" fill="var(--color-primary-hover-dark)" radius={8} />
          </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
