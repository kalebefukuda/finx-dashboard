'use client';

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/supabaseClient"
import { Toaster, toast } from "sonner"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


const emailSchema = z.object({
    email: z.string().email("Invalid email")
})

type EmailFormData = z.infer<typeof emailSchema>;

export default function ForgotPassword(){
  const [loading, setLoading] = useState(false)
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleResetPassword = async (data: EmailFormData) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    });

    if (error) {
      toast.error("Erro ao enviar e-mail. Verifique o endereço.");
    } else {
      toast.success("Enviamos um e-mail com instruções para redefinir sua senha.");
    }

    setLoading(false);
  };
    return (
        <div className="flex px-10 py-4">
    
          <div className="flex px-2 mt-2">
            <Link href="/">
              <Image src="/images/finx-logo.png" width={63} height={24} alt="FinX logo" />
            </Link>
          </div>
          <div className="flex min-h-full h-screen flex-1 flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
              <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">Reset your password</h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(handleResetPassword)}>
                <div>
                  <div className="mt-2 flex flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input  type="email" id="email" placeholder="you@example.com" {...register("email")}/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                </div>
    
                <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-xs transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-light hover:bg-primary-hover-light"
                }`}
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
            </div>
              </form>
    
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  
                </div>
              </div>
    
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-primary-hover-dark transition duration-300 hover:text-primary-hover-light"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          <Toaster richColors position="bottom-right" />
        </div>
      )
}