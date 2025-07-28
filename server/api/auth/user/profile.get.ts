import { SupabaseServerClient, SupabaseClient } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const user = await SupabaseServerClient(event).auth.getUser();
    
    if (user.error) {
      setResponseStatus(event, 401);
      return { error: user.error?.message || "Unauthorized" };
    }
    if (!user.data.user) {
      setResponseStatus(event, 404);
      return { error: "User not found" };
    }

    const profile = await SupabaseClient().from('profiles').select('*').eq('uid', user.data?.user.id).single();

    return {
      user: user.data.user,
      profile: profile.data
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { error: (err as Error).message || "Internal server error" };
  }
});
