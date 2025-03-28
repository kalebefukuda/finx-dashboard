import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/authOptions"
import { prisma } from "@/lib/prisma/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { type, categoryId, ...rest } = body

  try {
    const transaction = await prisma.transaction.create({
      data: {
        ...rest,
        type,
        user: { connect: { email: session.user?.email! } },
        category: categoryId
          ? {
              connect: { id: categoryId },
            }
          : undefined,
      },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Erro ao criar transação:", error)
    return NextResponse.json({ error: "Erro ao criar transação." }, { status: 500 })
  }
}

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    include: {
      category: true,
    },
  })

  const formatted = transactions.map((t) => ({
    ...t,
    amount: Number(t.amount),
    type: t.category?.type.toLowerCase() as "income" | "expense",
  }))

  return NextResponse.json(formatted)
}