import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, phone, preferredDate, preferredTime, goals } = await req.json()

    console.log('Training booking request:', { name, email, preferredDate, preferredTime })

    // Check if booking is at least 7 days in advance
    const bookingDate = new Date(preferredDate)
    const today = new Date()
    const sevenDaysFromNow = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000))

    if (bookingDate < sevenDaysFromNow) {
      return new Response(
        JSON.stringify({ error: 'Bookings must be made at least 7 days in advance' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      )
    }

    // Store booking in database
    const { data, error } = await supabase
      .from('training_bookings')
      .insert([{
        name,
        email,
        phone,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        goals,
        created_at: new Date().toISOString()
      }])
      .select()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to save booking' }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      )
    }

    // Send email to Joseph
    const emailResponse = await resend.emails.send({
      from: "RunPunchMan Training <onboarding@resend.dev>",
      to: ["josephmeeko@gmail.com"],
      subject: `New Training Session Request - ${name}`,
      html: `
        <h2>New Training Session Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime}</p>
        <p><strong>Goals:</strong></p>
        <p>${goals}</p>
        <hr>
        <p><strong>Rate:</strong> $40 for 30 minutes</p>
        <p><em>Please contact the client to confirm the session.</em></p>
      `,
    })

    console.log("Training booking email sent:", emailResponse)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Error in training booking:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
})