import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Training = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    goals: ""
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        preferredDate: dateString
      }));
      // Check availability for the selected date
      checkAvailability(dateString);
    } else {
      setFormData(prev => ({
        ...prev,
        preferredDate: ""
      }));
      setBookedTimes([]);
    }
  };

  const checkAvailability = async (date: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('check-booking-availability', {
        body: { date }
      });

      if (error) throw error;
      
      setBookedTimes(data.bookedTimes || []);
    } catch (error) {
      console.error('Error checking availability:', error);
      setBookedTimes([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke('training-booking', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Training Session Confirmed!",
        description: "Check your email for the Google Meet link and session details.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        goals: ""
      });
      setSelectedDate(undefined);
      setBookedTimes([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
    "6:00 PM", "7:00 PM", "8:00 PM"
  ];

  const isTimeSlotAvailable = (time: string) => {
    // If time is already booked, it's not available
    if (bookedTimes.includes(time)) {
      return false;
    }

    // If selected date is today, check if time has passed
    if (selectedDate) {
      const today = new Date();
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      const todayString = today.toISOString().split('T')[0];
      
      if (selectedDateString === todayString) {
        const currentHour = today.getHours();
        const timeHour = parseInt(time.split(':')[0]);
        const isPM = time.includes('PM');
        const hour24 = isPM && timeHour !== 12 ? timeHour + 12 : (!isPM && timeHour === 12 ? 0 : timeHour);
        
        return hour24 > currentHour;
      }
    }
    
    return true;
  };

  return (
    <div id="top" className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-red-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Train with <span className="text-yellow-400">Run Punch Man</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed mb-4">
            Break your limits. Become too strong. 
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-red-600 to-navy-900 rounded-xl shadow-lg p-8 text-white mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-navy-900 text-2xl">📅</span>
                </div>
                <h3 className="font-bold mb-2">707+ Day Streak</h3>
                <p className="text-gray-200 text-sm">Learn from someone who hasn't missed a single day since summer 2023</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-navy-900 text-2xl">🧠</span>
                </div>
                <h3 className="font-bold mb-2">Mental Toughness</h3>
                <p className="text-gray-200 text-sm">Master the psychology of never breaking a commitment to yourself</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💪</span>
                </div>
                <h3 className="font-bold mb-2">Unbreakable Habits</h3>
                <p className="text-gray-200 text-sm">Build systems that work no matter what life throws at you</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-yellow-400 font-bold mb-2">Virtual Sessions • Immediate Booking Available</p>
              <p className="text-sm text-gray-200">Personal training from someone who learned commitment the hard way</p>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-6 text-center">Choose Your Training Day</h2>
            <div className="flex justify-center mb-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                className="rounded-md border border-gray-300 p-3"
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Complete Your Booking</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>


                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Time (PST)
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map(time => {
                      const isAvailable = isTimeSlotAvailable(time);
                      const isBooked = bookedTimes.includes(time);
                      const isPastTime = !isAvailable && !isBooked;
                      
                      return (
                        <option 
                          key={time} 
                          value={time}
                          disabled={!isAvailable}
                        >
                          {time} {isBooked ? '(Booked)' : isPastTime ? '(Past)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-semibold text-gray-700 mb-2">
                    Fitness Goals & Questions
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                    placeholder="Tell me about your fitness goals, current activity level, and any questions you have..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? 'Sending Request...' : 'Train Without Limits'}
                </button>
              </form>
            </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Training;