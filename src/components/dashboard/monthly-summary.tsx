import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react"

export function MonthlySummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Entradas (Receitas)</CardTitle>
          <TrendingUp className="h-5 w-5 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 8.450,00</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                <span>Salário</span>
              </div>
              <div className="font-medium">R$ 6.500,00</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                <span>Investimentos</span>
              </div>
              <div className="font-medium">R$ 1.250,00</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                <span>Freelance</span>
              </div>
              <div className="font-medium">R$ 700,00</div>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500 font-medium">+12%</span>
            <span className="ml-1">em relação ao mês anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-rose-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Saídas (Despesas)</CardTitle>
          <TrendingDown className="h-5 w-5 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 6.000,00</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-rose-500"></div>
                <span>Moradia</span>
              </div>
              <div className="font-medium">R$ 2.500,00</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-rose-500"></div>
                <span>Alimentação</span>
              </div>
              <div className="font-medium">R$ 1.200,00</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-rose-500"></div>
                <span>Transporte</span>
              </div>
              <div className="font-medium">R$ 800,00</div>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <ArrowDownLeft className="mr-1 h-3 w-3 text-rose-500" />
            <span className="text-rose-500 font-medium">-5%</span>
            <span className="ml-1">em relação ao mês anterior</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

