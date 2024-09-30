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
                console.log("üser: ", isExistingUser);

                if (!isExistingUser) {
                    await User.create({
                        email: profile.email
                    })
                }

                return profile
            },
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