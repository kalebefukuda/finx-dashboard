'use client';

import Image from 'next/image';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import Hero from '@/components/home-page/hero';
import Features from '@/components/home-page/features';
import DashboardPreview from '@/components/home-page/dashboard-preview';
import Faq from '@/components/home-page/faq';
import HowItWorks from '@/components/home-page/how-it-works';

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const type = params.get('type');

    if (type === 'recovery') {
      router.replace('/reset-password' + hash);
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen  bg-[var(--background)] text-[var(--foreground)] transition-colors">
      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-4">
        <nav className="flex space-x-8">
          <a
            href="#home"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Contact
          </a>
        </nav>

        {mounted && (
          <div className="text-xl font-bold">
            {theme === 'dark' ? (
              <Image
                src="/images/finx-logo-light.svg"
                width={70}
                height={24}
                alt="FinX Logo"
              />
            ) : (
              <Image
                src="/images/finx-logo.svg"
                width={70}
                height={24}
                alt="FinX Logo"
              />
            )}
          </div>
        )}

        <div className="w-50 flex items-center justify-end gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="rounded-full cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Link
            href="/sign-in"
            className="bg-[var(--color-backgrond-specific)] duration-300 border-[1px] hover:border-[var(--color-backgrond-specific)] text-[var(--color-primary-foreground)] px-4 py-2 rounded-sm transition hover:bg-[var(--color-backgrond-specific-hover)] hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </header>

      <Hero />
      <Features />
      <DashboardPreview />
      <Faq />
      <footer className="py-8 bg-[var(--background)] border-t border-[var(--border)]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8">
              {theme === 'dark' ? (
                <Image
                  src="/images/finx-logo-light.svg"
                  width={80}
                  height={26}
                  alt="FinX Logo"
                />
              ) : (
                <Image
                  src="/images/finx-logo.svg"
                  width={80}
                  height={26}
                  alt="FinX Logo"
                />
              )}
            </div>

            <nav className="flex flex-wrap justify-center gap-6 mb-6">
              <a
                href="#home"
                className="text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
              >
                Features
              </a>
              <a
                href="#dashboard"
                className="text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#faq"
                className="text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
              >
                FAQ
              </a>
            </nav>
            <p className="text-[var(--muted-foreground)] text-sm text-center">
              &copy; {new Date().getFullYear()} FinX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
