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

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "RunPunchMan Training <onboarding@resend.dev>",
      to: [email],
      subject: `Training Session Request Received - ${preferredDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Training Session Request Received!</h2>
          <p>Hi ${name},</p>
          <p>Thanks for booking a training session with Run Punch Man! Here are your details:</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Preferred Date:</strong> ${preferredDate}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime}</p>
            <p><strong>Your Goals:</strong></p>
            <p>${goals}</p>
          </div>
          
          <p>I'll contact you within 24 hours to confirm your session details. Virtual sessions are conducted via video call.</p>
          
          <p>Looking forward to helping you build unbreakable habits!</p>
          
          <p>Keep running,<br>Run Punch Man</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p><a href="https://www.instagram.com/run_punch_man/" style="color: #dc2626;">Follow @run_punch_man</a></p>
          </div>
        </div>
      `,
    })

    // Send notification email to Joseph
    const josephEmailResponse = await resend.emails.send({
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
        <p><em>Please contact the client to confirm the session.</em></p>
      `,
    })

    console.log("Client confirmation email sent:", clientEmailResponse)
    console.log("Joseph notification email sent:", josephEmailResponse)

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