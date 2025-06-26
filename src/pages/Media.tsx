
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface InstagramPost {
  shortcode: string;
  display_url: string;
  is_video: boolean;
  caption: string;
  timestamp: number;
}

const Media = () => {
  const [activeTab, setActiveTab] = useState<'instagram' | 'strava'>('instagram');
  const [currentPage, setCurrentPage] = useState(1);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const itemsPerPage = 6;

  // Sample Strava activity IDs - replace these with actual activity IDs
  const stravaActivities = [
    "10234567890", // Replace with actual activity IDs
    "10234567891",
    "10234567892",
    "10234567893",
    "10234567894",
    "10234567895",
  ];

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      setLoading(true);
      console.log("Fetching Instagram posts from edge function...");
      
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-instagram`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setInstagramPosts(data.posts);
          console.log("Successfully fetched", data.posts.length, "Instagram posts");
        } else {
          console.error("Failed to fetch Instagram posts:", data.error);
          setInstagramPosts(data.posts || []); // Use fallback posts
          toast({
            title: "Instagram Loading Issue",
            description: "Using cached content while we resolve the connection.",
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        // Set fallback posts
        setInstagramPosts([
          {
            shortcode: 'fallback1',
            display_url: 'https://via.placeholder.com/400x400?text=Instagram+Content',
            is_video: false,
            caption: 'Instagram content will appear here once connected',
            timestamp: Date.now() / 1000
          }
        ]);
        toast({
          title: "Connection Error",
          description: "Unable to load Instagram content. Please check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, [toast]);

  const getCurrentInstagramPosts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return instagramPosts.slice(startIndex, startIndex + itemsPerPage);
  };

  const getCurrentStravaActivities = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return stravaActivities.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = () => {
    const items = activeTab === 'instagram' ? instagramPosts : stravaActivities;
    return Math.ceil(items.length / itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: 'instagram' | 'strava') => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when switching tabs
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-red-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Media <span className="text-yellow-400">Feed</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Follow the daily journey through Instagram posts and Strava activities
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => handleTabChange('instagram')}
              variant={activeTab === 'instagram' ? 'default' : 'outline'}
              className={`px-8 py-3 font-semibold ${
                activeTab === 'instagram' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              📱 Instagram Posts
            </Button>
            <Button
              onClick={() => handleTabChange('strava')}
              variant={activeTab === 'strava' ? 'default' : 'outline'}
              className={`px-8 py-3 font-semibold ${
                activeTab === 'strava' 
                  ? 'bg-orange-600 text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              🏃 Strava Activities
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'instagram' ? (
            <>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <Skeleton className="aspect-square w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCurrentInstagramPosts().map((post, index) => (
                    <Card key={post.shortcode} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="aspect-square relative">
                          {post.is_video ? (
                            <iframe
                              src={`https://www.instagram.com/p/${post.shortcode}/embed`}
                              className="w-full h-full border-0"
                              allowFullScreen
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full">
                              <img
                                src={post.display_url}
                                alt={post.caption || 'Instagram post'}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  // Fallback to embed if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const iframe = document.createElement('iframe');
                                  iframe.src = `https://www.instagram.com/p/${post.shortcode}/embed`;
                                  iframe.className = 'w-full h-full border-0';
                                  iframe.allowFullscreen = true;
                                  target.parentElement?.appendChild(iframe);
                                }}
                              />
                            </div>
                          )}
                          {post.is_video && (
                            <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2">
                              <span className="text-white text-sm">▶️</span>
                            </div>
                          )}
                        </div>
                        {post.caption && (
                          <div className="p-3">
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {post.caption}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getCurrentStravaActivities().map((activityId, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gray-100 aspect-video flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">🏃</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Strava Activity Embed</p>
                        <p className="text-xs text-gray-400">
                          To embed actual activities, replace the sample activity IDs with real Strava activity IDs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {getTotalPages() > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < getTotalPages() && (
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      {/* Updated Instructions Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">Instagram Integration Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-green-700 mb-4">✅ Backend Setup Complete</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                The Supabase edge function is ready to fetch Instagram content automatically.
              </p>
              <p className="text-xs text-gray-500">
                Instagram posts will be fetched and displayed once the function is deployed.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">🚀 Next Step</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Deploy the edge function to Supabase to enable automatic Instagram content fetching.
              </p>
              <p className="text-xs text-gray-500">
                No API keys required - the function handles everything automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Follow the <span className="text-yellow-400">Journey</span>
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Stay updated with daily training and faith-based motivation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.instagram.com/run_punch_man/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Follow on Instagram
            </a>
            <a 
              href="https://www.strava.com/athletes/83782562" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Follow on Strava
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Media;
