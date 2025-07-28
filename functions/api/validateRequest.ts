export function validateRequest(req: Request): { valid: boolean; message: string } {
  if (req.method !== 'POST') {
    return { valid: false, message: 'Invalid request method' };
  }
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return { valid: false, message: 'Content-Type must be application/json' };
  }
  return { valid: true, message: 'Request is valid' };
}
