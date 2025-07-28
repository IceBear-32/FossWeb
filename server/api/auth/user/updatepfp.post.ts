import { SupabaseServerClient, updateFile } from "../../../utils/supabase";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const { image, type } = body;

    if (!image || !type) {
        setResponseStatus(event, 401)
        return { error: 'Missing required fields' }
    }

    if (!type.startsWith('image')) {
        setResponseStatus(event, 415)
        return { error: "Unsupported media type" }
    }

    try {
        const { data: { user }, error } = await SupabaseServerClient(event).auth.getUser()

        if (error) {
            setResponseStatus(event, 401);
            return { error: error?.message || 'Unauthorized' }
        }

        if (!user) {
            setResponseStatus(event, 401);
            return { error: 'User not found' }
        }

        const { data, error: err } = await updateFile(image, 'profiles/'+user.id, type)

        if (err) {
            setResponseStatus(event, 401);
            return { error: err?.message || 'Unauthorized' }
        }

        if (!data) {
            setResponseStatus(event, 404)
            return { error: 'Data not found' }
        }

        const location = getRequestURL(event)

        const { data: profData, error: profErr } = await SupabaseClient().from('profiles').update({
            avatar: `${location.origin}/api/storage/fetch?path=${data.path}`
        }).eq('uid', user.id).select().single()

        return {
            message: 'Updated successfully',
            data,
            profile: profData
        }

    } catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || "Internal server error" };
    }
})