"use client";

import { useState } from "react";
import { Instagram, Facebook, Mail, MapPin, Phone, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  const modalContent: Record<string, { title: string; content: React.ReactNode }> = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4 font-body text-white/80 leading-relaxed">
          <p>Your privacy is important to us. At Churn Station, we collect limited personal data to process your orders via Foodpanda and improve your browsing experience.</p>
          <p><strong>Data Collection:</strong> We do not directly store payment information on this site. Order information is handled securely through our partner Foodpanda.</p>
          <p><strong>Usage:</strong> We use cookies to understand site performance and to ensure the interactive elements function smoothly across devices.</p>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      content: (
        <div className="space-y-4 font-body text-white/80 leading-relaxed">
          <p>By using this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
          <p><strong>Website Content:</strong> All cinematic animations and brand imagery are the property of Churn Station.</p>
          <p><strong>Order Fulfillment:</strong> All orders are placed through Foodpanda. Churn Station is responsible for the quality of the ice cream, while Foodpanda handles the delivery logistics.</p>
        </div>
      ),
    },
    cookies: {
      title: "Cookie Policy",
      content: (
        <div className="space-y-4 font-body text-white/80 leading-relaxed">
          <p>We use essential cookies to ensure the website functions correctly. Analytical cookies help us understand how you interact with our content.</p>
          <p><strong>Essential:</strong> These cookies are required for the theme switcher and animation preloading to work.</p>
          <p><strong>Analytical:</strong> We use these to see which flavors are the most popular among our community.</p>
        </div>
      ),
    },
    sitemap: {
      title: "Sitemap",
      content: (
        <div className="grid grid-cols-2 gap-4 font-body text-white/80">
          <ul className="space-y-2">
            <li><a href="#our-flavors" onClick={(e) => { handleScroll(e, 'our-flavors'); setActiveModal(null); }} className="hover:text-primary transition-colors">Our Flavors</a></li>
            <li><a href="#reviews" onClick={(e) => { handleScroll(e, 'reviews'); setActiveModal(null); }} className="hover:text-primary transition-colors">Reviews</a></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="#locations" onClick={(e) => { handleScroll(e, 'locations'); setActiveModal(null); }} className="hover:text-primary transition-colors">Locations</a></li>
            <li><a href="#contact" onClick={(e) => { handleScroll(e, 'contact'); setActiveModal(null); }} className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      ),
    },
  };

  return (
    <footer id="contact" className="bg-black py-24 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-headline text-4xl text-white font-bold mb-8 tracking-tighter">CHURN STATION</h2>
            <p className="font-body text-lg text-white/70 max-w-md mb-10 leading-relaxed">
              Crafting premium Pakistani artisanal ice cream since 2020. Our mission is to elevate the dessert experience through uncompromising quality and late-night passion.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/churnstation/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-all duration-300 backdrop-blur-sm bg-white/5"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/p/Churn-Station-100086058763910/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-all duration-300 backdrop-blur-sm bg-white/5"><Facebook size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-10">Navigation</h4>
            <ul className="space-y-5 font-body text-white/60 text-base">
              <li><a href="#our-flavors" onClick={(e) => handleScroll(e, 'our-flavors')} className="hover:text-primary transition-colors cursor-pointer">The Churn Menu</a></li>
              <li><a href="#locations" onClick={(e) => handleScroll(e, 'locations')} className="hover:text-primary transition-colors cursor-pointer">Store Locator</a></li>
              <li><a href="#reviews" onClick={(e) => handleScroll(e, 'reviews')} className="hover:text-primary transition-colors cursor-pointer">Community Love</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-10">Get In Touch</h4>
            <ul className="space-y-6 font-body text-white/60 text-base">
              <li className="flex items-start gap-4">
                <Mail size={18} className="text-primary shrink-0 mt-1" />
                <span>hello@churnstation.com</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <span>Head Office: F-7 Markaz, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={18} className="text-primary shrink-0 mt-1" />
                <span>+92 51 111 222 333</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center py-12 border-t border-white/10 gap-8">
          <p className="text-[10px] font-body text-white/50 uppercase tracking-[0.2em] text-center md:text-left">
            © 2024 Churn Station. All rights reserved. <br className="md:hidden" /> Crafted with passion in Islamabad.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-primary transition-colors uppercase">Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-primary transition-colors uppercase">Terms of Service</button>
            <button onClick={() => setActiveModal('cookies')} className="hover:text-primary transition-colors uppercase">Cookie Policy</button>
            <button onClick={() => setActiveModal('sitemap')} className="hover:text-primary transition-colors uppercase">Sitemap</button>
          </div>
        </div>
      </div>

      <Dialog open={!!activeModal} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="bg-[#0A0A0A]/90 backdrop-blur-xl border-white/10 max-w-2xl">
          <DialogHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-4 mb-4">
            <DialogTitle className="font-headline text-2xl text-white">
              {activeModal && modalContent[activeModal].title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {activeModal && modalContent[activeModal].content}
          </div>
          <button 
            onClick={() => setActiveModal(null)}
            className="absolute right-4 top-4 rounded-full p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <X size={20} />
          </button>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
