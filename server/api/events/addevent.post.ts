import { SupabaseClient, isUserAdmin } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { title, description, date, thumbnail } = body

    const isAdmin = await isUserAdmin(event)

    if (!isAdmin) {
        setResponseStatus(event, 401)
        return { error: 'Access denied.' }
    }
    
    if (!title || !date) {
        setResponseStatus(event, 400)
        return { error: 'Missing required fields' }
    }
    
    try {
        const { data, error } = await SupabaseClient().from('events').insert([
        { title, description: description || null, date, images: { thumbnail: thumbnail ?? '', gallery: [] } }
        ]).select().single()
    
        if (error) {
        setResponseStatus(event, 500)
        return { error: error.message || 'Failed to create event' }
        }
    
        return { message: "Event added!", event: data }
    } catch (err) {
        setResponseStatus(event, 500)
        return { error: (err as Error).message || 'Internal server error' }
    }
})