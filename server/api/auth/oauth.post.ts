import { SupabaseServerClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { provider, redirect } = body;

    const { data, error } = await SupabaseServerClient(event).auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirect
        },
    });

    if (error) {
      setResponseStatus(event, 401);
      return { error: error.message };
    }

    if (!data?.url) {
      setResponseStatus(event, 500);
      return { error: "Unexpected error: missing oauth url" };
    }

    return {
      url: data.url
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { error: (err as Error).message || "Internal server error" };
  }
});
