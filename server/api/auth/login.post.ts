import { SupabaseServerClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password, remember } = body;

    const { data, error } = await SupabaseServerClient(event).auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setResponseStatus(event, 401);
      return { error: error.message };
    }

    if (!data?.session || !data?.user) {
      setResponseStatus(event, 500);
      return { error: "Unexpected error: missing session or user" };
    }

    return {
      session: data.session,
      user: data.user,
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { error: (err as Error).message || "Internal server error" };
  }
});
