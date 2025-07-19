import { SupabaseServerClient } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const {error} = await SupabaseServerClient(event).auth.signOut()
    if (error) {
        setResponseStatus(event, 500);
        return { error: error.message || "Internal server error" };
    }
  return { ok: true }
})
