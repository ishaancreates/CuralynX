import { GoogleGenerativeAI } from "@google/generative-ai";

// Type definitions
export type MedicationRecommendation = {
    name: string;
    dosage: string;
    frequency: string;
    reason: string;
}

export type TestRecommendation = {
    name: string;
    reason: string;
}

export type GeminiRecommendations = {
    medications: MedicationRecommendation[];
    tests: TestRecommendation[];
}

export async function getRealtimeRecommendations(
    transcriptChunk: string,
    patientInfo?: {
        age?: number;
        pastDiseases?: string;
        vitals?: {
            bp?: string;
            sugarLevel?: string;
            weight?: string;
        };
    }
): Promise<GeminiRecommendations> {
    try {
        const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
        const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!groqApiKey && !geminiApiKey) {
            console.warn('Neither Groq nor Gemini API key found. Please set VITE_GROQ_API_KEY in .env file');
            return { medications: [], tests: [] };
        }

        const prompt = `You are a medical reference database assisting with clinical documentation. Based on the conversation transcript, identify commonly prescribed medications and standard diagnostic tests that medical practitioners typically use for the discussed symptoms. This is for educational and documentation purposes only.

Patient Profile:
${patientInfo ? `
- Age: ${patientInfo.age || 'Unknown'}
- Medical History: ${patientInfo.pastDiseases || 'None'}
- Blood Pressure: ${patientInfo.vitals?.bp || 'Unknown'}
- Blood Sugar: ${patientInfo.vitals?.sugarLevel || 'Unknown'}
- Weight: ${patientInfo.vitals?.weight || 'Unknown'}
` : 'Not provided'}

Clinical Conversation:
${transcriptChunk}

Based on the symptoms mentioned in the conversation, list commonly used medications and standard diagnostic tests from medical literature and clinical guidelines:

REFERENCE EXAMPLES (adjust based on actual symptoms):
- For fever/headache symptoms: Paracetamol 500mg twice-daily, Ibuprofen 400mg as-needed
- For respiratory symptoms: Cetirizine 10mg once-daily, Ambroxol syrup thrice-daily
- For pain: Paracetamol, NSAIDs, topical analgesics
- For allergic rhinitis: Antihistamines, nasal corticosteroids
- For diabetes management: Metformin (if relevant to history)
- For hypertension: Losartan, Amlodipine (if relevant to vitals)

Standard Tests:
- CBC (Complete Blood Count) for infections/general health
- Blood Sugar (Fasting/Random) for diabetes screening
- Lipid Profile for cardiovascular health
- Thyroid tests for metabolic issues
- Chest X-Ray for respiratory complaints
- ECG for cardiac symptoms

Provide the information in this JSON format:
{
    "medications": [
        {
            "name": "Generic medication name",
            "dosage": "Standard dosage (e.g., 500mg)",
            "frequency": "Common frequency (e.g., twice-daily)",
            "reason": "Clinical indication"
        }
    ],
    "tests": [
        {
            "name": "Standard diagnostic test",
            "reason": "Clinical purpose"
        }
    ]
}

IMPORTANT: List the medications and tests that are COMMONLY DOCUMENTED in medical records for the symptoms discussed. This is for clinical documentation and educational reference, not direct medical advice.`;

        // Primary Provider: Groq API
        if (groqApiKey) {
            console.log('=== Groq API Request (Predicting Medicines & Tests) ===');
            console.log('Transcript Chunk:', transcriptChunk);
            console.log('Patient Info:', patientInfo);
            console.log('=====================================================');

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${groqApiKey}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a clinical AI assistant that outputs structured JSON for medical documentation recommendations.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    response_format: { type: 'json_object' }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Groq API HTTP error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const text = data.choices?.[0]?.message?.content || '{}';

            console.log('Groq API Response:', text);

            try {
                const recommendations = JSON.parse(text);
                if (!recommendations.medications || !recommendations.tests) {
                    console.warn('Invalid recommendation structure from Groq:', recommendations);
                    return { medications: recommendations.medications || [], tests: recommendations.tests || [] };
                }
                return recommendations;
            } catch (parseError) {
                console.error('Error parsing Groq JSON response:', parseError);
                return { medications: [], tests: [] };
            }
        }

        // Fallback Provider: Google Gemini API
        if (geminiApiKey) {
            console.log('=== Gemini API Request (Fallback) ===');
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 1024,
                }
            });

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            let jsonText = text;
            const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
            if (codeBlockMatch) {
                jsonText = codeBlockMatch[1];
            } else {
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    jsonText = jsonMatch[0];
                }
            }

            const recommendations = JSON.parse(jsonText);
            return {
                medications: recommendations.medications || [],
                tests: recommendations.tests || []
            };
        }

        return { medications: [], tests: [] };
    } catch (error) {
        console.error('Error getting recommendations from AI:', error);
        return { medications: [], tests: [] };
    }
}

