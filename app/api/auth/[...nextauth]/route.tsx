import NextAuth, { AuthOptions, DefaultUser, Profile, Session } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDb } from '@/utils/db';
import User from '@/models/user';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const usr = await User.findOne({ email: session.user?.email });
      if (session && session.user && usr) {
        session.user.id = usr._id.toString();
      }

      return session;
    },

    async signIn({ profile }: { profile: DefaultUser }) {
      try {
        await connectToDb();
        // check if a user already exists
        const usr = await User.findOne({ email: profile.email! });

        // if not, create a new user and save it to the db
        if (!usr) {
          await User.create({
            email: profile.email!,
            username: profile.name!.replace(" ", "").toLowerCase(),
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
  secret: process.env.NEXT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };