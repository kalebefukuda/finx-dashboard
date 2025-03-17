import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, ChevronRight, TrendingDown, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type FinancialItem = {
  category: string
  amount: number
  percentage: number
}

const incomeItems: FinancialItem[] = [
  { category: "Salário", amount: 6500, percentage: 76.92 },
  { category: "Investimentos", amount: 1250, percentage: 14.79 },
  { category: "Freelance", amount: 700, percentage: 8.29 },
  { category: "Aluguel", amount: 1800, percentage: 21.18 },
  { category: "Dividendos", amount: 450, percentage: 5.29 },
]

const expenseItems: FinancialItem[] = [
  { category: "Moradia", amount: 2500, percentage: 41.67 },
  { category: "Alimentação", amount: 1200, percentage: 20.0 },
  { category: "Transporte", amount: 800, percentage: 13.33 },
  { category: "Lazer", amount: 600, percentage: 10.0 },
  { category: "Saúde", amount: 500, percentage: 8.33 },
  { category: "Outros", amount: 400, percentage: 6.67 },
]

export function MonthlySummary() {
  const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0)
  const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0)
  const balance = totalIncome - totalExpense
  const savingsRate = (balance / totalIncome) * 100

  // Limitar a 3 itens para exibição
  const visibleIncomeItems = incomeItems.slice(0, 3)
  const visibleExpenseItems = expenseItems.slice(0, 3)

  // Verificar se há mais itens além dos exibidos
  const hasMoreIncomeItems = incomeItems.length > 3
  const hasMoreExpenseItems = expenseItems.length > 3

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-emerald-50 dark:bg-emerald-950/20 py-5 px-6 -mx-6 -mt-6 rounded-t-md">
          <div className="flex items-center justify-between px-6">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500 mr-2" />
              Entradas
            </CardTitle>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(totalIncome)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-4 relative">
          <div className="space-y-4">
            {visibleIncomeItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="font-semibold tabular-nums">{formatCurrency(item.amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="h-2" indicatorClassName="bg-emerald-500" />
                  <span className="text-xs text-muted-foreground w-10 text-right tabular-nums">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {hasMoreIncomeItems && (
            <div className="mt-4 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none h-16 -mt-16"></div>
              <Link href="/lancamentos" className="w-full">
                <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                  Ver todos
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}

          <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <span>Comparado ao mês anterior</span>
            <div className="flex items-center text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span className="font-medium">+12%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="bg-rose-50 dark:bg-rose-950/20 py-5 px-6 -mx-6 -mt-6 rounded-t-md">
          <div className="flex items-center justify-between px-6">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-rose-500 mr-2" />
              Saídas
            </CardTitle>
            <span className="text-xl font-bold text-rose-600 dark:text-rose-400">{formatCurrency(totalExpense)}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-4 relative">
          <div className="space-y-4">
            {visibleExpenseItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="font-semibold tabular-nums">{formatCurrency(item.amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="h-2" indicatorClassName="bg-rose-500" />
                  <span className="text-xs text-muted-foreground w-10 text-right tabular-nums">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {hasMoreExpenseItems && (
            <div className="mt-4 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none h-16 -mt-16"></div>
              <Link href="/lancamentos" className="w-full">
                <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                  Ver todos
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}

          <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <span>Comparado ao mês anterior</span>
            <div className="flex items-center text-rose-500">
              <ArrowDownLeft className="mr-1 h-3 w-3" />
              <span className="font-medium">-5%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Saldo do Mês</h3>
              <p
                className={`text-2xl font-bold ${balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
              >
                {formatCurrency(balance)}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Taxa de Economia</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{savingsRate.toFixed(1)}%</span>
                <div className="text-xs text-muted-foreground">da renda</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Progresso da Meta</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Economizar 30% da renda</span>
                  <span className="font-medium">{savingsRate.toFixed(1)}%</span>
                </div>
                <Progress
                  value={savingsRate}
                  max={30}
                  className="h-2"
                  indicatorClassName={savingsRate >= 30 ? "bg-emerald-500" : "bg-amber-500"}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

