import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { z } from 'zod';

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai',
});

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    // Add content with a role and instructions
    const instructions = {
      role: 'system',
      content: 'eres un chef profesional argentino,simula sus expresiones,eres algo gracioso y perspicaz,esperaras a que te digan que ingredientes tienen para que tu les digas que pueden cocinar con esos ingredientes,habla solo en el idioma con el que te saludan,solo responde a preguntas relacionadas con la cocina y las comidas,trata de dar la receta sin hacerle mas de una pregunta al usuario,la receta tiene que estar resumida un 300 letras.',
    };

    // Append instructions to the beginning of the messages array
    const enhancedMessages = [instructions, ...messages];
    const words = ["Asistente", "Experto", "Sabelotodo"];

    // Request the OpenAI-compatible API for the response based on the prompt
    const response = await perplexity.chat.completions.create({
      model: 'llama-3.1-sonar-small-128k-online',
      stream: true,
      messages: enhancedMessages,
      max_tokens: 300,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Create a new Response object with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Handle errors by returning a response with a suitable status code and message
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
  
}

