// app/api/categories/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/authOptions"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { isDefault: true },
        { userId: userId || "" },
      ]
    },
    orderBy: { createdAt: "asc" }
  })

  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  const body = await req.json()

  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
      type: body.type,
      userId,
      isDefault: false,
    },
  })

  return NextResponse.json(newCategory)
}
