import { SupabaseClient } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
    const headers = getHeaders(event);
    const path = headers.path as string | undefined || getQuery(event).path as string | undefined;

    if (!path) {
        setResponseStatus(event, 400);
        return { error: 'Missing required path parameter' };
    }

    const { data, error } = await SupabaseClient().storage.from('media').download(path)

    if (error) {
        setResponseStatus(event, 404);
        return { error: error.message || 'File not found' };
    }

    if (!data) {
        setResponseStatus(event, 404);
        return { error: 'File not found' };
    }

    return sendStream(event, data.stream());
})