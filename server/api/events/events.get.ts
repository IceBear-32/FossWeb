import { SupabaseClient } from "~/server/utils/supabase"

export default defineEventHandler(async (event) => {
    try {
        const body = await getHeaders(event);
        const from = getQuery(event).from as string | undefined || body.from as string | undefined;

        if (!from || (from !== 'past' && from !== 'upcoming' && from !== 'all')) {
            setResponseStatus(event, 400)
            return { error: 'Invalid or missing "from" parameter' }
        }

        const { data: events, error } = await SupabaseClient().from('events').select('*').order('date', { ascending: true });

        if (error) {
            setResponseStatus(event, 500);
            return { error: error.message || "Failed to fetch events" };
        }

        if (!events || events.length === 0) {
            setResponseStatus(event, 404);
            return { error: "No events found" };
        }

        if (from === 'past') {
            const pastEvents = events.filter(event => new Date(event.date) < new Date());
            return { events: pastEvents };
        } else if (from === 'upcoming') {
            const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
            return { events: upcomingEvents };
        }

        return { events };
    }
    catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || "Internal server error" };
    }
})