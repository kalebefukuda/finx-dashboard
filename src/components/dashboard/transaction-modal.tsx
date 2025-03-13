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
import { cn } from "@/lib/utils"

const expenseCategories = [
  { value: "moradia", label: "Moradia" },
  { value: "alimentacao", label: "Alimentação" },
  { value: "transporte", label: "Transporte" },
  { value: "lazer", label: "Lazer" },
  { value: "saude", label: "Saúde" },
  { value: "educacao", label: "Educação" },
  { value: "vestuario", label: "Vestuário" },
  { value: "outros", label: "Outros" },
]

const incomeCategories = [
  { value: "salario", label: "Salário" },
  { value: "investimentos", label: "Investimentos" },
  { value: "freelance", label: "Freelance" },
  { value: "aluguel", label: "Aluguel" },
  { value: "outros", label: "Outros" },
]

const paymentMethods = [
  { value: "pix", label: "PIX" },
  { value: "credito", label: "Cartão de Crédito" },
  { value: "debito", label: "Cartão de Débito" },
  { value: "dinheiro", label: "Dinheiro" },
  { value: "transferencia", label: "Transferência Bancária" },
  { value: "boleto", label: "Boleto" },
]

export function TransactionModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [transactionType, setTransactionType] = useState("expense")
  const [date, setDate] = useState<Date>(new Date())
  const [category, setCategory] = useState("")
  const [openCategoryCombobox, setOpenCategoryCombobox] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [openPaymentMethodCombobox, setOpenPaymentMethodCombobox] = useState(false)

  const categories = transactionType === "expense" ? expenseCategories : incomeCategories

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar o lançamento
    console.log("Formulário enviado")
    setOpen(false)
    // Reset form
    setTransactionType("expense")
    setDate(new Date())
    setCategory("")
    setPaymentMethod("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Lançamento</DialogTitle>
            <DialogDescription>Registre uma nova receita ou despesa no seu controle financeiro.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="transaction-type">Tipo de Lançamento</Label>
              <RadioGroup
                id="transaction-type"
                value={transactionType}
                onValueChange={setTransactionType}
                className="flex gap-4"
              >
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
              <Label htmlFor="value">Valor (R$)</Label>
              <Input id="value" type="number" step="0.01" min="0" placeholder="0,00" required />
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
              <Label htmlFor="category">Categoria</Label>
              <Popover open={openCategoryCombobox} onOpenChange={setOpenCategoryCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCategoryCombobox}
                    className="justify-between"
                  >
                    {category ? categories.find((cat) => cat.value === category)?.label : "Selecione uma categoria"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar categoria..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((cat) => (
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
              <Label htmlFor="payment-method">Método de Pagamento</Label>
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
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Adicione detalhes sobre este lançamento"
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Lançamento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

