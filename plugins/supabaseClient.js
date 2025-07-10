import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(nuxtApp => {
  const supabaseUrl = useRuntimeConfig().public.supabaseUrl
  const supabaseAnonKey = useRuntimeConfig().public.supabaseAnonKey

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  return {
    provide: {
      supabase
    }
  }
})