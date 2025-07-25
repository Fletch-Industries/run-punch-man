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

    // Check if this time slot is already booked
    const bookingDateTime = `${preferredDate} ${preferredTime}`
    console.log('Checking availability for:', bookingDateTime)

    const { data: existingBookings, error: checkError } = await supabase
      .from('training_bookings')
      .select('*')
      .eq('preferred_date', preferredDate)
      .eq('preferred_time', preferredTime)
      .neq('status', 'cancelled')

    if (checkError) {
      console.error('Error checking existing bookings:', checkError)
      return new Response(
        JSON.stringify({ error: 'Failed to check availability' }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      )
    }

    if (existingBookings && existingBookings.length > 0) {
      return new Response(
        JSON.stringify({ error: 'This time slot is already booked. Please select a different time.' }),
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
      subject: `Training Session Confirmed - ${preferredDate} at ${preferredTime}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Training Session Confirmed!</h2>
          <p>Hi ${name},</p>
          <p>Your training session with Run Punch Man has been confirmed! Here are your session details:</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Date:</strong> ${preferredDate}</p>
            <p><strong>Time:</strong> ${preferredTime} PST</p>
            <p><strong>Meeting Link:</strong> <a href="https://meet.google.com/zwb-dcpq-gdq" style="color: #dc2626; font-weight: bold;">Join Google Meet</a></p>
            <p><strong>Your Goals:</strong></p>
            <p>${goals}</p>
          </div>
          
          <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">Important Session Information:</h3>
            <p style="margin: 5px 0;">📅 Add this to your calendar</p>
            <p style="margin: 5px 0;">💻 Join via: <strong>https://meet.google.com/zwb-dcpq-gdq</strong></p>
            <p style="margin: 5px 0;">📱 Have your phone ready for backup connection</p>
          </div>
          
          <p>I'm excited to help you build unbreakable habits and break your limits!</p>
          
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
      subject: `Training Session Booked - ${name} on ${preferredDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Training Session Booked!</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Client:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Date:</strong> ${preferredDate}</p>
            <p><strong>Time:</strong> ${preferredTime} PST</p>
            <p><strong>Meeting Link:</strong> <a href="https://meet.google.com/zwb-dcpq-gdq" style="color: #dc2626;">https://meet.google.com/zwb-dcpq-gdq</a></p>
          </div>
          <div style="background: #fff; border-left: 4px solid #dc2626; padding: 15px;">
            <p><strong>Client Goals:</strong></p>
            <p>${goals}</p>
          </div>
          <hr style="margin: 30px 0;">
          <p style="color: #666;"><em>Session automatically confirmed and client notified with meeting details.</em></p>
        </div>
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