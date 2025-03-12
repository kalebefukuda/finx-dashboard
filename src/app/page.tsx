"use client"
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState  } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    const type = params.get("type")

    if (type === "recovery") {
      router.replace("/reset-password" + hash)
    }
  }, [router])

  if (!isClient) return null
    return (

    <div className="min-h-screen px-10 flex flex-col  ">
      <header className="flex justify-between items-center px-10 py-4">
        <nav className="flex space-x-8">
          <a href="#home" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
        </nav>
        <div className="text-xl font-bold text-gray-900">
          <Image
            src="/images/finx-logo.svg"
            width={70}
            height={24}
            alt="Picture of the author"
          />
        </div>
        <div className="w-50 flex justify-end">
            <Link className="border-1 border-primary-light text-primary-light px-4 py-2 rounded-sm cursor-pointer transition duration-300 hover:bg-primary-hover-light hover:text-white" href="/sign-in">Sign in</Link>
        </div>
        
      </header>

      <section className="flex md:flex-row items-center justify-between md:px-20 py-34 w-full">
        <div className="max-w-lg flex flex-col gap-10 z-10">
          <h1 className="text-6xl font-semibold text-gray-900">
            Manage your <span className="text-primary-light">money</span> with ease
          </h1>
          <p className="text-gray-600 mt-4 w-100">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <Link href='/sign-in' className="flex justify-center items-center gap-3 mt-6  bg-primary-light text-white px-6 py-3 rounded-lg w-[200px] transition duration-200 hover:bg-primary-hover-light cursor-pointer">
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="flex justify-end w-full right-0 absolute mt-40">
          <div className="relative w-[940px] h-[700] ">
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

      <section className="mt-40 py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">How it works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-lg border border-gray-100 relative hover:shadow-[0_0_30px_rgba(0,187,129,0.2)] transition duration-300">
            <div className="absolute top-8 left-8 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm">
              1
            </div>
            <div className="pt-12">
              <p className="font-medium text-gray-900">Sign up for creating your first online store with ease.</p>
            </div>
          </div>

          {/* Step 2 - with glow effect */}
          <div className="bg-white p-8 rounded-lg border border-gray-100 relative hover:shadow-[0_0_30px_rgba(0,187,129,0.2)] transition duration-300">
            <div className="absolute top-8 left-8 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm">
              2
            </div>
            <div className="pt-12">
              <p className="font-medium text-gray-900">Add your products to your store and customize.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-lg border border-gray-100 relative hover:shadow-[0_0_30px_rgba(0,187,129,0.2)] transition duration-300">
            <div className="absolute top-8 left-8 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm">
              3
            </div>
            <div className="pt-12">
              <p className="font-medium text-gray-900">Sell and earn as much as you can. Grow fast.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
}
