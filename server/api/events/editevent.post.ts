import { SupabaseClient, isUserAdmin } from '@/server/utils/supabase';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { id, updated_event } = body;

    const isAdmin = await isUserAdmin(event)

    if (!isAdmin) {
        setResponseStatus(event, 401)
        return { error: 'Access denied.' }
    }

    if (!id) {
        setResponseStatus(event, 400);
        return { error: 'Missing "id" query' };
    }

    try {
        const { data, error } = await SupabaseClient().from('events').update(updated_event).eq('id', id).select().single();

        if (error) {
            setResponseStatus(event, 404);
            return { error: error.message || 'Event not found' };
        }

        return { event: data };
    } catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || 'Internal server error' };
    }
})