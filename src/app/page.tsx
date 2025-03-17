"use client"

import Image from "next/image"
import { ArrowRight, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    const type = params.get("type")

    if (type === "recovery") {
      router.replace("/reset-password" + hash)
    }
  }, [router])

  if (!mounted) return null

  return (
    <div className="min-h-screen px-10 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-4">
        <nav className="flex space-x-8">
          <a href="#home" className="hover:text-[var(--color-primary)] transition-colors">Home</a>
          <a href="#about" className="hover:text-[var(--color-primary)] transition-colors">About</a>
          <a href="#contact" className="hover:text-[var(--color-primary)] transition-colors">Contact</a>
        </nav>

        {mounted && (
        <div className="text-xl font-bold">
          {theme === "dark" ? (
            <Image src="/images/finx-logo-light.svg" width={70} height={24} alt="FinX Logo" />
          ) : (
            <Image src="/images/finx-logo.svg" width={70} height={24} alt="FinX Logo" />
          )}
        </div>
      )}

        <div className="w-50 flex items-center justify-end gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full cursor-pointer"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link
            href="/sign-in"
            className="bg-[var(--color-backgrond-specific)] duration-300 border-[1px] hover:border-[var(--color-backgrond-specific)] text-[var(--color-primary-foreground)] px-4 py-2 rounded-sm transition hover:bg-[var(--color-backgrond-specific-hover)] hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="flex md:flex-row items-center justify-between md:px-20 py-34 w-full relative">
        <div className="max-w-lg flex flex-col gap-10 z-10">
          <h1 className="text-6xl font-semibold">
            Manage your <span className="text-[var(--color-primary)]">money</span> with ease
          </h1>
          <p className="text-[var(--muted-foreground)] mt-4 w-100">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <Link
            href="/sign-in"
            className="flex justify-center items-center gap-3 mt-6 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-6 py-3 rounded-lg w-[200px] transition hover:bg-[var(--color-primary-hover-light)]"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Imagem ao fundo */}
        <div className="flex justify-end w-full right-0 absolute mt-40">
          <div className="relative w-[940px] h-[700px]">
            <Image
              src="/images/Group59.svg"
              width={1600}
              height={800}
              alt="FinX Mockup"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="about" className="mt-40 py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">How it works</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="bg-[var(--card)] text-[var(--card-foreground)] p-8 rounded-lg border border-[var(--border)] relative hover:shadow-[0_0_30px_rgba(0,187,129,0.2)] transition duration-300">
                <div className="absolute top-8 left-8 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {step}
                </div>
                <div className="pt-12">
                  <p className="font-medium">
                    {step === 1 && "Sign up for creating your first online store with ease."}
                    {step === 2 && "Add your products to your store and customize."}
                    {step === 3 && "Sell and earn as much as you can. Grow fast."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
