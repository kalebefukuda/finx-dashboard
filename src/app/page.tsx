import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
export default function Home() {  return (
    <div className="min-h-screen px-10">
      <header className="flex justify-between items-center px-10 py-4">
        <nav className="flex space-x-8">
          <a href="#home" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
        </nav>
        <div className="text-xl font-bold text-gray-900">
          <Image
            src="/images/finx-logo.png"
            width={63}
            height={24}
            alt="Picture of the author"
          />
        </div>
        <div className="w-50 flex justify-end">
          <button className="border border-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
            <Link href="/sign-in">Sign in</Link>
          </button>
        </div>
        
      </header>

      <section className="flex md:flex-row items-center justify-between md:px-20 py-34 w-full">
        <div className="max-w-lg flex flex-col gap-10 z-10">
          <h1 className="text-6xl font-semibold text-gray-900">
            Manage your <span className="text-green-600">money</span> with ease
          </h1>
          <p className="text-gray-600 mt-4 w-100">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <button className="flex justify-center items-center gap-3 mt-6  bg-green-600 text-white px-6 py-3 rounded-lg w-[200px] transition duration-100 hover:bg-green-500 cursor-pointer">
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="flex justify-end w-full right-0 absolute mt-40">
          <div className="relative w-[940px] h-[700] ">
            <Image
              src="/images/finx-mockup.svg"
              width={1600}
              height={800}
              alt="FinX Mockup"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        
      </section>

      <section className="flex mt-50 justify-center" id="about">
        <h1>about section</h1>
      </section>

    </div>
  );
}
