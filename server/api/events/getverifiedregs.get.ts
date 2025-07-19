import { SupabaseClient } from "~/server/utils/supabase";

export default defineEventHandler(async event => {
    try {
        const { data, error } = await SupabaseClient().from('verified-event-registrations').select('*');

        if (error) {
            setResponseStatus(event, 404);
            return { error: error.message || 'No verified registrations found' };
        }

        if (!data || data.length === 0) {
            setResponseStatus(event, 404);
            return { error: 'No verified registrations found' };
        }

        return { registrations: data };
    }
    catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || 'Internal server error' };
    }
})