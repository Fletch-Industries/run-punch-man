
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-red-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            My <span className="text-yellow-400">Story</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            How simple training became unbreakable strength. Every. Single. Day.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Personal Photo and Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-3xl font-bold text-navy-900 mb-6">My Story</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                My name is Run Punch Man, and I started running a 5K every single day, including the complete workout, 
                in mid-summer of 2023. What began as a simple challenge with the boys in my cabin during my time as a 
                youth counselor has transformed into something much deeper—an unbreakable daily habit that defines who I am.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Every single day, I document and share my R.E.D. (Reason to Run, Excuse to Ignore, Difference about Today) 
                across Strava, Instagram, Facebook, TikTok, and other platforms. What started as accountability has evolved 
                into inspiration for others to build their own unshakeable daily habits.
              </p>
              <p className="text-gray-700 leading-relaxed">
                My two-year-old rescued dog, Juniper, is my faithful running companion who joins me for every single 5K. 
                She's become a beloved figure throughout Sweet Home, Oregon, known for her enthusiasm and unwavering 
                commitment to our daily runs. Juniper never makes excuses and always shows up ready to go—she's taught 
                me as much about consistency as I've learned on my own.
              </p>
            </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/lovable-uploads/499614dd-ccfd-4c27-9e22-bcb60676177e.png" 
                  alt="Run Punch Man with his dog Juniper after a workout" 
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Join the Movement</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Follow along and build your own unbreakable daily habits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="https://www.instagram.com/run_punch_man/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 w-64 text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Follow on Instagram
                </a>
                <a href="https://www.facebook.com/runpunchmanofficial/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 w-64 text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Follow on Facebook
                </a>
                <a href="https://www.tiktok.com/@run.punch.man" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 w-64 text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  Follow on TikTok
                </a>
                <a href="https://www.strava.com/clubs/1597734" target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 w-64 text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.172"/></svg>
                  Join Strava Club
                </a>
              </div>
              
              <div className="bg-yellow-400 p-6 rounded-xl inline-block">
                <p className="text-navy-900 font-bold text-lg">
                  "If we don't do it today, we won't do it tomorrow"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
