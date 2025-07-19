import { SupabaseClient, isUserAdmin } from '@/server/utils/supabase';

export default defineEventHandler(async (event) => {
    const isAdmin = await isUserAdmin(event)

    if (!isAdmin) {
        setResponseStatus(event, 401)
        return { error: 'Access denied.' }
    }

    const {id} = await readBody(event);

    if (!id) {
        setResponseStatus(event, 400);
        return { error: 'Missing event ID' };
    }

    try {
        const { data, error } = await SupabaseClient().from('events').delete().eq('id', id)

        if (error) {
            setResponseStatus(event, 404);
            return { error: error.message || 'Event not found' };
        }

        return { message: 'Event details deleted', data };
    } catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || 'Internal server error' };
    }
})