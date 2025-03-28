"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { Toaster, toast } from "sonner"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"


const paymentMethods = [
  { value: "pix", label: "PIX" },
  { value: "credit_card", label: "Cartão de Crédito" },
  { value: "debit_card", label: "Cartão de Débito" },
  { value: "cash", label: "Dinheiro" },
  { value: "bank_transfer", label: "Transferência Bancária" },
  { value: "boleto", label: "Boleto" },
]

const assetTypes = [
  { value: "stocks", label: "Ações" },
  { value: "fiis", label: "FIIs" },
  { value: "fixed_income", label: "Renda Fixa" },
  { value: "crypto", label: "Criptomoedas" },
  { value: "international", label: "Investimentos Internacionais" },
]

const assetsByType = {
  stocks: [
    { value: "PETR4", label: "PETR4 - Petrobras PN" },
    { value: "VALE3", label: "VALE3 - Vale ON" },
    { value: "ITUB4", label: "ITUB4 - Itaú PN" },
    { value: "BBDC4", label: "BBDC4 - Bradesco PN" },
  ],
  fiis: [
    { value: "MXRF11", label: "MXRF11 - Maxi Renda" },
    { value: "HGLG11", label: "HGLG11 - CSHG Logística" },
    { value: "KNIP11", label: "KNIP11 - Kinea Índice de Preços" },
    { value: "XPLG11", label: "XPLG11 - XP Log" },
  ],
  fixed_income: [
    { value: "CDB_XYZ", label: "CDB Banco XYZ" },
    { value: "SELIC_2026", label: "Tesouro Selic 2026" },
    { value: "IPCA_2028", label: "Tesouro IPCA+ 2028" },
    { value: "LCI_ABC", label: "LCI Banco ABC" },
  ],
  crypto: [
    { value: "BTC", label: "Bitcoin (BTC)" },
    { value: "ETH", label: "Ethereum (ETH)" },
    { value: "SOL", label: "Solana (SOL)" },
    { value: "ADA", label: "Cardano (ADA)" },
  ],
  international: [
    { value: "AAPL", label: "Apple (AAPL)" },
    { value: "MSFT", label: "Microsoft (MSFT)" },
    { value: "AMZN", label: "Amazon (AMZN)" },
    { value: "GOOGL", label: "Alphabet (GOOGL)" },
  ],
}

const investmentOperationTypes = [
  { value: "buy", label: "Compra" },
  { value: "sell", label: "Venda" },
]

type Category = {
  id: string
  name: string
  type: "income" | "expense" | "investment"
  isDefault: boolean
  userId?: string | null
}

export function TransactionModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("finance")
  const [transactionType, setTransactionType] = useState("expense")
  const [category, setCategory] = useState("")
  const [openCategoryCombobox, setOpenCategoryCombobox] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [openPaymentMethodCombobox, setOpenPaymentMethodCombobox] = useState(false)
  const [operationType, setOperationType] = useState("buy")
  const [assetType, setAssetType] = useState("")
  const [openAssetTypeCombobox, setOpenAssetTypeCombobox] = useState(false)
  const [asset, setAsset] = useState("")
  const [openAssetCombobox, setOpenAssetCombobox] = useState(false)
  const [amount, setAmount] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unitPrice, setUnitPrice] = useState("")
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories)
  }, [])

  const getAssetsByType = (type: string) => {
    return assetsByType[type as keyof typeof assetsByType] || []
  }

  const resetForm = () => {
    setTransactionType("expense")
    setCategory("")
    setPaymentMethod("")
    setOperationType("buy")
    setAssetType("")
    setAsset("")
    setDate(new Date())
    setActiveTab("finance")
    setAmount("")
    setQuantity("")
    setUnitPrice("")
    setNotes("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const rawAmount = amount.replace(/\D/g, "") // só números
    const parsedAmount = Number(rawAmount) / 100

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Digite um valor válido para o campo Valor (R$)")
      return
    }

    const payload =
  activeTab === "finance"
    ? {
        type: "FINANCIAL",
        categoryId: category || undefined,
        paymentMethod: paymentMethod.toUpperCase(),
        amount: parsedAmount,
        date,
      }
    : {
        type: "INVESTMENT",
        operationType: operationType.toUpperCase(),
        assetType: assetType.toUpperCase(),
        asset,
        quantity: parseFloat(quantity),
        unitPrice: parseFloat(unitPrice),
        amount: parseFloat(quantity) * parseFloat(unitPrice),
        date,
        notes,
      }

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Erro ao salvar transação")

      if (activeTab === "finance") {
        const tipoTransacao = transactionType === "income" ? "Receita" : "Despesa"
        toast.success(`${tipoTransacao} registrada com sucesso!`)
      } else {
        const tipoOperacao = operationType === "buy" ? "Compra" : "Venda"
        toast.success(`${tipoOperacao} de investimento registrada com sucesso!`)
      }

      setOpen(false)
      resetForm()

    } catch (err) {
      console.error("Erro:", err)
      toast.error(err instanceof Error ? err.message : "Erro ao salvar transação")
    }
  }

  return (
    <Dialog open={open}  onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) resetForm()
      }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Lançamento</DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="finance" className="cursor-pointer">Lançamento Financeiro</TabsTrigger>
              <TabsTrigger value="investment" className="cursor-pointer">Operação de Investimento</TabsTrigger>
            </TabsList>

            {/* Conteúdo para Lançamentos Financeiros */}
            <div className="h-[420px] overflow-hidden">
            <ScrollArea className="h-full pr-4">
            <TabsContent value="finance" className="space-y-4 mt-4">
            <div className="grid gap-2">
              <Label>Tipo de Lançamento</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={transactionType === "income" ? "default" : "outline"}
                  className={transactionType === "income" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}
                  onClick={() => setTransactionType("income")}
                >
                  Receita
                </Button>
                <Button
                  type="button"
                  variant={transactionType === "expense" ? "default" : "outline"}
                  className={transactionType === "expense" ? "bg-rose-500 hover:bg-rose-600 text-white" : ""}
                  onClick={() => setTransactionType("expense")}
                >
                  Despesa
                </Button>
              </div>
            </div>


              <div className="grid gap-2">
                <Label>Categoria</Label>
                <Popover open={openCategoryCombobox} onOpenChange={setOpenCategoryCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCategoryCombobox}
                      className="justify-between"
                    >
                      {category
                        ? categories.find((cat) => cat.id === category)?.name
                        : "Selecione uma categoria"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar categoria..." />
                      <CommandList>
                        <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                        <CommandGroup>
                          {categories
                            .filter((cat) => cat.type === transactionType)
                            .map((cat) => (
                              <CommandItem
                                key={cat.id}
                                value={cat.id}
                                onSelect={(currentValue) => {
                                  setCategory(currentValue === category ? "" : currentValue)
                                  setOpenCategoryCombobox(false)
                                }}
                              >
                                <Check
                                  className={cn("mr-2 h-4 w-4", category === cat.id ? "opacity-100" : "opacity-0")}
                                />
                                {cat.name}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Valor (R$)</Label>
                <Input
                  id="value"
                  type="text"
                  inputMode="numeric"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "") // remove tudo que não for número
                    const numeric = parseFloat(raw) / 100
                    const formatted = numeric.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                    setAmount(formatted)
                  }}
                  required
                />             
               </div>

              <div className="grid gap-2">
                <Label>Método de Pagamento</Label>
                <Popover open={openPaymentMethodCombobox} onOpenChange={setOpenPaymentMethodCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPaymentMethodCombobox}
                      className="justify-between"
                    >
                      {paymentMethod
                        ? paymentMethods.find((method) => method.value === paymentMethod)?.label
                        : "Selecione um método de pagamento"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar método..." />
                      <CommandList>
                        <CommandEmpty>Nenhum método encontrado.</CommandEmpty>
                        <CommandGroup>
                          {paymentMethods.map((method) => (
                            <CommandItem
                              key={method.value}
                              value={method.value}
                              onSelect={(currentValue) => {
                                setPaymentMethod(currentValue === paymentMethod ? "" : currentValue)
                                setOpenPaymentMethodCombobox(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  paymentMethod === method.value ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {method.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
            </TabsContent>

            {/* Conteúdo para Operações de Investimento */}
            <TabsContent value="investment" className="space-y-4 mt-4">
            <div className="grid gap-2">
              <Label>Tipo de Operação</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={operationType === "buy" ? "default" : "outline"}
                  className={operationType === "buy" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}
                  onClick={() => setOperationType("buy")}
                >
                  Compra
                </Button>
                <Button
                  type="button"
                  variant={operationType === "sell" ? "default" : "outline"}
                  className={operationType === "sell" ? "bg-rose-500 hover:bg-rose-600 text-white" : ""}
                  onClick={() => setOperationType("sell")}
                >
                  Venda
                </Button>
              </div>
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
                                setAsset("") // Reset asset when type changes
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
                      {asset ? getAssetsByType(assetType).find((a) => a.value === asset)?.label : "Selecione o ativo"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar ativo..." />
                      <CommandList>
                        <CommandEmpty>Nenhum ativo encontrado.</CommandEmpty>
                        <CommandGroup>
                          {getAssetsByType(assetType).map((asset) => (
                            <CommandItem
                              key={asset.value}
                              value={asset.value}
                              onSelect={(currentValue) => {
                                setAsset(currentValue === asset.value ? "" : currentValue)
                                setOpenAssetCombobox(false)
                              }}
                            >
                              <Check
                                className={cn("mr-2 h-4 w-4", asset.value === asset.value ? "opacity-100" : "opacity-0")}
                              />
                              {asset.label}
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
            </TabsContent>
            </ScrollArea>
            </div>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

