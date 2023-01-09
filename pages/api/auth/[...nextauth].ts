import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import KakaoProvider from 'next-auth/providers/kakao';
import client from '@libs/server/client';

export default NextAuth({
  adapter: PrismaAdapter(client),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
    }),
  ],
  // session: {
  //   strategy: 'database',
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
});
