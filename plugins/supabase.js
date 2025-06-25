import { defineNuxtPlugin } from '#app'
import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
    const supabaseUrl = 'https://sayvcrdhwdzarttklfvd.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNheXZjcmRod2R6YXJ0dGtsZnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzI2NDUsImV4cCI6MjA2NjM0ODY0NX0.9kDaRGoCT-Jd8vNx37OXEwMbKwz09u1Zm49k-PprpfA';

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    return {
        provide: {
            supabase
        }
    }
})