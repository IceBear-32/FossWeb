import { SupabaseClient } from '@/server/utils/supabase';

export default defineEventHandler(async (event) => {
    const headers = await getHeaders(event);
    const id = headers.id as string | undefined || getQuery(event).id as bigint | undefined;
    const title = headers.title as string | undefined || getQuery(event).title as string | undefined || '';

    if (!id && !title) {
        setResponseStatus(event, 400);
        return { error: 'Missing required fields' };
    }

    try {
        const { data, error } = await SupabaseClient().from('events').select('*');

        const fdata = data?.find(event => event.id == id || event.title == title);

        if (error) {
            setResponseStatus(event, 404);
            return { error: error.message || 'Event not found' };
        }

        return { event: fdata };
    } catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || 'Internal server error' };
    }
})