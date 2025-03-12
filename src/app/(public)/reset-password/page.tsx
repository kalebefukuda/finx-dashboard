'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"


export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const type = params.get("type");

    if (accessToken && type === "recovery") {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: "",
      }).then(() => {
        // Limpa o hash da URL
        window.history.replaceState(null, "", window.location.pathname);
      });
    }
  }, []);

  const handleUpdatePassword = async () => {
    if (password !== confirm) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Erro ao redefinir a senha: " + error.message);
    } else {
      toast.success("Senha redefinida com sucesso!");
      router.push("/sign-in");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col px-10 py-4">
      <div className="flex px-2 mt-2">
        <Link href="/">
          <Image src="/images/finx-logo.svg" width={70} height={24} alt="FinX logo" />
        </Link>
      </div>

      <div className="flex min-h-full h-screen flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleUpdatePassword(); }}>
            <div className="flex flex-col gap-3">
              <Label htmlFor="password">New password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="confirm">Confirm you password</Label>
              <Input
                type="password"
                id="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            <div>
            <AlertDialog>
  <AlertDialogTrigger asChild>
    <button
      type="button"
      disabled={loading}
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-xs transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer h-9 items-center ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary-light hover:bg-primary-hover-light"
      }`}
    >
      {loading ? "Saving..." : "Reset my password"}
    </button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm reset?</AlertDialogTitle>
      <AlertDialogDescription>
        This action will update your current password. Make sure your new password is correct.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleUpdatePassword}>
        Confirm
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

            </div>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary-hover-dark hover:text-primary-hover-light transition duration-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
}
