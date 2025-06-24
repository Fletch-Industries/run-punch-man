import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-red-900 min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-20 bg-gray-600"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 sm:space-y-6">
            {/* RunPunchMan Logo */}
            <div className="mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <img src="/lovable-uploads/2e4f3183-fdab-4d6f-b2de-addccfada90d.png" alt="RunPunchMan Logo - Train Daily. Live Boldly." className="w-full h-full drop-shadow-2xl object-cover" />
            </div>
            
            {/* Main Headline - kept empty as in original */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-200 text-center mb-4">
              Day <span className="text-red-600 font-semibold">{Math.ceil((new Date().getTime() - new Date("2023-07-31").getTime()) / (1000 * 60 * 60 * 24))}</span>
            </h1>
            
            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
              Just a guy who's a <span className="text-yellow-400 font-semibold">Runner</span> for fun!
            </p>
            
            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/about" className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-superhero font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg tracking-wide">
                DISCOVER MY STORY
              </Link>
              <Link to="/journal" className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-superhero font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 tracking-wide">
                READ DAILY JOURNAL
              </Link>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a href="https://www.instagram.com/run_punch_man/" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-superhero font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg tracking-wide">
                What's your R.E.D?
              </a>
              <a href="https://www.strava.com/clubs/1597734" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-superhero font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 tracking-wide">
                Join the Club!
              </a>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        
        
        
      </section>

      {/* Mission Statement Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4 sm:mb-6 px-4">
              The <span className="text-red-600">RunPunchMan</span> Mission
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 sm:mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Faith */}
            <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 md:mx-0">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">✝️</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">Faith-Centered</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Every step, every rep, every day begins and ends with Jesus. 
                Our strength comes from Him who strengthens us.
              </p>
            </div>
            
            {/* Fitness */}
            <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 md:mx-0">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-navy-900">💪</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">Physical Excellence</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Our bodies are temples. We honor God through discipline, 
                consistency, and pushing beyond our limits.
              </p>
            </div>
            
            {/* Discipline */}
            <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 md:mx-0">
              <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">Daily Discipline</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Small, consistent actions compound into extraordinary results. 
                Every day is a choice to become better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-red-600 to-navy-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Join me in discovering what it means to train daily and live boldly through Christ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/scripture" className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-superhero font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 tracking-wide">
              DAILY SCRIPTURE
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-superhero font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 tracking-wide">
              GET WEEKLY INSPIRATION
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;