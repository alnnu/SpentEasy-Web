// middleware.ts
//import { NextResponse } from 'next/server';
//import type { NextRequest } from 'next/server';

// Este middleware redireciona para /login se o usuário não estiver autenticado
//export function middleware(req: NextRequest) {
//  const { pathname } = req.nextUrl;

  // Se a solicitação for para a página de login, deixe-a passar
//  if (pathname === '/signin' || pathname === '/signup') {
//    return NextResponse.next();
//  }

  // Verifique se o usuário está autenticado
//  const token = req.cookies.get('next-auth.session-token')?.value;

//  if (!token) {
    // Redirecione para a página de login se o usuário não estiver autenticado
//    const loginUrl = new URL('/signin', req.url);
//    return NextResponse.redirect(loginUrl);
//  }

  // Deixe a solicitação continuar se o usuário estiver autenticado
//  return NextResponse.next();
//}

// Configuração do middleware para definir quais caminhos ele deve interceptar
//export const config = {
//  matcher: ['/', '/profile/:path*'],
//};
