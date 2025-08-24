'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

// Types
interface AnimatedSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  delay?: number;
}   

interface NavigationProps {
  scrollY: number;
}

interface HeroSectionProps {
  scrollY: number;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

interface StatsCounterProps {
  number: string;
  label: string;
  delay?: number;
}

// Custom Hook for Scroll Animations
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { scrollY, isVisible };
};

// Animated Section Component
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, id, className = "", delay = 0 }) => {
  const { isVisible } = useScrollAnimation();
  const visible = isVisible[id];
  
  return (
    <div
      id={id}
      data-animate
      className={`transition-all duration-1000 ease-out ${
        visible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation: React.FC<NavigationProps> = ({ scrollY }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
      scrollY > 100 ? 'bg-white/95 backdrop-blur-lg border-b border-yellow-200 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
            <i className="fas fa-users text-white text-lg"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">City Pulse</h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 font-medium">Features</a>  
          <a href="#community" className="text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 font-medium">Community</a>
          <a href="#about" className="text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 font-medium">About</a>
          <Link href="/Login" className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-800 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium">
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Community People Illustration Component
const CommunityIllustration = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Background Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-200">
        {/* People Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Row 1 */}
          <div className="col-span-1 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-user text-yellow-600"></i>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-user text-orange-600"></i>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <i className="fas fa-user-graduate text-yellow-600"></i>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <i className="fas fa-user-tie text-amber-600"></i>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <i className="fas fa-user-nurse text-orange-600"></i>
            </div>
          </div>

          {/* Row 3 */}
          <div className="col-span-1">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-user-friends text-yellow-600"></i>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-child text-amber-600"></i>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-user-check text-yellow-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#FCD34D', stopOpacity:0.3}} />
                <stop offset="100%" style={{stopColor:'#F59E0B', stopOpacity:0.3}} />
              </linearGradient>
            </defs>
            <path d="M20,30 Q50,20 80,30" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" className="animate-pulse"/>
            <path d="M30,60 Q50,50 70,60" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
            <path d="M25,80 Q50,70 75,80" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '2s'}}/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/2 -left-6 w-4 h-4 bg-amber-400 rounded-full animate-pulse shadow-lg"></div>
    </div>
  );
};

// Hero Section Component
const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <AnimatedSection id="hero-content" className="text-left">
              <h2 
                className="text-6xl md:text-7xl font-bold mb-8 text-gray-800 leading-tight"
                style={{ transform: `translateY(${scrollY * -0.1}px)` }}
              >
                Connect,
                <br />
                <span className="text-gray-700">Share and</span>
                <br />
                <span className="text-gray-600">Engage</span>
              </h2>
              
              <p 
                className="text-xl text-gray-700 mb-8 max-w-lg leading-relaxed font-medium"
                style={{ transform: `translateY(${scrollY * -0.05}px)` }}
              >
                Join a local group to meet people, try something new, or do more of what you love.
              </p>

              <Link href="/Login" className="group inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                START NOW 
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
              </Link>
            </AnimatedSection>

            {/* Right Illustration */}
            <AnimatedSection id="hero-illustration" delay={300} className="flex justify-center lg:justify-end">
              <div className="group" style={{ transform: `translateY(${scrollY * -0.2}px)` }}>
                <CommunityIllustration />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => (
  <AnimatedSection id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`} delay={delay}>
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-200 hover:border-yellow-300 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6 shadow-lg">
        <i className={`${icon} text-white text-2xl`}></i>
      </div>
      <h4 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">{title}</h4>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">{description}</p>
      
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/5 group-hover:via-yellow-400/5 group-hover:to-orange-400/5 rounded-2xl transition-all duration-500"></div>
    </div>
  </AnimatedSection>
);

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: "fas fa-exclamation-triangle",
      title: "Report Issues",
      description: "Quickly report civic issues like water, electricity, or road problems. Track progress and see real solutions in your neighborhood."
    },
    {
      icon: "fas fa-bullhorn",
      title: "Community Campaigns",
      description: "Start or join local campaigns for positive change. Make your voice heard on issues that matter to your community."
    },
    {
      icon: "fas fa-heart",
      title: "Donate Food",
      description: "Share surplus food with neighbors in need. Build a stronger, more caring community through food donations and mutual support."
    }
  ];

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection id="features-header" className="text-center mb-20">
          <h3 className="text-5xl font-bold mb-6 text-gray-800">Everything You Need</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Essential tools to connect with your community, solve local problems, and make a positive impact in your neighborhood.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Component
const StatsCounter: React.FC<StatsCounterProps> = ({ number, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const { isVisible } = useScrollAnimation();
  const targetNumber = parseInt(number.replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    if (isVisible['stats-section']) {
      const timer = setTimeout(() => {
        const increment = targetNumber / 50;
        const counter = setInterval(() => {
          setCount(prev => {
            if (prev >= targetNumber) {
              clearInterval(counter);
              return targetNumber;
            }
            return Math.min(prev + increment, targetNumber);
          });
        }, 30);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible['stats-section'], targetNumber, delay]);

  return (
    <div className="text-center group">
      <div className="text-5xl font-bold text-gray-800 mb-2 group-hover:scale-110 transition-transform duration-300">
        {Math.floor(count)}{number.includes('K') ? 'K' : ''}{number.includes('+') ? '+' : ''}
      </div>
      <p className="text-gray-600 text-lg font-medium group-hover:text-gray-800 transition-colors duration-300">{label}</p>
    </div>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "25K+", label: "Active Members" },
    { number: "500+", label: "Issues Resolved" },
    { number: "1K+", label: "Events Organized" },
    { number: "50+", label: "Neighborhoods" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-400">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection id="stats-section" className="grid md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <StatsCounter key={index} {...stat} delay={index * 200} />
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section id="community" className="py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection id="cta-content">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 border border-yellow-200 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            <h3 className="text-5xl font-bold mb-8 text-gray-800 group-hover:scale-105 transition-transform duration-300">
              Ready to Connect?
            </h3>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join thousands of neighbors who are already building stronger, more connected communities. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group/btn bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-800 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <i className="fas fa-users mr-3 group-hover/btn:animate-bounce"></i>
                Join Community
              </button>
              <button className="group/btn border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <i className="fas fa-info-circle mr-3 group-hover/btn:rotate-12 transition-transform duration-300"></i>
                Learn More
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection id="footer-content">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                  <i className="fas fa-users text-gray-800"></i>
                </div>
                <h4 className="text-2xl font-bold">CityCommunity</h4>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Building stronger neighborhoods through connection, collaboration, and community engagement. Join us in making a difference.
              </p>
              <div className="flex space-x-4">
                {['fab fa-facebook', 'fab fa-twitter', 'fab fa-instagram', 'fab fa-linkedin'].map((icon, index) => (
                  <a key={index} href="#" className="w-10 h-10 bg-gray-700 hover:bg-yellow-400 text-white hover:text-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <i className={icon}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-lg">Quick Links</h5>
              <ul className="space-y-3 text-gray-300">
                {["How it Works", "Community Guidelines", "Success Stories", "Help Center"].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-lg">Support</h5>
              <ul className="space-y-3 text-gray-300">
                {["Contact Us", "Privacy Policy", "Terms of Service", "Safety"].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CityCommunity. All rights reserved. Connecting communities, one neighbor at a time.</p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const { scrollY } = useScrollAnimation();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      <HeroSection scrollY={scrollY} />
      <FeaturesSection />
      <CTASection />
      <Footer />
      
      <style jsx>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
      `}</style>
    </div>
  );
};

export default LandingPage;