import { isUserAdmin, uploadFile } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { path, file, type } = body;

        const isAdmin = await isUserAdmin(event)

        if (!isAdmin) {
            setResponseStatus(event, 401)
            return { error: 'Access denied.' }
        }

        if (!file || !path) {
            setResponseStatus(event, 400);
            return { error: "File and path are required" };
        }

        const { data, error } = await uploadFile(file, path, type)

        if (error) {
            setResponseStatus(event, 500);
            return { error: error.message };
        }

        return {
            message: "File uploaded successfully",
            data
        };
    } catch (err) {
        setResponseStatus(event, 500);
        return { error: (err as Error).message || "Internal server error" };
    }
});