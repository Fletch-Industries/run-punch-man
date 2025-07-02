import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="min-h-screen bg-white">
      <Navigation />
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-red-900 min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-20 bg-gray-600"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <img src="/lovable-uploads/636C1957-DCC2-40EE-9232-49D8B08B663E.png" alt="RunPunchMan Logo - Train Daily. Live Boldly." className="w-full h-full drop-shadow-2xl object-cover" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-200 text-center mb-4">
              Day <span className="text-yellow-300">{Math.ceil((new Date().getTime() - new Date("2023-07-31").getTime()) / (1000 * 60 * 60 * 24))}</span>
            </h1>
            <p className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8  text-yellow-300">
              EVERY. SINGLE. DAY.
            </p>
            <div className="space-y-4 sm:space-y-6">
              <a href="https://www.strava.com/clubs/run-punch-club" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 hover:bg-yellow-300 text-navy-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 tracking-wide block">
                JOIN THE CLUB
              </a>
            </div>
            <div className="flex justify-center space-x-6">
              <a href="https://www.instagram.com/run_punch_man/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/runpunchmanofficial/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.strava.com/athletes/runpunchman" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.172"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4 sm:mb-6 px-4">
              What's Your <span className="text-red-600">R.E.D.</span>?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-red-600 font-bold mb-6 sm:mb-8">
              Reason. Excuse. Difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 md:mx-0">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">👊</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">Reason to Run</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Find your purpose that drives you forward, no matter what.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 md:mx-0">
              <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-black">🚫</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">Excuse to Ignore</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Identify the excuses trying to stop you, then crush them completely.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 md:mx-0">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-black">💥</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">Difference Today</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Celebrate what made today's effort unique and unstoppable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link to="/red" className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 tracking-wide">
                GET DAILY R.E.D.
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-red-600 to-navy-900">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Become Too Strong.
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 sm:mb-12 leading-relaxed">
            Run. Reps. Repeat.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🏃</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Run a 5K+</h3>
              <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                Run at least a 5K every single day, no matter what.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-black">🥊</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Do 100 Reps</h3>
              <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                100 Sit-ups. 100 Push-ups. 100 squats. Get em' in.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-black">⚡</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Don't miss a Day.</h3>
              <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                Discover the strength that comes from relentless consistency.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link to="/training" className="bg-white hover:bg-gray-100 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 tracking-wide">
              BREAK YOUR LIMITS
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>;
};
export default Index;