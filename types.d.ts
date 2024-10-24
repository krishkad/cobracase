import NextAuth from "next-auth"



declare module "next-auth" {
    interface Session {
        user: {
            id: string | null; // Add custom id field
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
}
