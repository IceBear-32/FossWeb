import { SupabaseServerClient, SupabaseClient, uploadFile } from "../../utils/supabase";
import { createCanvas } from 'canvas'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password, name, phone } = body;

    const supabase = SupabaseServerClient(event)

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone: phone
    })

    if (error) {
        setResponseStatus(event, 401)
        return { error: error.message }
    }


    const location = getRequestURL(event)

    await supabase.auth.admin.updateUserById(data.user!.id, {
        user_metadata: {
            full_name: name
        }
    })

    await SupabaseClient().from('profiles').insert(
        {
            uid: data.user?.id,
            email,
            phone,
            avatar: '',
            username: name
        }
    )

    return { session: data.session, user: data.user }
})