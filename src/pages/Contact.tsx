
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.functions.invoke('newsletter-signup', {
        body: { email }
      });

      if (error) throw error;

      alert("Successfully subscribed! You'll receive daily R.E.D. at noon PST.");
      setEmail("");
    } catch (error: any) {
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-navy-900 to-red-900 rounded-xl shadow-lg p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">Daily R.E.D. Delivery</h3>
      <p className="text-gray-200 mb-6 leading-relaxed">
        Get my daily R.E.D. delivered to your inbox at noon PST. Join the journey of accountability and growth!
      </p>
      <form onSubmit={handleNewsletterSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 text-navy-900 py-3 rounded-lg font-bold transition-colors"
        >
          {loading ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </form>
      <p className="text-sm text-gray-300 mt-4">
        Join the R.E.D. community. Unsubscribe anytime.
      </p>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Submitting contact form with data:', formData);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      console.log('Invoking send-contact-email function...');
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Supabase error: ${error.message}`);
      }

      console.log('Email sent successfully');
      alert("Message sent successfully! I'll get back to you within 24-48 hours.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      alert(`Failed to send message: ${errorMessage}. Please try again or email me directly at josephmeeko@gmail.com`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-red-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Send a <span className="text-yellow-400">Message</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Talk is boring... but I'm bored anyway, so let's chat!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-6 text-center">What's on your mind?</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
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
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Question</option>
                    <option value="fitness">Fitness Advice</option>
                    <option value="faith">Faith & Spirituality</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                    placeholder="Share your thoughts, questions, or how the RunPunchMan journey has impacted you..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
