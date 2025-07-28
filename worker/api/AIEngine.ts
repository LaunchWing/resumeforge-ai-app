import { validateRequest } from '../../functions/api/validateRequest';
import { processUserInput } from '../../functions/api/processUserInput';

export async function AIEngineHandler(req: Request): Promise<Response> {
  try {
    const { valid, message } = validateRequest(req);
    if (!valid) {
      return new Response(JSON.stringify({ error: message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const userInput = await req.json();
    const processedData = await processUserInput(userInput);
    return new Response(JSON.stringify(processedData), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
