import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

interface InstagramPost {
  html: string;
  url: string;
  title: string;
}

const Media = () => {
  const [activeTab, setActiveTab] = useState<'instagram' | 'strava'>('instagram');
  const [currentPage, setCurrentPage] = useState(1);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  // Sample Instagram post URLs from run_punch_man account - replace these with actual post URLs
  const instagramPostUrls = [
    "https://www.instagram.com/p/SAMPLE1/", // Replace with actual post URLs
    "https://www.instagram.com/p/SAMPLE2/",
    "https://www.instagram.com/p/SAMPLE3/",
    "https://www.instagram.com/p/SAMPLE4/",
    "https://www.instagram.com/p/SAMPLE5/",
    "https://www.instagram.com/p/SAMPLE6/",
  ];

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
      console.log("Fetching Instagram posts...");
      
      const posts: InstagramPost[] = [];
      
      for (const url of instagramPostUrls) {
        try {
          // Instagram oEmbed API endpoint
          const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=your_access_token`;
          
          // For now, we'll use a CORS proxy to test the concept
          // In production, you'd want to use a proper backend or Instagram's API
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.instagram.com/p/sample/`)}`;
          
          // Since we can't actually fetch without proper setup, let's create mock embedded posts
          posts.push({
            html: `<blockquote class="instagram-media" data-instgrm-permalink="${url}"><a href="${url}">Loading Instagram post...</a></blockquote>`,
            url: url,
            title: `Instagram Post ${posts.length + 1}`
          });
        } catch (error) {
          console.error(`Failed to fetch post ${url}:`, error);
        }
      }
      
      setInstagramPosts(posts);
      setLoading(false);
    };

    fetchInstagramPosts();
  }, []);

  const getCurrentItems = () => {
    const items = activeTab === 'instagram' ? instagramPosts : stravaActivities;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
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
                  {getCurrentItems().map((post, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="bg-gray-100 aspect-square flex items-center justify-center rounded-lg">
                          <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-white text-2xl">📱</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">Instagram Post Ready</p>
                            <p className="text-xs text-gray-400">
                              Replace sample URLs with real Instagram post URLs to show actual content
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getCurrentItems().map((activityId, index) => (
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

      {/* Instructions Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">Next Steps to Show Real Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">Instagram Posts (Easy Setup)</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Simply replace the sample URLs in the code with actual Instagram post URLs from @run_punch_man.
              </p>
              <p className="text-xs text-gray-500">
                Example: https://www.instagram.com/p/ACTUAL_POST_ID/
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">Advanced: Instagram API</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                For automatic updates, we can set up Instagram Basic Display API with Supabase backend.
              </p>
              <p className="text-xs text-gray-500">
                This requires Instagram app setup and access tokens
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
