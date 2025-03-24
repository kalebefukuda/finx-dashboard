"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
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

// Categorias de receitas
const incomeCategories = [
  { value: "salary", label: "Salário" },
  { value: "investments", label: "Rendimentos de Investimentos" },
  { value: "freelance", label: "Freelance" },
  { value: "rental", label: "Aluguel" },
  { value: "bonus", label: "Bônus" },
  { value: "gift", label: "Presente" },
  { value: "other_income", label: "Outros" },
]

// Categorias de despesas
const expenseCategories = [
  { value: "housing", label: "Moradia" },
  { value: "food", label: "Alimentação" },
  { value: "transportation", label: "Transporte" },
  { value: "leisure", label: "Lazer" },
  { value: "health", label: "Saúde" },
  { value: "education", label: "Educação" },
  { value: "clothing", label: "Vestuário" },
  { value: "utilities", label: "Contas (água, luz, etc.)" },
  { value: "subscriptions", label: "Assinaturas" },
  { value: "other_expense", label: "Outros" },
]

// Métodos de pagamento
const paymentMethods = [
  { value: "pix", label: "PIX" },
  { value: "credit_card", label: "Cartão de Crédito" },
  { value: "debit_card", label: "Cartão de Débito" },
  { value: "cash", label: "Dinheiro" },
  { value: "bank_transfer", label: "Transferência Bancária" },
  { value: "boleto", label: "Boleto" },
]

// Tipos de ativos
const assetTypes = [
  { value: "stocks", label: "Ações" },
  { value: "fiis", label: "FIIs" },
  { value: "fixed_income", label: "Renda Fixa" },
  { value: "crypto", label: "Criptomoedas" },
  { value: "international", label: "Investimentos Internacionais" },
]

// Ativos por tipo
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

// Tipos de operação para investimentos
const investmentOperationTypes = [
  { value: "buy", label: "Compra" },
  { value: "sell", label: "Venda" },
]

export function TransactionModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("finance")

  // Estados para lançamentos financeiros
  const [transactionType, setTransactionType] = useState("expense")
  const [category, setCategory] = useState("")
  const [openCategoryCombobox, setOpenCategoryCombobox] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [openPaymentMethodCombobox, setOpenPaymentMethodCombobox] = useState(false)

  // Estados para operações de investimentos
  const [operationType, setOperationType] = useState("buy")
  const [assetType, setAssetType] = useState("")
  const [openAssetTypeCombobox, setOpenAssetTypeCombobox] = useState(false)
  const [asset, setAsset] = useState("")
  const [openAssetCombobox, setOpenAssetCombobox] = useState(false)

  // Estados comuns
  const [date, setDate] = useState<Date>(new Date())

  const getAssetsByType = (type: string) => {
    return assetsByType[type as keyof typeof assetsByType] || []
  }

  const getCategoriesByType = (type: string) => {
    return type === "income" ? incomeCategories : expenseCategories
  }

  const resetForm = () => {
    // Reset estados de lançamentos financeiros
    setTransactionType("expense")
    setCategory("")
    setPaymentMethod("")

    // Reset estados de operações de investimentos
    setOperationType("buy")
    setAssetType("")
    setAsset("")

    // Reset estados comuns
    setDate(new Date())

    // Reset tab
    setActiveTab("finance")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado", {
      type: activeTab,
      ...(activeTab === "finance"
        ? {
            transactionType,
            category,
            paymentMethod,
            date,
          }
        : {
            operationType,
            assetType,
            asset,
            date,
          }),
    })
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Lançamento</DialogTitle>
            <DialogDescription>Registre uma nova transação financeira ou operação de investimento.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="finance">Lançamento Financeiro</TabsTrigger>
              <TabsTrigger value="investment">Operação de Investimento</TabsTrigger>
            </TabsList>

            {/* Conteúdo para Lançamentos Financeiros */}
            <TabsContent value="finance" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label>Tipo de Lançamento</Label>
                <RadioGroup value={transactionType} onValueChange={setTransactionType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="income" id="income" />
                    <Label htmlFor="income" className="text-emerald-500 font-medium">
                      Receita
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expense" id="expense" />
                    <Label htmlFor="expense" className="text-rose-500 font-medium">
                      Despesa
                    </Label>
                  </div>
                </RadioGroup>
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
                        ? getCategoriesByType(transactionType).find((cat) => cat.value === category)?.label
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
                          {getCategoriesByType(transactionType).map((cat) => (
                            <CommandItem
                              key={cat.value}
                              value={cat.value}
                              onSelect={(currentValue) => {
                                setCategory(currentValue === category ? "" : currentValue)
                                setOpenCategoryCombobox(false)
                              }}
                            >
                              <Check
                                className={cn("mr-2 h-4 w-4", category === cat.value ? "opacity-100" : "opacity-0")}
                              />
                              {cat.label}
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
                <Input id="value" type="number" step="0.01" min="0" placeholder="0,00" required />
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

              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Adicione detalhes sobre este lançamento"
                  className="resize-none"
                />
              </div>
            </TabsContent>

            {/* Conteúdo para Operações de Investimento */}
            <TabsContent value="investment" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label>Tipo de Operação</Label>
                <RadioGroup value={operationType} onValueChange={setOperationType} className="flex gap-4">
                  {investmentOperationTypes.map((type) => (
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

              <div className="grid gap-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea id="notes" placeholder="Adicione notas sobre esta operação" className="resize-none" />
              </div>
            </TabsContent>
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

