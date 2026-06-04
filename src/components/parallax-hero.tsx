"use client";

import { useEffect, useRef, useState } from "react";
import { fetchImageSequence } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";

const HERO_TAG = 'churn-belgian';
const ORDER_LINK = "https://www.foodpanda.pk/restaurant/la4c/churn-station-f7";

export function ParallaxHero({ onLoadingComplete }: { onLoadingComplete: (progress: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [scrollFraction, setScrollFraction] = useState(0);

  const render = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgAspect;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const preloadImages = async () => {
      const urls = await fetchImageSequence(HERO_TAG);
      const total = urls.length;
      setFrameCount(total);

      if (total === 0) {
        onLoadingComplete(100);
        return;
      }

      let loadedCount = 0;
      const promises = urls.map((url, i) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            loadedCount++;
            onLoadingComplete((loadedCount / total) * 100);
            imagesRef.current[i] = img;
            resolve(true);
          };
          img.onerror = () => {
            loadedCount++;
            onLoadingComplete((loadedCount / total) * 100);
            resolve(true);
          };
        });
      });

      await Promise.all(promises);
      setIsReady(true);
      setTimeout(() => render(0), 50);
    };

    preloadImages();
  }, [onLoadingComplete]);

  useEffect(() => {
    if (!isReady || frameCount === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollMax = window.innerHeight; 
      const fraction = Math.max(0, Math.min(scrollPosition / scrollMax, 0.99));
      
      setScrollFraction(fraction);
      const frameIndex = Math.floor(fraction * (frameCount - 1));
      requestAnimationFrame(() => render(frameIndex));
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const fraction = Math.max(0, Math.min(window.scrollY / window.innerHeight, 0.99));
        render(Math.floor(fraction * (frameCount - 1)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isReady, frameCount]);

  const scrollToFlavors = () => {
    document.getElementById('our-flavors')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getRevealStyle = (start: number, end: number) => {
    const p = Math.max(0, Math.min((scrollFraction - start) / (end - start), 1));
    return {
      opacity: p,
      transform: `translateY(${(1 - p) * 50}px)`,
    };
  };

  return (
    <div className="relative w-full h-[200vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-black via-black/40 to-transparent z-[5] pointer-events-none" />

        <canvas 
          ref={canvasRef} 
          className="relative z-1 w-full h-full opacity-80" 
        />
        
        <div className="absolute inset-0 z-10 flex items-center px-6 md:px-24">
          <div className="max-w-2xl">
            <h2 
              style={getRevealStyle(0.05, 0.25)}
              className="font-headline text-5xl md:text-6xl lg:text-7xl leading-none text-white font-black uppercase tracking-tighter drop-shadow-2xl transition-all duration-300 ease-out"
            >
              BELGIAN
            </h2>
            <p 
              style={getRevealStyle(0.15, 0.35)}
              className="font-body text-xl md:text-2xl font-light text-primary uppercase tracking-[0.3em] mb-6 drop-shadow-lg transition-all duration-300 ease-out"
            >
              CHOCOLATE
            </p>
            <p 
              style={getRevealStyle(0.25, 0.45)}
              className="font-body text-base md:text-lg text-white/90 max-w-sm mb-10 leading-relaxed drop-shadow-md transition-all duration-300 ease-out"
            >
              Deep, dark Belgian chocolate ice cream crafted for true chocolate lovers. Rich, smooth and unforgettable.
            </p>
            <div 
              style={getRevealStyle(0.35, 0.55)}
              className="flex flex-wrap gap-4 transition-all duration-300 ease-out"
            >
              <Button 
                asChild
                variant="outline" 
                className="rounded-full px-8 py-6 border-white text-white hover:bg-white hover:text-black transition-all font-bold tracking-widest text-xs uppercase"
              >
                <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
                  ORDER NOW
                </a>
              </Button>
              <Button 
                onClick={scrollToFlavors}
                className="rounded-full px-8 py-6 bg-primary text-white hover:bg-primary/90 transition-all font-bold tracking-widest text-xs uppercase"
              >
                EXPLORE MENU
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-6 md:left-24 flex gap-8 z-10">
          <a href="https://www.instagram.com/churnstation/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-primary transition-colors"><Instagram size={20} /></a>
          <a href="https://www.facebook.com/p/Churn-Station-100086058763910/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-primary transition-colors"><Facebook size={20} /></a>
        </div>

        <div className="absolute bottom-12 right-6 md:right-24 z-10 hidden md:block">
          <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/50 rotate-90 origin-right translate-y-full">
            SCROLL TO EXPLORE
          </p>
        </div>
      </div>
    </div>
  );
}
