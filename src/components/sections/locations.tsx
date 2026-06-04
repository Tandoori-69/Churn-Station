"use client";

import { MapPin, Clock, Phone, ExternalLink, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BRANCHES = [
  { 
    city: "Islamabad", 
    locations: [
      { name: "F-7 Markaz", address: "Ghol Market, F-7 Markaz", status: "Open", link: "https://www.foodpanda.pk/restaurant/la4c/churn-station-f7" },
      { name: "F-10", address: "Commercial Area, F-10 Markaz", status: "Open", link: "https://www.foodpanda.pk/restaurant/e3p0/churn-station-f10" },
      { name: "I-8 Markaz", address: "Executive Center, I-8", status: "Open", link: "https://www.foodpanda.pk/restaurant/jvu4/churn-station-i-8" }
    ],
    phone: "+92 51 111 222" 
  },
  { 
    city: "Rawalpindi", 
    locations: [
      { name: "Commercial", address: "Commercial Area, PWD/Saddar", status: "Open", link: "https://www.foodpanda.pk/restaurant/lmpo/churn-station-commercial" },
      { name: "Scheme 3", address: "Spring North, Phase 7 / Scheme 3", status: "Open", link: "https://www.foodpanda.pk/restaurant/fpyu/churn-station-scheme-3" }
    ],
    phone: "+92 51 333 444" 
  },
  { 
    city: "Lahore", 
    locations: [
      { name: "Iqbal Town", address: "Main Boulevard, Iqbal Town", status: "Open", link: "https://www.foodpanda.pk/restaurant/wm37/churn-station-iqbal-town" }
    ],
    phone: "+92 42 555 666" 
  },
];

export function LocationsSection() {
  return (
    <section id="locations" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Visit Us</span>
          <h2 className="font-headline text-5xl md:text-7xl text-white mb-8 font-black uppercase tracking-tighter">Find Your Station</h2>
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-primary/10 border border-primary/20 rounded-full">
            <div className="flex items-center gap-2 text-primary">
              <Clock size={18} />
              <span className="font-bold uppercase tracking-widest text-xs">Late Night Churn: 12pm - 3am</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {BRANCHES.map((branch) => (
            <div key={branch.city} className="p-10 rounded-[3rem] border border-white/10 bg-[#0A0A0A] backdrop-blur-sm hover:bg-[#111] hover:border-primary/50 transition-all group shadow-2xl flex flex-col h-full">
              <div className="w-14 h-14 rounded-3xl bg-primary/20 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <MapPin size={28} />
              </div>
              <h3 className="font-headline text-4xl text-white font-bold mb-8">{branch.city}</h3>
              <div className="space-y-6 flex-1 mb-10">
                {branch.locations.map((loc) => (
                  <div key={loc.name} className="group/loc">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold font-body">{loc.name}</span>
                      <Badge variant={loc.status === "Open" ? "secondary" : "outline"} className={cn(
                        "text-[9px] uppercase font-bold tracking-widest",
                        loc.status === "Open" ? "bg-primary/20 text-primary border-transparent" : "text-white/40"
                      )}>
                        {loc.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/60 font-body leading-relaxed mb-4">{loc.address}</p>
                    <Button 
                      asChild
                      className="w-full rounded-xl bg-primary text-white hover:scale-105 transition-all font-bold tracking-widest text-[9px] uppercase h-9 gap-2 shadow-lg"
                    >
                      <a href={loc.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <ShoppingBag size={14} /> Order From {loc.name}
                      </a>
                    </Button>
                    <div className="h-px w-full bg-white/10 mt-6 group-last/loc:hidden" />
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-primary">
                  <Phone size={16} />
                  <span className="font-bold text-sm tracking-wider">{branch.phone}</span>
                </div>
                <Button variant="link" className="p-0 h-auto text-white/60 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  Get Directions <ExternalLink size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
