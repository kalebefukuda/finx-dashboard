"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionModal } from "@/components/dashboard/transaction-modal"
import { ArrowDownLeft, ArrowUpRight, Calendar, ChevronLeft, ChevronRight, Download, Plus, RefreshCcw, Search } from "lucide-react"
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

type TransactionType = "income" | "expense" | "all"
type ViewMode = "month" | "week" | "category"

type Transaction = {
  id: string
  description: string
  date: Date
  amount: number
  type: "income" | "expense"
  category: {
    id: string
    name: string
  }
  paymentMethod: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TransactionType>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date())

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/transactions")
      const data = await res.json()
      const formatted = data.map((t: any) => ({
        ...t,
        date: new Date(t.date),
      }))
      setTransactions(formatted)
    } catch (err) {
      console.error("Erro ao buscar transações:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab !== "all" && transaction.type !== activeTab) return false
    if (viewMode === "month") {
      const isSameMonth =
        transaction.date.getMonth() === currentDate.getMonth() &&
        transaction.date.getFullYear() === currentDate.getFullYear()
      if (!isSameMonth) return false
    } else if (viewMode === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 })
      const end = endOfWeek(currentDate, { weekStartsOn: 1 })
      if (!isWithinInterval(transaction.date, { start, end })) return false
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.name.toLowerCase().includes(query) ||
        transaction.paymentMethod.toLowerCase().includes(query)
      )
    }
    return true
  })

  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  const groupTransactions = () => {
    const grouped: Record<string, Transaction[]> = {}
    filteredTransactions.forEach((transaction) => {
      const key =
        viewMode === "category"
          ? transaction.category.name
          : format(transaction.date, "dd/MM/yyyy")
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(transaction)
    })
    return grouped
  }

  const groupedTransactions = groupTransactions()

  // Navegar entre períodos
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() - 1)
    else if (viewMode === "week") newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() + 1)
    else if (viewMode === "week") newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const formatCurrency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  const getPeriodLabel = () => {
    if (viewMode === "month") return format(currentDate, "MMMM yyyy", { locale: ptBR })
    if (viewMode === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 })
      const end = endOfWeek(currentDate, { weekStartsOn: 1 })
      return `${format(start, "dd/MM", { locale: ptBR })} - ${format(end, "dd/MM", { locale: ptBR })}`
    }
    return format(currentDate, "MMMM yyyy", { locale: ptBR })
  }


  return (
    <div className="flex flex-col h-screen overflow-auto bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <h1 className="text-xl font-semibold">Lançamentos</h1>
          <div className="flex items-center gap-2">
            <TransactionModal>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Adicionar Lançamento</span>
              </Button>
            </TransactionModal>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 flex-1">
        <div className="space-y-6">
          {/* Resumo e Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Receitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(totalIncome)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                  {formatCurrency(totalExpense)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Saldo</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                  )}
                >
                  {formatCurrency(balance)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controles */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as TransactionType)}
                className="w-full md:w-auto"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="income">Receitas</TabsTrigger>
                  <TabsTrigger value="expense">Despesas</TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs
                value={viewMode}
                onValueChange={(value) => setViewMode(value as ViewMode)}
                className="w-full md:w-auto"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="month">Mês</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="category">Categoria</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar lançamentos..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="outline" size="icon" onClick={fetchTransactions}>
                <RefreshCcw className="h-4 w-4" />
                <span className="sr-only">Atualizar</span>
            </Button>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Exportar</span>
              </Button>
            </div>
          </div>

          {/* Navegação de período */}
          {viewMode !== "category" && (
            <div className="flex justify-between items-center">
              <Button variant="ghost" size="sm" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                {viewMode === "month" ? "Mês anterior" : "Semana anterior"}
              </Button>

              <div className="font-medium text-lg">{getPeriodLabel()}</div>

              <Button variant="ghost" size="sm" onClick={goToNext}>
                {viewMode === "month" ? "Próximo mês" : "Próxima semana"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Lista de transações */}
          {Object.keys(groupedTransactions).length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">Nenhum lançamento encontrado</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                {searchQuery
                  ? "Tente ajustar sua pesquisa ou filtros."
                  : "Não há lançamentos para o período selecionado."}
              </p>
              <TransactionModal>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Lançamento
                </Button>
              </TransactionModal>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedTransactions).map(([groupKey, groupTransactions]) => (
                <Card key={groupKey}>
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      {viewMode === "category" ? (
                        <span>{groupKey}</span>
                      ) : (
                        <>
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {groupKey}
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {groupTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full",
                                transaction.type === "income"
                                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                                  : "bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
                              )}
                            >
                              {transaction.type === "income" ? (
                                <ArrowUpRight className="h-5 w-5" />
                              ) : (
                                <ArrowDownLeft className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{transaction.description}</div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {viewMode === "category" && <span>{format(transaction.date, "dd/MM/yyyy")}</span>}
                                <span>{transaction.category.name}</span>
                                <span>•</span>
                                <span>{transaction.paymentMethod}</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className={cn(
                              "font-medium",
                              transaction.type === "income"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-rose-600 dark:text-rose-400",
                            )}
                          >
                            {transaction.type === "income" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

