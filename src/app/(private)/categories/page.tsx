"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowDown,
  ArrowUp,
  CircleDollarSign,
  Edit,
  LineChart,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

// Tipos para as categorias
type CategoryType = "income" | "expense" | "investment"

interface Category {
  id: string
  name: string
  type: CategoryType
  icon?: string
  color?: string
  isDefault?: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeTab, setActiveTab] = useState<CategoryType>("income")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const loadCategories = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error("Erro ao carregar categorias:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const filteredCategories = categories
    .filter((c) => c.type === activeTab)
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim(), type: activeTab }),
      })

      const newCat = await res.json()
      setCategories((prev) => [...prev, newCat])
      setNewCategoryName("")
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error)
    }
  }

  const handleEditCategory = async () => {
    if (!editingCategory || !newCategoryName.trim()) return

    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      })

      const updated = await res.json()
      setCategories((prev) => prev.map((cat) => (cat.id === updated.id ? updated : cat)))
      setEditingCategory(null)
      setIsEditDialogOpen(false)
      setNewCategoryName("")
    } catch (error) {
      console.error("Erro ao editar categoria:", error)
    }
  }

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return

    try {
      await fetch(`/api/categories/${deletingCategory.id}`, { method: "DELETE" })
      setCategories((prev) => prev.filter((cat) => cat.id !== deletingCategory.id))
      setDeletingCategory(null)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("Erro ao excluir categoria:", error)
    }
  }

  const getCategoryIcon = (type: CategoryType) => {
    switch (type) {
      case "income":
        return <ArrowUp className="h-4 w-4 text-emerald-500" />
      case "expense":
        return <ArrowDown className="h-4 w-4 text-rose-500" />
      case "investment":
        return <LineChart className="h-4 w-4 text-blue-500" />
    }
  }

  const getCategoryColor = (type: CategoryType) => {
    switch (type) {
      case "income":
        return "bg-emerald-100 dark:bg-emerald-950/30"
      case "expense":
        return "bg-rose-100 dark:bg-rose-950/30"
      case "investment":
        return "bg-blue-100 dark:bg-blue-950/30"
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-auto bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <h1 className="text-xl font-semibold">Gerenciamento de Categorias</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Nova Categoria</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                <DialogDescription>
                  Crie uma nova categoria para organizar seus lançamentos financeiros.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome da Categoria</Label>
                  <Input
                    id="name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Ex: Viagens, Presentes, Investimentos"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddCategory}>Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6 flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CategoryType)} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="income" className="px-4">
                <ArrowUp className="mr-2 h-4 w-4 text-emerald-500" />
                Receitas
              </TabsTrigger>
              <TabsTrigger value="expense" className="px-4">
                <ArrowDown className="mr-2 h-4 w-4 text-rose-500" />
                Despesas
              </TabsTrigger>
              <TabsTrigger value="investment" className="px-4">
                <LineChart className="mr-2 h-4 w-4 text-blue-500" />
                Investimentos
              </TabsTrigger>
            </TabsList>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar categorias..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeTab === "income" && <ArrowUp className="h-5 w-5 text-emerald-500" />}
                {activeTab === "expense" && <ArrowDown className="h-5 w-5 text-rose-500" />}
                {activeTab === "investment" && <LineChart className="h-5 w-5 text-blue-500" />}

                {activeTab === "income" && "Categorias de Receitas"}
                {activeTab === "expense" && "Categorias de Despesas"}
                {activeTab === "investment" && "Categorias de Investimentos"}
              </CardTitle>
              <CardDescription>
                {activeTab === "income" && "Gerencie as categorias para organizar suas receitas."}
                {activeTab === "expense" && "Gerencie as categorias para organizar suas despesas."}
                {activeTab === "investment" && "Gerencie as categorias para organizar seus investimentos."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="relative overflow-hidden">
                        <div className="animate-pulse flex flex-col">
                          <div
                            className={`h-6 w-full rounded-t-md ${
                              activeTab === "income"
                                ? "bg-emerald-100 dark:bg-emerald-950/30"
                                : activeTab === "expense"
                                  ? "bg-rose-100 dark:bg-rose-950/30"
                                  : "bg-blue-100 dark:bg-blue-950/30"
                            }`}
                          ></div>
                          <div className="bg-card border rounded-b-md h-[120px] flex items-center justify-between p-6">
                            <div className="flex items-center gap-3">
                              <div className="h-4 w-4 rounded-full bg-muted"></div>
                              <div className="h-5 w-32 bg-muted rounded"></div>
                            </div>
                            <div className="h-8 w-8 bg-muted rounded-md"></div>
                          </div>
                        </div>
                        {/* Efeito de brilho animado */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredCategories.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
                    <CircleDollarSign className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">Nenhuma categoria encontrada</h3>
                    <p className="text-muted-foreground mt-1">
                      {searchQuery ? "Tente ajustar sua pesquisa ou" : "Comece"} adicionando uma nova categoria.
                    </p>
                    <Button onClick={() => setIsAddDialogOpen(true)} className="mt-4" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Categoria
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredCategories.map((category) => (
                      <Card
                        key={category.id}
                        className="overflow-hidden relative pt-6 min-h-[130px] max-h-[150px] w-full"
                      >
                        <div
                          className={`absolute top-0 left-0 w-full h-6 ${getCategoryColor(category.type)} rounded-t-md`}
                        />

                        <CardContent className="px-8 py-5 z-10 mt-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3 w-[220px]">
                              <div>{getCategoryIcon(category.type)}</div>
                              <span className="font-medium break-words line-clamp-2 text-sm leading-tight">
                                {category.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Ações</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setEditingCategory(category)
                                      setNewCategoryName(category.name)
                                      setIsEditDialogOpen(true)
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Editar</span>
                                  </DropdownMenuItem>
                                  {!category.isDefault && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setDeletingCategory(category)
                                        setIsDeleteDialogOpen(true)
                                      }}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Excluir</span>
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </Tabs>
      </main>

      {/* Dialog para editar categoria */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>Altere o nome da categoria selecionada.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nome da Categoria</Label>
              <Input id="edit-name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditCategory}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a categoria "{deletingCategory?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

