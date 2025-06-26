
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function fetchLatestShortcodes(username: string, seen: string[] = []) {
  try {
    console.log(`Fetching Instagram page for ${username}`);
    
    const response = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log(`Received HTML response, length: ${html.length}`);
    
    const regex = /"shortcode":"([A-Za-z0-9_-]{11})"/g;
    const codes = [...html.matchAll(regex)].map(m => m[1]);
    
    console.log(`Found ${codes.length} shortcodes:`, codes);
    
    // Filter out already seen codes and return newest first
    const newCodes = codes.filter(c => !seen.includes(c));
    console.log(`Returning ${newCodes.length} new shortcodes`);
    
    return newCodes;
  } catch (error) {
    console.error('Error fetching Instagram shortcodes:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username, seen = [] } = await req.json();
    
    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Username is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const shortcodes = await fetchLatestShortcodes(username, seen);
    
    const posts = shortcodes.map(shortcode => ({ shortcode }));
    
    return new Response(
      JSON.stringify({ 
        posts,
        success: true,
        message: `Found ${posts.length} posts`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in fetch-instagram function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch Instagram posts',
        details: error.message,
        success: false
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
