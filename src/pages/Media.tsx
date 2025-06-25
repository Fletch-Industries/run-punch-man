
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Media = () => {
  const [activeTab, setActiveTab] = useState<'instagram' | 'strava'>('instagram');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample Instagram post URLs - replace these with actual post URLs from your account
  const instagramPosts = [
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentItems().map((postUrl, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gray-100 aspect-square flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">📱</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Instagram Post Embed</p>
                        <p className="text-xs text-gray-400">
                          To embed actual posts, replace the sample URLs in the code with real Instagram post URLs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
          <h2 className="text-3xl font-bold text-navy-900 mb-6">How to Add Real Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">Instagram Posts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Replace the sample URLs in the code with actual Instagram post URLs from your account. 
                You can get embed codes from Instagram or use the post URLs directly with oEmbed.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">Strava Activities</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Replace the sample activity IDs with real Strava activity IDs from your profile. 
                Strava provides embed options for individual activities.
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
