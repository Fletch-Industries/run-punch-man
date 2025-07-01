import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

interface RedEntry {
  date: string;
  day: string;
  reason: string;
  excuse: string;
  difference: string;
  quote: string;
}

const Red = () => {
  const [entries, setEntries] = useState<RedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoogleSheetData = async () => {
    try {
      setLoading(true);
      const sheetId = "1-Nr9UZYxJdHatigpzEOp8wOR_aCfi-AJui-xcm6lqAc";
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error('Failed to fetch sheet data');
      
      const csvText = await response.text();
      const rows = csvText.split('\n').slice(5); // Start from row 6 (index 5)
      
      const parsedEntries: RedEntry[] = rows
        .filter(row => row.trim() && !row.startsWith(',,,,,')) // Filter empty rows
        .map(row => {
          // Simple CSV parsing - handles basic cases
          const columns = row.split(',').map(col => col.replace(/"/g, '').trim());
          return {
            date: columns[0] || '',
            day: columns[1] || '',
            reason: columns[2] || '',
            excuse: columns[3] || '',
            difference: columns[4] || '',
            quote: columns[5] || ''
          };
        })
        .filter(entry => entry.date && entry.day && entry.reason && !isNaN(parseInt(entry.day))); // Only include rows with valid data
      
      // Sort by day number in descending order (most recent first)
      const sortedEntries = parsedEntries.sort((a, b) => parseInt(b.day) - parseInt(a.day));
      setEntries(sortedEntries);
      setError(null);
    } catch (err) {
      console.error('Error fetching sheet data:', err);
      setError('Failed to load R.E.D. data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleSheetData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 py-20">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Daily <span className="text-yellow-400">R.E.D.</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            <strong>R</strong>eason to run, <strong>E</strong>xcuse to ignore, <strong>D</strong>ifference about today
          </p>
          <p className="text-lg text-gray-200 mt-6 mb-8 max-w-2xl mx-auto">
            Every day I share the reason I decided to show up, acknowledge the excuse that almost took me out, and what made today stand out from the others.
          </p>
          
          {/* Newsletter Signup */}
          <div className="bg-white p-6 rounded-xl max-w-md mx-auto">
            <h3 className="text-xl font-bold text-navy-900 mb-4 text-center">Get the Daily R.E.D.</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors"
              >
                Subscribe Now 👊
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Get daily R.E.D. delivered to your inbox at noon PST
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-600">Loading R.E.D. entries...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg">{error}</p>
              <button 
                onClick={fetchGoogleSheetData}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {entries.map((entry, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-red-500">
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                            Day {entry.day}
                          </span>
                          <span className="text-xs text-gray-500">
                            {entry.date}
                          </span>
                        </div>
                      </div>

                      {entry.reason && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-green-700 mb-1 flex items-center">
                            🏃‍♂️ REASON TO RUN
                          </h4>
                          <p className="text-sm text-gray-700 leading-tight">{entry.reason}</p>
                        </div>
                      )}

                      {entry.excuse && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-orange-700 mb-1 flex items-center">
                            🚫 EXCUSE TO IGNORE
                          </h4>
                          <p className="text-sm text-gray-700 leading-tight">{entry.excuse}</p>
                        </div>
                      )}

                      {entry.difference && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-blue-700 mb-1 flex items-center">
                            ⚡ DIFFERENCE ABOUT TODAY
                          </h4>
                          <p className="text-sm text-gray-700 leading-tight">{entry.difference}</p>
                        </div>
                      )}

                      {entry.quote && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-gray-700 mb-1">
                            😐 SAITAMA SAYS
                          </h4>
                          <p className="text-sm text-gray-800 italic leading-tight">"{entry.quote}"</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Red;