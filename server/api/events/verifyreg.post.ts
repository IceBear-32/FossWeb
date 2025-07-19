import { SupabaseClient, isUserAdmin } from "~/server/utils/supabase";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const { title, pRegNo, pName, pClass } = body;

    const isAdmin = await isUserAdmin(event)

    if (!isAdmin) {
        setResponseStatus(event, 401)
        return { error: 'Access denied.' }
    }

    if (!title || !pRegNo || !pName || !pClass) {
        setResponseStatus(event, 400);
        return { error: 'Missing required fields' };
    }

    try {
        const { data, error } = await SupabaseClient().from('verified-event-registrations').insert([
            { title, 'p-reg-no': pRegNo, 'p-name': pName, 'p-class': pClass }
        ]).select();

        if (error) {
            setResponseStatus(event, 401);
            return { error: error.message || 'Verification failed' };
        }

        return { data };
    } catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || 'Internal server error' };
    }
})