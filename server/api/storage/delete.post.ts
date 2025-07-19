import { SupabaseClient, isUserAdmin } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { path } = body;

        const isAdmin = await isUserAdmin(event)

        if (!isAdmin) {
            setResponseStatus(event, 401)
            return { error: 'Access denied.' }
        }

        if (!path) {
            setResponseStatus(event, 400);
            return { error: "Path required" };
        }

        const { data, error } = await SupabaseClient().storage
            .from('media')
            .remove(path)

        if (error) {
            setResponseStatus(event, 500);
            return { error: error.message };
        }

        return {
            message: "File Removed successfully",
            data
        };
    } catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || "Internal server error" };
    }
});