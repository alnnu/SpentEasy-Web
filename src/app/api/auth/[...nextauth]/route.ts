import auth from "@/service/auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'spenteasyapi',
            name: 'spenteasyapi',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "senha", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await auth.doLogin(credentials?.email, credentials?.password)
                console.log(res + "sdadsd")
                
                if (res.status = 200) {
                    console.log(res)
                    return res.data
                }

                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 5, // 5 hours
    },
    // debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/signin",
    },

})

export { handler as GET, handler as POST }