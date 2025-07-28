import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { decode } from 'base64-arraybuffer'

export const SupabaseServerClient = (event: H3Event) => {
  const config = useRuntimeConfig()
  return createServerClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    {
      cookies: {
        get(name) {
          return getCookie(event, name)
        },
        set(name, value, options) {
          setCookie(event, name, value, options)
        },
        remove(name, options) {
          deleteCookie(event, name, options)
        }
      }
    }
  )
}

export const SupabaseClient = () => {
  const config = useRuntimeConfig()
  return createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey
  )
}

export const isUserAdmin = async (event: H3Event) => {
    const { data, error } = await SupabaseServerClient(event).auth.getUser()

    if (error || !data?.user) return false
    return (data.user.role == 'admin')
}

export const uploadFile = async (file: string, path: string, type: string) => {
  return SupabaseClient().storage
            .from('media')
            .upload(path, decode(file.split('base64,')[1]), {
                contentType: type
  })
}

export const updateFile = async (file: string, path: string, type: string) => {
  return SupabaseClient().storage
            .from('media')
            .update(path, decode(file.split('base64,')[1]), {
                contentType: type
  })
}