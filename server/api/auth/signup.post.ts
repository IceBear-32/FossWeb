import { SupabaseServerClient, SupabaseClient, uploadFile } from "../../utils/supabase";
import { createCanvas } from 'canvas'

function createProfileImage(name: string) {
    let shortName = ''
    name.split(' ').forEach((word) => {
        shortName += word[0]
    })
    
    if(shortName.length > 2) shortName = shortName.slice(0, 2) + '.'

    const width = 500;
    const height = 500;
    const backgroundColor = '#101820';
    const textColor = '#a2eaff';

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 250px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(shortName, width / 2, height / 2);

    return canvas.toDataURL('image/png')
}

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

    const { data: message } = await uploadFile(createProfileImage(name), `profiles/${data.user?.id}.png`, 'image/png')

    const avatar_uploaded = !!message

    const location = getRequestURL(event)

    await supabase.auth.admin.updateUserById(data.user!.id, {
        user_metadata: {
            full_name: name
        }
    })

    const avatar = avatar_uploaded ? `${location.origin}/api/storage/fetch?path=profiles/${data.user?.id}.png` : ''

    await SupabaseClient().from('profiles').insert(
        {
            uid: data.user?.id,
            email,
            phone,
            avatar,
            username: name
        }
    )

    return { session: data.session, user: data.user }
})