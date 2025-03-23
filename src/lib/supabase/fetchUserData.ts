import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function fetchUserData(cookies: ReadonlyRequestCookies) {
  const supabase = createServerComponentClient({
    cookies: async () => cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Erro ao buscar dados do usuário", error);
    return null;
  }

  return data;
}
