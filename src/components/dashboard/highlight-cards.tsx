import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Wallet, TrendingUp } from "lucide-react"

export function HighlightCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Atual</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 12.580,45</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500 font-medium">+2.5%</span>
            <span className="ml-1">desde o mês passado</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Patrimônio Líquido</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 145.890,00</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500 font-medium">+5.2%</span>
            <span className="ml-1">desde o mês passado</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

