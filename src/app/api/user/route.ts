import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return NextResponse.json(null, { status: 401 });

  return NextResponse.json(user);
}