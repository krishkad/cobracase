import { ConnectToDatabase } from "@/database/db";
import User from "@/database/models/user";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from "bcryptjs"




export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            async profile(profile) {
                // Specify the type for GitHub's profile data
                await ConnectToDatabase();


                const isExistingUser = await User.findOne({ email: profile?.email });

                if (!isExistingUser) {
                    const newUser = await User.create({
                        email: profile.email,
                        signUpOrigin: "github"
                    });
                    return newUser;
                };

                return isExistingUser;
            },
            clientId: process.env.GITHUB_CLIENT_ID! as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
        }),
        GoogleProvider({
            async profile(profile) {
                // Specify the type for GitHub's profile data
                await ConnectToDatabase();


                const isExistingUser = await User.findOne({ email: profile.email });

                if (!isExistingUser) {
                    const newUser = await User.create({
                        email: profile.email,
                        signUpOrigin: "google"
                    })
                    return newUser
                }

                return isExistingUser
            },
            clientId: process.env.GOOGLE_CLIENT_ID! as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
        }),
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'your-email@example.com' },
                password: { label: 'Password', type: 'password' },
                name: { label: 'Name', type: 'text' },
                authType: { label: 'authType', type: 'text', required: true },
            },
            async authorize(credentials) {
                await ConnectToDatabase();
                if (credentials) {
                    if (credentials.authType === "login") {

                        const isExistingUser = await User.findOne({ email: credentials?.email });

                        if (isExistingUser) {
                            const isPasswordCorrect = bcryptjs.compareSync(credentials?.password, isExistingUser.password);

                            if (!isPasswordCorrect) {
                                throw new Error('Invalid credentials');
                            }

                            return isExistingUser;
                        }

                        throw new Error("No account found. Try Create Account")
                    }

                    if (credentials.authType === "create") {
                        const isExistingUser = await User.findOne({ email: credentials?.email });

                        if (isExistingUser) {
                            throw new Error("Email already exist. Please Login")
                        }

                        const hashedPassword = await bcryptjs.hash(credentials.password, 10);
                        const newUser = await User.create({
                            email: credentials.email,
                            password: hashedPassword,
                            name: credentials.name,
                            signUpOrigin: "cobracase"
                        });

                        return newUser; // Return new user after creation
                    }

                }
            },
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                name: token.name
            }


            return session;
        },
        // async redirect({ url, baseUrl }) {
        //     // Example: Redirect the user to a custom dashboard
        //     console.log("Redirect Callback Triggered:", { url, baseUrl });
        //     if (url.startsWith("/preview")) {
        //         return `${baseUrl}/${url}`;
        //     }
        //     return baseUrl; // Default redirect if no custom logic
        // },
    },
    pages: {
        signIn: '/auth/sign-in'
    },
    secret: process.env.NEXTAUTH_SECRET as string
}