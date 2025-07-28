export async function ResumeDownloadBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await req.json();
    const { format, resumeData } = body;

    if (!format || !resumeData) {
      return new Response(JSON.stringify({ error: 'Missing required fields: format, resumeData' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Validate format
    const allowedFormats = ['pdf', 'word', 'link'];
    if (!allowedFormats.includes(format)) {
      return new Response(JSON.stringify({ error: 'Invalid format specified' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Mock processing of resumeData
    const processedResume = processResumeData(resumeData, format);

    return new Response(JSON.stringify({ success: true, data: processedResume }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function processResumeData(resumeData: any, format: string): any {
  // Mock function to simulate processing of resume data
  return {
    format: format,
    resume: `Processed resume data for format: ${format}`
  };
}
