'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Toaster, toast } from "sonner";

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string()
});

type LoginFormValues = z.infer<typeof loginSchema>

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const handleLogin = async (data: LoginFormValues) => {
        setLoading(true);

        const { email, password } = data;
        const { data: authData, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error("Invalid email or password. Try again");
        } else if (authData?.user) {
            toast.success("Login sucessfull");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
        }
        setLoading(false);
      };

    return(
        <div className="flex h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
                
                    <Image
                        src="/images/my-money-logo-transparent-green.png"
                        width={90}
                        height={90}
                        alt="My Money logo"
                    />
                    <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign In to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                        <div>
                            <div className="mt-2 flex flex-col gap-3">
                                <Label htmlFor="email">Email adress</Label>
                                <Input type="email" id="email" placeholder="Email" {...register('email')}/>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                                <div className="text-sm">
                                <Link href="/restore-password" className="font-semibold text-primary-hover-dark transition duration-300 hover:text-primary-hover-light">
                                    Forgot password?
                                </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                            <Input type="password" id="password" placeholder="Password" {...register('password')}/>
                            </div>
                        </div>

                        <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-xs transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                loading
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-primary-light hover:bg-primary-hover-light"
                              }`}
                            >
                              {loading ? "Signing in..." : "Sign in"}
                        </button>
                        
                        <Toaster richColors position="bottom-right" />
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <Link href="/sign-up" className="font-semibold text-primary-hover-dark transition duration-300 hover:text-primary-hover-light">
                        Create your account
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    );
}