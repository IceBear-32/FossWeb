import { SupabaseClient } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const headers = getHeaders(event);
    const uid = headers.uid as string | undefined || getQuery(event).uid as string | undefined;

    if (!uid) {
        setResponseStatus(event, 401);
        return { error: "Missing required field." };
    }

    const {data, error} = await SupabaseClient().from('profiles').select('*').eq('uid', uid).single();

    if (error) {
        setResponseStatus(event, 404);
        return { error: error.message || "Profile not found." };
    }

    return data;
  } catch (err) {
    setResponseStatus(event, 500);
    return { error: (err as Error).message || "Internal server error" };
  }
});
