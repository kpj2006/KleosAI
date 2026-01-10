import { NextResponse } from 'next/server';
// Ensure you ran: npm install @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai"; 

export async function POST(request) {
  try {
    const { data } = await request.json();

    // 1. ENVIRONMENT SECURITY
    const apiKey = process.env.GEMINI_API_KEY; 
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key missing. Please check your .env.local file.' },
        { status: 401 }
      );
    }

    // 2. INITIALIZE PREMIUM AI MODEL
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } // Forces JSON output
    });

    // 3. THE "GROWTH MENTOR" SYSTEM PROMPT
    const systemPrompt = `
      You are 'The Growth Mentor', a premium AI financial strategist for 'Team Schrödinger Devs'. 
      Your tone is empowering, data-driven, and highly professional.
      
      TASK: Analyze the provided transaction history: ${JSON.stringify(data)}
      
      STRICT OUTPUT REQUIREMENTS:
      1. Persona: Speak like a high-level mentor (e.g., 'I have identified an optimization path...', 'To accelerate your goals...').
      2. Quantity: Provide exactly 4 high-impact insights.
      3. Length: Each insight MUST be 2-3 detailed sentences long.
      4. Format: Return ONLY a raw JSON array of objects with 'category' and 'text' keys.
      
      JSON STRUCTURE:
      [
        {"category": "Wealth Strategist", "text": "I've noticed a recurring pattern in your subscription outflows..."},
        {"category": "Goal Accelerator", "text": "Your current allocation toward 'Mobile' is impressive..."}
      ]
    `;

    // 4. GENERATE CONTENT
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    let rawText = response.text();

    // 5. CRITICAL SANITIZATION: Strip Markdown backticks to avoid crash
    const cleanJson = rawText.replace(/```json|```/gi, "").trim();
    
    // 6. PARSE & RETURN
    const parsed = JSON.parse(cleanJson);
    return NextResponse.json({ insights: parsed });

  } catch (error) {
    console.error("Growth Mentor Error:", error);
    // Standardized error response matching your project logs
    return NextResponse.json(
      { error: 'Mentor Analysis Failed', details: error.message },
      { status: 500 }
    );
  }
}