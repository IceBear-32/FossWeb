import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
    const user = useState<User | null>('user', () => null)
    const userLoggedIn = useState<boolean>('userLoggedIn', () => false)
    const userIsAdmin = useState<boolean>('userIsAdmin', () => false)
    const userProfile = useState<any>('userProfile', () => null)
    const authReady = useState<boolean>('authRead', () => false)

    const getUser = async () => {
        $fetch('/api/auth/user/profile', {
            method: 'GET',
            onResponseError: (error) => {
                user.value = null
                userLoggedIn.value = false
                userIsAdmin.value = false
                userProfile.value = null
            },
            onResponse: (data) => {
                if (data.response._data.user) {
                    user.value = data.response._data.user
                    userLoggedIn.value = true
                    userIsAdmin.value = user.value?.role == 'admin'
                    userProfile.value = data.response._data.profile
                } else {
                    user.value = null
                }
            }
        }).finally(() => authReady.value = true)
    }

    const setAvatar = (avatar_url: string) => {
        if (userProfile.value) userProfile.value.avatar = avatar_url
    }
    return { user, getUser, userLoggedIn, userIsAdmin, userProfile, authReady, setAvatar }
}
