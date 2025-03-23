import type React from "react"
import { useState, useEffect } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

const assetTypes = [
  { value: "stocks", label: "Ações" },
  { value: "fiis", label: "FIIs" },
  { value: "fixed-income", label: "Renda Fixa" },
  { value: "crypto", label: "Criptomoedas" },
]

const fiiAssets = [
  { value: "MXRF11", label: "MXRF11 - Maxi Renda" },
  { value: "HGLG11", label: "HGLG11 - CSHG Logística" },
  { value: "KNIP11", label: "KNIP11 - Kinea Índice de Preços" },
  { value: "XPLG11", label: "XPLG11 - XP Log" },
]

const fixedIncomeAssets = [
  { value: "CDB_XYZ", label: "CDB Banco XYZ" },
  { value: "SELIC_2026", label: "Tesouro Selic 2026" },
  { value: "IPCA_2028", label: "Tesouro IPCA+ 2028" },
  { value: "LCI_ABC", label: "LCI Banco ABC" },
]

const operationTypes = [
  { value: "buy", label: "Compra" },
  { value: "sell", label: "Venda" },
]

export function TransactionModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [assetType, setAssetType] = useState("")
  const [asset, setAsset] = useState("")
  const [operationType, setOperationType] = useState("buy")
  const [date, setDate] = useState<Date>(new Date())
  const [openAssetTypeCombobox, setOpenAssetTypeCombobox] = useState(false)
  const [openAssetCombobox, setOpenAssetCombobox] = useState(false)
  const [stockAssets, setStockAssets] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch("https://brapi.dev/api/quote/list?sortBy=name&sortOrder=asc")
        const data = await res.json()
        const stocks = Array.isArray(data.stocks)
            ? data.stocks.map((stock: any) => ({
                value: stock.symbol,
                label: `${stock.symbol} - ${stock.name}`,
                }))
            : []

        setStockAssets(stocks)
      } catch (error) {
        console.error("Erro ao buscar ações:", error)
      }
    }

    fetchStocks()
  }, [])

  const getAssetsByType = (type: string) => {
    switch (type) {
      case "stocks":
        return stockAssets
      case "fiis":
        return fiiAssets
      case "fixed-income":
        return fixedIncomeAssets
      default:
        return []
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado")
    setOpen(false)
    setAssetType("")
    setAsset("")
    setOperationType("buy")
    setDate(new Date())
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Lançamento</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 mt-5">
            <div className="grid gap-2">
              <Label>Tipo de Operação</Label>
              <RadioGroup value={operationType} onValueChange={setOperationType} className="flex gap-4">
                {operationTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label
                      htmlFor={type.value}
                      className={cn(type.value === "buy" ? "text-emerald-500" : "text-rose-500", "font-medium")}
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label>Tipo de Ativo</Label>
              <Popover open={openAssetTypeCombobox} onOpenChange={setOpenAssetTypeCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openAssetTypeCombobox}
                    className="justify-between"
                  >
                    {assetType
                      ? assetTypes.find((type) => type.value === assetType)?.label
                      : "Selecione o tipo de ativo"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar tipo..." />
                    <CommandList>
                      <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
                      <CommandGroup>
                        {assetTypes.map((type) => (
                          <CommandItem
                            key={type.value}
                            value={type.value}
                            onSelect={(currentValue) => {
                              setAssetType(currentValue === assetType ? "" : currentValue)
                              setAsset("")
                              setOpenAssetTypeCombobox(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", assetType === type.value ? "opacity-100" : "opacity-0")}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label>Ativo</Label>
              <Popover open={openAssetCombobox} onOpenChange={setOpenAssetCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openAssetCombobox}
                    className="justify-between"
                    disabled={!assetType}
                  >
                    {asset
                      ? getAssetsByType(assetType).find((a) => a.value === asset)?.label
                      : "Selecione o ativo"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar ativo..." />
                    <CommandList>
                      <CommandEmpty>Nenhum ativo encontrado.</CommandEmpty>
                      <CommandGroup>
                        {getAssetsByType(assetType).map((a) => (
                          <CommandItem
                            key={a.value}
                            value={a.value}
                            onSelect={(currentValue) => {
                              setAsset(currentValue === asset ? "" : currentValue)
                              setOpenAssetCombobox(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", a.value === asset ? "opacity-100" : "opacity-0")}
                            />
                            {a.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input id="quantity" type="number" step="0.00000001" min="0" placeholder="0" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Preço Unitário (R$)</Label>
              <Input id="price" type="number" step="0.01" min="0" placeholder="0,00" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea id="notes" placeholder="Adicione notas sobre esta operação" className="resize-none" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Operação</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
