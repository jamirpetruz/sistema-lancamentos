import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { createUsuario, getUsuarioByEmail } from "./models/Usuarios"
import bcrypt from 'bcrypt'
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if(!credentials?.email || !credentials?.password) {
          throw new Error("Digite o email e a senha.")
        }
        let user = await getUsuarioByEmail(credentials.email as string)
        if(!user) {
          throw new Error("Usuário não encontrado.")
        }
        const isMatch = await bcrypt.compare(credentials.password as string, user.senha)
        if(!isMatch) {
          throw new Error("Credenciais inválidas.")
        }
        return {
          id: user.userId!!.toString(),
          name: user.nome, // ajuste conforme o nome da coluna no seu banco
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    // Passa o id do usuário para o token JWT assim que ele loga
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    // Disponibiliza o id na sessão que você consome nos componentes/páginas
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/", // Se a sua página de login for a raiz do site
  },
})