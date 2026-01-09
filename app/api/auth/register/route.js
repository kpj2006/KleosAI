import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // 1. VALIDATION
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // 2. MOCK REGISTRATION LOGIC
    // This logs the user to your VS Code terminal for verification
    console.log(`✅ NEW USER CREATED: ${name} (${email})`);

    return NextResponse.json({
      message: 'Account created successfully',
      user: { name, email }
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed', error: error.message }, 
      { status: 500 }
    );
  }
}