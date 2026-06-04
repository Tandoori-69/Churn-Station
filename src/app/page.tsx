"use client";

import { useState } from "react";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Navbar } from "@/components/navbar";
import { ParallaxHero } from "@/components/parallax-hero";
import { FlavorsSection } from "@/components/sections/flavors";
import { ReviewsSection } from "@/components/sections/reviews";
import { LocationsSection } from "@/components/sections/locations";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

const ORDER_LINK = "https://www.foodpanda.pk/restaurant/la4c/churn-station-f7";

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleProgress = (progress: number) => {
    setLoadProgress(progress);
    if (progress >= 99.9) {
      setTimeout(() => setIsLoading(false), 800);
    }
  };

  return (
    <main className="relative min-h-screen bg-background">
      <LoadingOverlay progress={loadProgress} isVisible={isLoading} />
      
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <Navbar />
        
        <ParallaxHero onLoadingComplete={handleProgress} />

        <FlavorsSection />
        
        <ReviewsSection />
        
        <LocationsSection />

        <section className="py-40 bg-secondary/10 text-center px-6">
          <h2 className="font-headline text-6xl md:text-9xl text-foreground mb-12 tracking-tighter uppercase leading-none">
            TASTE THE <br/>ULTIMATE SILK
          </h2>
          <Button 
            asChild
            className="rounded-full bg-primary text-primary-foreground px-16 py-10 text-xl font-bold hover:scale-110 active:scale-95 duration-300"
          >
            <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
              ORDER NOW
            </a>
          </Button>
        </section>

        <Footer />
      </div>
    </main>
  );
}
