"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Toaster, toast } from "sonner"
import { useMountedTheme } from "@/hooks/use-mounted-theme"
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const { theme, setTheme, mounted } = useMountedTheme()

  const handleLogin = async (data: LoginFormValues) => {
    setLoading(true);
  
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  
    if (res?.error) {
      toast.error("Invalid email or password. Try again.");
    } else {
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    }
  
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-10 py-4">

      <div className="flex px-2 mt-2">
        <Link href="/">
          {mounted && (
            <Image
              src={theme === "dark" ? "/images/finx-logo-light.svg" : "/images/finx-logo.svg"}
              width={70}
              height={24}
              alt="FinX Logo"
            />
          )}
        </Link>
      </div>
      <div className="flex min-h-full h-screen flex-col justify-center items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
          <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--foreground)]">Sign In to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="mt-2">
                
                <Input type="email" id="email" placeholder="" {...register("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-[12px] text-primary-hover-dark transition duration-300 hover:text-primary-hover-light"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Input type="password" id="password" placeholder="" {...register("password")} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-xs transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer h-9 items-center ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-light hover:bg-primary-hover-light"
                }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[var(--color-background-separator)] px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 cursor-pointer"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-light "></div>
                ) : (
                    <Image src="/images/google-icon.svg" width={22} height={22} alt="FinX logo" />
                )}
                <span>{googleLoading ? "Connecting..." : "Google"}</span>
              </Button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-primary-hover-dark transition duration-300 hover:text-primary-hover-light"
            >
              Create your account
            </Link>
          </p>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  )
}

