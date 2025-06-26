
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const username = 'run_punch_man'
    
    // Fetch Instagram page
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
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    
    // Try to extract data from various possible sources
    let posts = []
    
    // Method 1: Look for window._sharedData (older Instagram)
    const sharedDataMatch = html.match(/window\._sharedData\s*=\s*({.+?});/)
    if (sharedDataMatch) {
      try {
        const sharedData = JSON.parse(sharedDataMatch[1])
        const edges = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges || []
        posts = edges.slice(0, 12).map((edge: any) => ({
          shortcode: edge.node.shortcode,
          display_url: edge.node.display_url,
          is_video: edge.node.is_video,
          caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
          timestamp: edge.node.taken_at_timestamp
        }))
      } catch (e) {
        console.log('Failed to parse _sharedData:', e)
      }
    }
    
    // Method 2: Look for newer JSON structure
    if (posts.length === 0) {
      const jsonMatches = html.match(/"shortcode":"([^"]+)"/g)
      if (jsonMatches) {
        const shortcodes = jsonMatches.slice(0, 12).map(match => 
          match.match(/"shortcode":"([^"]+)"/)?.[1]
        ).filter(Boolean)
        
        posts = shortcodes.map(shortcode => ({
          shortcode,
          display_url: `https://www.instagram.com/p/${shortcode}/media/?size=m`,
          is_video: false,
          caption: '',
          timestamp: Date.now() / 1000
        }))
      }
    }

    // If we still don't have posts, create some sample ones
    if (posts.length === 0) {
      posts = [
        {
          shortcode: 'sample1',
          display_url: 'https://via.placeholder.com/400x400?text=Instagram+Post+1',
          is_video: false,
          caption: 'Sample Instagram post - replace with actual data',
          timestamp: Date.now() / 1000
        },
        {
          shortcode: 'sample2',
          display_url: 'https://via.placeholder.com/400x400?text=Instagram+Post+2',
          is_video: true,
          caption: 'Sample Instagram reel - replace with actual data',
          timestamp: Date.now() / 1000
        }
      ]
    }

    return new Response(
      JSON.stringify({ success: true, posts }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error fetching Instagram data:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        posts: [
          {
            shortcode: 'fallback1',
            display_url: 'https://via.placeholder.com/400x400?text=Instagram+Fallback',
            is_video: false,
            caption: 'Unable to fetch Instagram posts at this time',
            timestamp: Date.now() / 1000
          }
        ]
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200
      }
    )
  }
})
