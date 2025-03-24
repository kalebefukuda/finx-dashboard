import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes";
import Image from "next/image"
import Link from "next/link"

export default function Hero(){
  const { theme, setTheme } = useTheme();
    return(
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
            {theme === 'dark' ? (
              <Image
              src="/images/Group59.svg"
              width={1600}
              height={800}
              alt="FinX Mockup"
              className="w-full h-auto object-contain"
            /> 
            ) : (
              <Image
              src="/images/Group59.svg"
              width={1600}
              height={800}
              alt="FinX Mockup"
              className="w-full h-auto object-contain"
            /> 
            )}
            
          </div>
        </div>
        </section>
    )
}