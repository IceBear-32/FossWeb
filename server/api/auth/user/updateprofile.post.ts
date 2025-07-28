import { SupabaseServerClient, SupabaseClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { updated_profile } = body;

    const user = await SupabaseServerClient(event).auth.getUser();
    
    if (user.error) {
      setResponseStatus(event, 401);
      return { error: user.error?.message || "Unauthorized" };
    }
    if (!user.data.user) {
      setResponseStatus(event, 404);
      return { error: "User not found" };
    }

    const { data, error } = await SupabaseClient().from('profiles').update(updated_profile).eq('uid', user.data.user.id).select().single();

    if (error || !data) {
       setResponseStatus(event, 404);
      return { error: "Data not found" }; 
    }

    return {
      user: user.data.user,
      profile: data
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { error: (err as Error).message || "Internal server error" };
  }
});
