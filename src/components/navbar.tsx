"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Flavors", href: "#our-flavors" },
  { name: "Reviews", href: "#reviews" },
  { name: "Locations", href: "#locations" },
  { name: "Contact", href: "#contact" },
];

const ORDER_LINK = "https://www.foodpanda.pk/restaurant/la4c/churn-station-f7";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (!newTheme) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-black/10 backdrop-blur-sm flex items-center px-6 md:px-12">
      <div className="flex-1">
        <Link href="/" className="font-headline text-xl md:text-2xl tracking-tighter text-white font-bold">
          CHURN STATION
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-8 mr-12">
        {NAV_LINKS.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/80 hover:text-white transition-all cursor-pointer"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full text-white hover:bg-white/10"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <Button 
          asChild
          variant="outline" 
          className="hidden md:flex rounded-full h-10 px-6 font-bold tracking-widest text-[10px] uppercase border-white/30 text-white hover:bg-white hover:text-black"
        >
          <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
            Order Online
          </a>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <div className={cn(
        "fixed inset-0 top-20 bg-black/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {NAV_LINKS.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="text-2xl font-headline uppercase tracking-widest text-white hover:text-primary"
          >
            {link.name}
          </a>
        ))}
        <Button 
          asChild
          className="rounded-full px-12 py-6 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs mt-4"
        >
          <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
            Order Now
          </a>
        </Button>
      </div>
    </nav>
  );
}
