// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai',
});
 
export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const [{ messages ,}] = await req.json();

    // Request the OpenAI-compatible API for the response based on the prompt
    const response = await perplexity.chat.completions.create({
      model: 'llama-3-sonar-small-32k-chat',
      stream: true,
      messages: messages,
      max_tokens: 20,
      
    });
   
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Create a new Response object with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Handle errors by returning a response with a suitable status code and message
    
  }
}
