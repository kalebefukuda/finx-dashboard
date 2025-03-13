import { AssetsList } from "@/components/dashboard/assets-list"
import { MonthlySummary } from "@/components/dashboard/monthly-summary"
import { HighlightCards } from "@/components/dashboard/highlight-cards"
import { TransactionModal } from "@/components/dashboard/transaction-modal"
import { Button } from "@/components/ui/button"
import { Plus, SlidersHorizontal } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen overflow-auto bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filtros</span>
            </Button>
            <TransactionModal>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Adicionar Lançamento</span>
              </Button>
            </TransactionModal>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6 flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Highlight Cards - Full width on mobile, 3 columns on desktop */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <HighlightCards />
          </div>

          {/* Assets Chart - Full width */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <AssetsChart />
          </div>

          {/* Monthly Summary - Full width */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <MonthlySummary />
          </div>

          {/* Assets List - Full width */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <AssetsList />
          </div>
        </div>
      </main>
    </div>
  )
}

