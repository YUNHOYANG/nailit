import { CustomerPortal } from "@polar-sh/nextjs";
import { createClient } from "@/lib/supabase/server";

export const GET = CustomerPortal({
    accessToken: process.env.POLAR_ACCESS_TOKEN || "",
    server: process.env.POLAR_SANDBOX === "true" ? "sandbox" : "production",
    getCustomerId: async (req) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return null;
        }

        const { data: userData } = await supabase
            .from("users")
            .select("polar_customer_id")
            .eq("id", user.id)
            .single();

        return userData?.polar_customer_id || null;
    }
});
