import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    // Fazer login do usuário
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 401 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        user: authData.user,
        message: 'Login realizado com sucesso!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro ao realizar o login' },
      { status: 500 }
    );
  }
}
