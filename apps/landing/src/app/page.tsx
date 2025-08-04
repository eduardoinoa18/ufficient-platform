import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import ReferralBlock from "@/components/ReferralBlock";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import UfficientLogo from "@/components/UfficientLogo";

export default function Home() {
  return (
    <main className="bg-white text-slate-800">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UfficientLogo size={32} />
              <span className="text-2xl font-bold font-montserrat bg-gradient-to-r from-[#4CD7F8] to-[#00D27F] bg-clip-text text-transparent">
                UFFICIENT
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-white/90 hover:text-white transition-colors font-inter">Features</a>
              <a href="#testimonials" className="text-white/90 hover:text-white transition-colors font-inter">Reviews</a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors font-inter">Contact</a>
              <button className="bg-white text-[#6C00FF] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features">
        <FeatureGrid />
      </section>

      {/* Referral Block */}
      <ReferralBlock />

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialCarousel />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactForm />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
