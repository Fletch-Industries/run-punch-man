import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Newsletter signup function called:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    console.log('Newsletter signup for:', email)

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Attempting to save to database...')
    
    // Store subscriber in database
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString() }])
      .select()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe', details: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      )
    }

    console.log("Database insertion successful:", data)

    // Initialize Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

    // Send simple welcome email (without Google Sheets for now)
    try {
      console.log('Sending welcome email...')
      const emailResponse = await resend.emails.send({
        from: "RunPunchMan Daily R.E.D. <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to the R.E.D. Community!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #dc2626;">Welcome to the R.E.D. Community!</h1>
            <p>Thank you for subscribing to daily R.E.D. (Reason, Excuse, Difference)!</p>
            <p>You'll receive your daily motivation at noon PST starting tomorrow.</p>
            <p>Keep running! 🏃‍♂️</p>
            <p><a href="https://www.instagram.com/run_punch_man/" style="color: #dc2626;">Follow @run_punch_man</a></p>
          </div>
        `,
      })

      console.log("Welcome email sent successfully:", emailResponse)
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError)
      // Don't fail the subscription if email fails
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Error in newsletter signup:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
})