import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // MOCK AUTH for testing
    if (email === "gopalfml216@gmail.com" && password === "password123") {
      return NextResponse.json({
        message: 'Login successful',
        token: 'mock-session-id-123'
      });
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}