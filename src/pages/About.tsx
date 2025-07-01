
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
            How faith and fitness collided to create something powerful
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
                <h2 className="text-3xl font-bold text-navy-900 mb-6">Meet Run Punch Man</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  My name is Run Punch Man and I run a 5k every day with my dog Juniper. I also do 100 situps, 
                  pushups, and squats every single day. Every day I post my R.E.D. to inspire myself and others 
                  to keep at their good habits - and never take a day off.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  What started as a simple commitment to daily discipline has evolved into something much bigger. 
                  It's about showing up consistently, acknowledging the excuses that try to derail us, and finding 
                  something unique to celebrate about each day's effort.
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
            
            <div className="bg-gradient-to-r from-red-600 to-navy-900 p-8 rounded-xl text-white mb-12">
              <h2 className="text-3xl font-bold mb-6">The Daily Commitment</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏃‍♂️</div>
                  <h3 className="font-bold text-yellow-400">5K Every Day</h3>
                  <p className="text-sm text-gray-200">Rain or shine, with Juniper by my side</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">💪</div>
                  <h3 className="font-bold text-yellow-400">100 Reps Daily</h3>
                  <p className="text-sm text-gray-200">Situps, pushups, and squats - no exceptions</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <h3 className="font-bold text-yellow-400">Daily R.E.D.</h3>
                  <p className="text-sm text-gray-200">Sharing the journey to inspire consistency</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-600 mb-4">Why R.E.D.?</h3>
                <p className="text-gray-600 leading-relaxed">
                  R.E.D. stands for Reason, Excuse, and Difference. It's my daily accountability system. 
                  I share my reason for showing up, acknowledge the excuse I overcame, and highlight what 
                  made that day's effort special. It's about radical honesty and consistent action.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Juniper, My Running Partner</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every 5K is better with my faithful companion. Juniper doesn't make excuses, doesn't 
                  complain about the weather, and always shows up ready to run. She's taught me that 
                  consistency is simple when you stop overthinking it.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-navy-900 p-8 rounded-xl text-white mb-12">
              <h2 className="text-3xl font-bold mb-6">The Never Miss Philosophy</h2>
              <p className="text-lg leading-relaxed mb-6">
                "Never take a day off" isn't about perfection - it's about showing up. Some days my 5K 
                is fast and feels amazing. Other days it's slow and every step is a battle. But the 
                commitment remains the same: show up, do the work, and share the truth about what it took.
              </p>
              <p className="text-lg leading-relaxed">
                This philosophy extends beyond fitness. It's about building character through daily 
                disciplines, being honest about our struggles, and inspiring others through authentic 
                vulnerability rather than highlight reels.
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Join the Movement</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                My mission is to inspire others to commit to their own version of "never miss a day." 
                Whether it's running, writing, praying, or any positive habit - the power is in the consistency. 
                Follow along for daily R.E.D. posts and see what happens when you stop making excuses and 
                start making progress.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="https://www.instagram.com/run_punch_man/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
                  Follow on Instagram
                </a>
                <a href="https://www.strava.com/clubs/1597734" target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
                  Join Strava Club
                </a>
              </div>
              
              <div className="bg-yellow-400 p-6 rounded-xl inline-block">
                <p className="text-navy-900 font-bold text-lg">
                  "Success isn't about being perfect. It's about being consistent."
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
