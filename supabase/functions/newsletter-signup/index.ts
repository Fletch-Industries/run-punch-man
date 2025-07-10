import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Newsletter signup function called:', req.method)
  
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight')
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Attempting to parse request body...')
    const requestBody = await req.text()
    console.log('Raw request body:', requestBody)
    
    const data = JSON.parse(requestBody)
    console.log('Parsed data:', data)
    
    const { email } = data
    console.log('Extracted email:', email)

    // Simple validation
    if (!email) {
      console.error('No email provided')
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      )
    }

    console.log('Environment check:')
    console.log('SUPABASE_URL:', Deno.env.get('SUPABASE_URL') ? 'SET' : 'NOT SET')
    console.log('SUPABASE_SERVICE_ROLE_KEY:', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ? 'SET' : 'NOT SET')
    console.log('RESEND_API_KEY:', Deno.env.get('RESEND_API_KEY') ? 'SET' : 'NOT SET')

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Basic function test passed',
      email: email,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Error in newsletter signup:", error)
    console.error("Error stack:", error.stack)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
})