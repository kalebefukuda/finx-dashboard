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
import { supabase } from "@/lib/supabase/supabaseClient"
import { Toaster, toast } from "sonner"

const loginSchema = z.object({
    name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Only letters and spaces allowed"),
  email: z.string().email("Invalid email"),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const handleSignUp = async (data: LoginFormValues) => {
    setLoading(true)

    const { name, email, password } = data
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
        if (error.message.includes("User already registered")) {
            toast.error("Email already in use.")
          } else if (error.message.includes("Password should be")) {
            toast.error("Password must be at least 6 characters.")
          } else {
            toast.error("Unable to create account. Try again.")
          }
    } else if (authData?.user) {
      toast.success("Account created")

      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast.error("Failed to sign in with Google. Please try again.")
      setGoogleLoading(false)
    }
  }


  return (
    <div className="flex px-10 py-4">

      <div className="flex px-2 mt-2">
        <Link href="/">
          <Image src="/images/finx-logo.png" width={63} height={24} alt="FinX logo" />
        </Link>
      </div>
      <div className="flex min-h-full h-screen flex-1 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">

          <div>
              <div className="mt-2 flex flex-col gap-3">
                <Label htmlFor="">Name</Label>
                <Input type="name" id="name" placeholder="" {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
            </div>
            <div>
              <div className="mt-2 flex flex-col gap-3">
                <Label htmlFor="email">Email address</Label>
                <Input type="email" id="email" placeholder="" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="mt-2">
                <Input type="password" id="password" placeholder="" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-xs transition cursor-pointer duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-light hover:bg-primary-hover-light"
                }`}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">Or with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full flex items-center cursor-pointer justify-center gap-3"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-light"></div>
                ) : (
                    <Image src="/images/google-icon.svg" width={22} height={22} alt="FinX logo" />
                )}
                <span>{googleLoading ? "Connecting..." : "Google"}</span>
              </Button>
            </div>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-primary-hover-dark transition duration-300 hover:text-primary-hover-light">
                Sign in
              </Link>
          </p>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  )
}

