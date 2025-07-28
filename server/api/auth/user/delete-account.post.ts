import { SupabaseServerClient, SupabaseClient } from "@/server/utils/supabase";

export default defineEventHandler(async event => {
    try {
    const user = await SupabaseServerClient(event).auth.getUser();
    
    if (user.error) {
      setResponseStatus(event, 401);
      return { error: user.error?.message || "Unauthorized" };
    }
    if (!user.data.user) {
      setResponseStatus(event, 404);
      return { error: "User not found" };
    }

    const {data: pData, error: pError} = await SupabaseClient().from('profiles').delete().eq('uid', user.data.user.id);
    const {data: mData, error: mError} = await SupabaseClient().storage.from('media').remove([`profiles/${user.data.user.id}`]);
    const {data: aData, error: aError} = await SupabaseServerClient(event).auth.admin.deleteUser(user.data.user.id, false);

    if (pError || mError || aError) {
        setResponseStatus(event, 401);
        return { error: pError?.message || mError?.message || aError?.message || "Unauthorized" };
    }

    return {
      message: 'Account deleted successfully'
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { error: (err as Error).message || "Internal server error" };
  }
})