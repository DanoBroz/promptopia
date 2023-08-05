import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            session = {
                ...session,
            };
            const sessionUser = await User.findOne({
                email: session.user.email,
            });
            // @ts-ignore
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email,
                });

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(" ", "")
                            .toLowerCase(),
                        // @ts-ignore
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
