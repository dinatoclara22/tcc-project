import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

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

    // Registrar o usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // Opcionalmente, você pode inserir dados adicionais na tabela de usuários
    if (authData.user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            name,
            email,
            created_at: new Date(),
          },
        ]);

      if (insertError) {
        console.error('Erro ao inserir usuário na tabela:', insertError);
        // Continuar mesmo se houver erro na tabela
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        user: authData.user,
        message: 'Cadastro realizado com sucesso!' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro no signup:', error);
    return NextResponse.json(
      { error: 'Erro ao realizar o cadastro' },
      { status: 500 }
    );
  }
}
