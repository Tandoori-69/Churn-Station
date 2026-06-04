"use client";

import { useEffect, useRef, useState } from "react";
import { fetchImageSequence } from "@/lib/cloudinary";
import { Loader2 } from "lucide-react";

interface AnimatedFlavorCardProps {
  tag: string;
  title: string;
  description: string;
  className?: string;
}

const ORDER_LINK = "https://www.foodpanda.pk/restaurant/la4c/churn-station-f7";

export function AnimatedFlavorCard({ tag, title, description, className }: AnimatedFlavorCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const renderFrame = (index: number) => {
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
    const preload = async () => {
      setIsLoading(true);
      const urls = await fetchImageSequence(tag);
      if (urls.length === 0) {
        setIsLoading(false);
        return;
      }

      const promises = urls.map((url, i) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            imagesRef.current[i] = img;
            resolve(true);
          };
          img.onerror = () => {
            console.warn(`Failed to load image at ${url}`);
            resolve(false);
          };
        });
      });

      await Promise.all(promises);
      setIsReady(true);
      setIsLoading(false);
      renderFrame(0);
    };

    preload();
  }, [tag]);

  useEffect(() => {
    if (!isReady || imagesRef.current.length === 0) return;

    let intervalId: NodeJS.Timeout | null = null;

    if (isHovered) {
      intervalId = setInterval(() => {
        setCurrentFrame((prev) => {
          const next = (prev + 1) % imagesRef.current.length;
          renderFrame(next);
          return next;
        });
      }, 40);
    } else {
      setCurrentFrame(0);
      renderFrame(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isReady, isHovered]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.offsetWidth * 2; 
        canvasRef.current.height = containerRef.current.offsetHeight * 2;
        renderFrame(currentFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isReady, currentFrame]);

  return (
    <a 
      ref={containerRef}
      href={ORDER_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0A0A0A] shadow-2xl hover:border-primary/40 transition-all duration-700 min-h-[500px] flex flex-col justify-end p-12 cursor-pointer block ${className}`}
    >
      <div className="absolute inset-0 z-0">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        )}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10">
        <h4 className="font-headline text-5xl text-white mb-4 group-hover:text-primary transition-colors duration-500">
          {title}
        </h4>
        <p className="font-body text-white/70 text-lg leading-relaxed max-w-md group-hover:text-white transition-colors duration-500">
          {description}
        </p>
        <div className="mt-8 w-0 h-1 bg-primary group-hover:w-24 transition-all duration-700 ease-out" />
      </div>
    </a>
  );
}
