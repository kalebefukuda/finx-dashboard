"use client"

import { useState } from "react"
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
import { Badge } from "@/components/ui/badge"
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

// Dados iniciais de exemplo
const initialCategories: Category[] = [
  // Receitas
  { id: "1", name: "Salário", type: "income", isDefault: true },
  { id: "2", name: "Rendimentos de Investimentos", type: "income", isDefault: true },
  { id: "3", name: "Freelance", type: "income", isDefault: true },
  { id: "4", name: "Aluguel", type: "income", isDefault: false },
  { id: "5", name: "Bônus", type: "income", isDefault: false },
  { id: "6", name: "Presente", type: "income", isDefault: false },
  { id: "7", name: "Outros", type: "income", isDefault: true },

  // Despesas
  { id: "8", name: "Moradia", type: "expense", isDefault: true },
  { id: "9", name: "Alimentação", type: "expense", isDefault: true },
  { id: "10", name: "Transporte", type: "expense", isDefault: true },
  { id: "11", name: "Lazer", type: "expense", isDefault: true },
  { id: "12", name: "Saúde", type: "expense", isDefault: true },
  { id: "13", name: "Educação", type: "expense", isDefault: true },
  { id: "14", name: "Vestuário", type: "expense", isDefault: false },
  { id: "15", name: "Contas (água, luz, etc.)", type: "expense", isDefault: true },
  { id: "16", name: "Assinaturas", type: "expense", isDefault: false },
  { id: "17", name: "Outros", type: "expense", isDefault: true },

  // Investimentos
  { id: "18", name: "Ações", type: "investment", isDefault: true },
  { id: "19", name: "FIIs", type: "investment", isDefault: true },
  { id: "20", name: "Renda Fixa", type: "investment", isDefault: true },
  { id: "21", name: "Criptomoedas", type: "investment", isDefault: true },
  { id: "22", name: "Investimentos Internacionais", type: "investment", isDefault: false },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [activeTab, setActiveTab] = useState<CategoryType>("income")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrar categorias pelo tipo ativo e pesquisa
  const filteredCategories = categories
    .filter((category) => category.type === activeTab)
    .filter((category) => (searchQuery ? category.name.toLowerCase().includes(searchQuery.toLowerCase()) : true))

  // Adicionar nova categoria
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        type: activeTab,
        isDefault: false,
      }
      setCategories([...categories, newCategory])
      setNewCategoryName("")
      setIsAddDialogOpen(false)
    }
  }

  // Iniciar edição de categoria
  const startEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategoryName(category.name)
    setIsEditDialogOpen(true)
  }

  // Salvar edição de categoria
  const handleEditCategory = () => {
    if (editingCategory && newCategoryName.trim()) {
      setCategories(
        categories.map((cat) => (cat.id === editingCategory.id ? { ...cat, name: newCategoryName.trim() } : cat)),
      )
      setNewCategoryName("")
      setEditingCategory(null)
      setIsEditDialogOpen(false)
    }
  }

  // Iniciar exclusão de categoria
  const startDeleteCategory = (category: Category) => {
    setDeletingCategory(category)
    setIsDeleteDialogOpen(true)
  }

  // Confirmar exclusão de categoria
  const handleDeleteCategory = () => {
    if (deletingCategory) {
      setCategories(categories.filter((cat) => cat.id !== deletingCategory.id))
      setDeletingCategory(null)
      setIsDeleteDialogOpen(false)
    }
  }

  // Obter ícone baseado no tipo de categoria
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

  // Obter cor baseada no tipo de categoria
  const getCategoryColor = (type: CategoryType) => {
    switch (type) {
      case "income":
        return "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
      case "expense":
        return "bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400"
      case "investment":
        return "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-auto bg-background">
      <header className="w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCategories.length === 0 ? (
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
                    filteredCategories.map((category) => (
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
                            <div>
                            {getCategoryIcon(category.type)}
                            </div>
                            <span className="font-medium break-words line-clamp-2 text-sm leading-tight">
                              {category.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {category.isDefault ? (
                              <Badge variant="secondary" className="text-xs">Padrão</Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">Personalizada</Badge>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Ações</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => startEditCategory(category)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Editar</span>
                                </DropdownMenuItem>
                                {!category.isDefault && (
                                  <DropdownMenuItem
                                    onClick={() => startDeleteCategory(category)}
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
                    

                    ))
                  )}
                </div>
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

