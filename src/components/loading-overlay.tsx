"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface LoadingOverlayProps {
  progress: number;
  isVisible: boolean;
}

export function LoadingOverlay({ progress, isVisible }: LoadingOverlayProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="w-full max-w-md px-8 text-center">
        <h1 className="font-headline text-4xl mb-8 text-foreground tracking-wider uppercase font-black">
          Churn Station
        </h1>
        <div className="space-y-4">
          <Progress value={progress} className="h-1 bg-muted" />
          <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">
            Loading {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
