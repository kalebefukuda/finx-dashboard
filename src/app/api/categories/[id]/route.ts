import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()

  const updated = await prisma.category.update({
    where: { id: params.id },
    data: { name: body.name }
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const deleted = await prisma.category.delete({
    where: { id: params.id }
  })

  return NextResponse.json(deleted)
}
