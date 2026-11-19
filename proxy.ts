// middleware.ts
import { auth } from "@/auth" // Ajuste o caminho de importação do seu arquivo auth.ts

export default auth((req) => {
  // req.auth contém a sessão do usuário. Se estiver null/undefined, não está logado.
  const isLoggedIn = !!req.auth
  const isOnLoginPage = req.nextUrl.pathname === "/" // ou "/login"

  // Se o usuário NÃO estiver logado e tentar acessar uma rota protegida (tudo exceto login)
  if (!isLoggedIn && !isOnLoginPage) {
    return Response.redirect(new URL("/", req.nextUrl)) // Redireciona para a página de login
  }

  // Se o usuário JÁ estiver logado e tentar acessar a página de login, redireciona para o dashboard/home interna
  if (isLoggedIn && isOnLoginPage) {
    return Response.redirect(new URL("/comprovantes", req.nextUrl))
  }
})

// Configuração do Matcher: define quais rotas o middleware deve interceptar
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/comprovantes/:path*",
    "/usuarios/:path*"
  ],
}