import NextAuth from "next-auth";
import * as argon2 from 'argon2'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "src/db";
import { authorizeUser } from "src/services";
import { UserRepositoryAdapter } from "src/repositories";


const connection = db();

export default NextAuth({
  adapter: PrismaAdapter(connection.db),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "light",
  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Emails",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        return authorizeUser({
          userRepository: UserRepositoryAdapter(connection),
          email: credentials?.email ?? "",
          rawPassword: credentials?.password ?? "",
          verify: argon2.verify
        });
      },
    }),
  ],
});
