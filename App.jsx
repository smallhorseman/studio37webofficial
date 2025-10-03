import React, { useState } from 'react';
import { Camera, Menu, X, Mail, Phone, MapPin } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simple form submission - just log for now
    console.log('Form submitted:', formData);
    
    // Reset form
    setTimeout(() => {
      alert('Thank you! We\'ll be in touch soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#181818] text-[#F3E3C3]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#181818]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8" />
              <span className="text-xl font-bold">Studio37</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-[#F3E3C3]/80 transition-colors">Home</a>
              <a href="#services" className="hover:text-[#F3E3C3]/80 transition-colors">Services</a>
              <a href="#contact" className="hover:text-[#F3E3C3]/80 transition-colors">Contact</a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <div className="flex flex-col space-y-2">
                <a href="#home" className="block px-4 py-2 hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#services" className="block px-4 py-2 hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#contact" className="block px-4 py-2 hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Vintage Heart, Modern Vision
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#F3E3C3]/80">
            Full-service photography and content strategy for brands ready to conquer the world from Houston, TX.
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-[#F3E3C3] text-[#181818] px-8 py-3 rounded-md font-semibold hover:bg-[#E6D5B8] transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Portraits', icon: '📸', desc: 'Professional headshots and personal branding' },
              { title: 'Weddings', icon: '💒', desc: 'Capture your special day with timeless elegance' },
              { title: 'Commercial', icon: '🏢', desc: 'Elevate your brand with stunning visuals' },
              { title: 'Content Strategy', icon: '📱', desc: 'Complete visual content solutions' }
            ].map((service, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-[#F3E3C3]/70">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[#262626]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Let's Create Together
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>sales@studio37.cc</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>(832) 713-9944</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Houston, TX</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-[#181818] border border-[#F3E3C3]/20 rounded-md focus:outline-none focus:border-[#F3E3C3]/50"
              />
              
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-[#181818] border border-[#F3E3C3]/20 rounded-md focus:outline-none focus:border-[#F3E3C3]/50"
              />
              
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 bg-[#181818] border border-[#F3E3C3]/20 rounded-md focus:outline-none focus:border-[#F3E3C3]/50"
              />
              
              <select
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full px-4 py-3 bg-[#181818] border border-[#F3E3C3]/20 rounded-md focus:outline-none focus:border-[#F3E3C3]/50"
              >
                <option value="">Select Service</option>
                <option value="portraits">Portrait Photography</option>
                <option value="weddings">Wedding Photography</option>
                <option value="commercial">Commercial Photography</option>
                <option value="content">Content Strategy</option>
              </select>
              
              <textarea
                placeholder="Tell us about your project..."
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-[#181818] border border-[#F3E3C3]/20 rounded-md focus:outline-none focus:border-[#F3E3C3]/50"
              />
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#F3E3C3] text-[#181818] py-3 rounded-md font-semibold hover:bg-[#E6D5B8] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-8 px-6 text-center">
        <p className="text-[#F3E3C3]/60">
          &copy; 2024 Studio37. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;