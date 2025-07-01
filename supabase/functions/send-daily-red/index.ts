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

async function fetchLatestRED() {
  const sheetId = "1-Nr9UZYxJdHatigpzEOp8wOR_aCfi-AJui-xcm6lqAc"
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`
  
  const response = await fetch(csvUrl)
  const csvText = await response.text()
  const rows = csvText.split('\n').slice(5) // Start from row 6 (index 5)
  
  const parsedEntries = rows
    .filter(row => row.trim() && !row.startsWith(',,,,,'))
    .map(row => {
      const columns = row.split(',').map(col => col.replace(/"/g, '').trim())
      return {
        date: columns[0] || '',
        day: columns[1] || '',
        reason: columns[2] || '',
        excuse: columns[3] || '',
        difference: columns[4] || '',
        quote: columns[5] || ''
      }
    })
    .filter(entry => entry.date && entry.day && entry.reason)

  // Get the most recent entry
  const sortedEntries = parsedEntries.sort((a, b) => parseInt(b.day) - parseInt(a.day))
  return sortedEntries[0]
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Sending daily R.E.D. emails')

    // Get all subscribers
    const { data: subscribers, error: dbError } = await supabase
      .from('newsletter_subscribers')
      .select('email')

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    // Get latest R.E.D. entry
    const latestRED = await fetchLatestRED()

    if (!latestRED) {
      throw new Error('No R.E.D. entry found')
    }

    // Send emails to all subscribers
    const emailPromises = subscribers?.map(subscriber => 
      resend.emails.send({
        from: "RunPunchMan Daily R.E.D. <onboarding@resend.dev>",
        to: [subscriber.email],
        subject: `Day ${latestRED.day} R.E.D. - ${latestRED.date}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #dc2626;">Day ${latestRED.day} R.E.D.</h1>
            <p style="color: #666; margin-bottom: 20px;">${latestRED.date}</p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #16a34a; margin-bottom: 10px;">✅ REASON TO RUN</h3>
              <p>${latestRED.reason}</p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #ea580c; margin-bottom: 10px;">🚫 EXCUSE TO IGNORE</h3>
              <p>${latestRED.excuse}</p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-bottom: 10px;">⚡ DIFFERENCE ABOUT TODAY</h3>
              <p>${latestRED.difference}</p>
            </div>
            
            ${latestRED.quote ? `
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6b7280;">
              <h3 style="color: #4b5563; margin-bottom: 10px;">😐 SAITAMA SAYS</h3>
              <p style="font-style: italic;">"${latestRED.quote}"</p>
            </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 30px;">
              <p>Keep running! 🏃‍♂️</p>
              <p><a href="https://www.instagram.com/run_punch_man/" style="color: #dc2626;">Follow @run_punch_man</a></p>
            </div>
          </div>
        `,
      })
    ) || []

    await Promise.all(emailPromises)

    console.log(`Daily R.E.D. sent to ${subscribers?.length || 0} subscribers`)

    return new Response(JSON.stringify({ 
      success: true, 
      sent_to: subscribers?.length || 0 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Error sending daily R.E.D.:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
})