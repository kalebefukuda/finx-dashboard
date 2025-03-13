"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp, Banknote, Bitcoin, DollarSign, LineChart } from "lucide-react"

const assets = [
  {
    name: "PETR4",
    type: "stock",
    value: 28.45,
    quantity: 100,
    variation: 2.3,
    total: 2845.0,
  },
  {
    name: "VALE3",
    type: "stock",
    value: 68.92,
    quantity: 50,
    variation: -1.2,
    total: 3446.0,
  },
  {
    name: "Tesouro Selic 2026",
    type: "fixed",
    value: 12500.0,
    quantity: 1,
    variation: 0.5,
    total: 12500.0,
  },
  {
    name: "CDB Banco XYZ",
    type: "fixed",
    value: 20000.0,
    quantity: 1,
    variation: 0.3,
    total: 20000.0,
  },
  {
    name: "Bitcoin",
    type: "crypto",
    value: 180000.0,
    quantity: 0.05,
    variation: 5.8,
    total: 9000.0,
  },
]

export function AssetsList() {
  const getAssetIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <LineChart className="h-4 w-4 text-blue-500" />
      case "fixed":
        return <Banknote className="h-4 w-4 text-emerald-500" />
      case "crypto":
        return <Bitcoin className="h-4 w-4 text-amber-500" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Ativos</CardTitle>
        <CardDescription>Lista de todos os seus investimentos</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ativo</TableHead>
              <TableHead className="hidden md:table-cell">Quantidade</TableHead>
              <TableHead>Preço Atual</TableHead>
              <TableHead className="hidden md:table-cell">Valor Total</TableHead>
              <TableHead>Variação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.name}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getAssetIcon(asset.type)}
                    <span className="font-medium">{asset.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{asset.quantity}</TableCell>
                <TableCell>
                  {asset.type === "fixed"
                    ? `R$ ${asset.value.toLocaleString("pt-BR")}`
                    : `R$ ${asset.value.toFixed(2)}`}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  R$ {asset.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <div className={`flex items-center ${asset.variation >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {asset.variation >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(asset.variation)}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

