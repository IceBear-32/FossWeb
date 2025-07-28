import { SupabaseServerClient, SupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const code = getQuery(event).code as string | undefined
    const redirect = getQuery(event).redirect as string | undefined

    if (!code) {
      setResponseStatus(event, 400)
      return { error: 'Missing code' }
    }

    const supabase = SupabaseServerClient(event)

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      setResponseStatus(event, 401)
      sendRedirect(event, '/join')
      return { error: error.message }
    }

    const profile = await SupabaseClient().from('profiles').select('*').eq('uid', data.user?.id).single()

    const pData = profile.data ?? (await SupabaseClient().from('profiles').insert({
      uid: data.user?.id,
      email: data.user?.email,
      phone: data.user?.phone,
      avatar: data.user?.user_metadata.avatar_url,
      username: data.user?.user_metadata.full_name
    }).select().single()).data

    sendRedirect(event, redirect || '/')

    return { session: data.session, user: data.user, profile: pData }
  } catch (err) {
    setResponseStatus(event, 500);
    return { error: (err as Error).message || "Internal server error" };
  }
})
