import auth from "@/service/auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { use } from "react"



const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'spenteasyapi',
            name: 'spenteasyapi',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "senha", type: "password" },
            },
            async authorize(credentials) {
                let user:{email:string, name:string, token:string} | null = null

                if (typeof credentials !== "undefined") {
                   await auth.doLogin(
                        credentials.email,
                        credentials.password
                    ).then((resp) => {
                        user = {
                            ...resp.data
                        }
                    })
                    return user
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user}) => {
            // objeto user é a resposta da API
            if (user) {
                const userData = user as unknown as any;
                return {
                    jwttoken: userData.token,
                    ...userData
                }   
            }
            return token;
        },
        session: async ({ session, token: jwttoken }) => {
            //O objeto token ou jwt é o objeto criado na função callback
            return {
                ...session,
                api_token: jwttoken,
            };
        },
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
