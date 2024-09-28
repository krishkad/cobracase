import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            // profile(profile) {
            //     // Specify the type for GitHub's profile data
            //     return profile
            // },
            clientId: process.env.GITHUB_CLIENT_ID! as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
        }),
        GoogleProvider({
            // profile(profile) {
            //     return {
            //         id: profile.id.toString(),
            //         name: profile.name || profile.login,
            //         email: profile.email,
            //         image: profile.avatar_url,
            //     }
            // },
            clientId: process.env.GOOGLE_CLIENT_ID! as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
        }),
        // CredentialsProvider({
        //     name: "Email and Password",
        //     credentials: {
        //         email: { label: 'Email', type: 'email', placeholder: 'your-email@example.com' },
        //         password: { label: 'Password', type: 'password' },
        //         name: { label: 'Name', type: 'text' },
        //     },
        //     async authorize(credentials, req) {
        //         return null
        //     },
        // })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            // await connectToDatabase(); // Connect to MongoDB

            // Add user.id and extra fields to token if available
            if (user) {
                token.id = user.id;
                token.name = user.name;
                // token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            // session.id = token.id;
            session.user = {
                // id: token.id,
                name: token.name,
                // username: token.username,
                email: token.email,
            };
            return session;
        },
    },
    pages: {
        signIn: '/auth/sign-in'
    },
    secret: process.env.NEXTAUTH_SECRET as string
}