import { SupabaseClient, isUserAdmin } from "~/server/utils/supabase";


export default defineEventHandler(async event => {
    try {
    const isAdmin = await isUserAdmin(event)

    if (!isAdmin) {
        setResponseStatus(event, 401)
        return { error: 'Access denied.' }
    }

    const { data, error } = await SupabaseClient().from('profiles').select('*')

    if (error) {
        setResponseStatus(event, 401)
        return { error: error.message || 'Unauthorized.' }
    }

    return {
        data
    }
} catch (err) {
    setResponseStatus(event, 500);
    return { error: (err as Error).message || "Internal server error" };
  }
})