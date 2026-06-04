"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const INGREDIENTS = [
  { name: "Single Origin Cocoa", source: "Ecuador / Belgium", description: "Ethically sourced high-cocoa butter chocolate for deep richness." },
  { name: "Raw Cane Sugar", source: "Local Pakistani Farms", description: "Unrefined sweetness for a complex, more natural flavor profile." },
  { name: "Grass-Fed Cream", source: "Punjab Highlands", description: "High-fat content for ultimate velvety texture and density." },
  { name: "Madagascan Vanilla", source: "Bourbon", description: "Pure pods infused over 48 hours for the most aromatic finish." },
];

export function IngredientsSection() {
  return (
    <section id="ingredients" className="py-32 bg-secondary/5 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-6 block">The Vault</span>
            <h2 className="font-headline text-5xl md:text-7xl text-foreground mb-8">Purity In Every <br/>Single Particle.</h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
              We believe great ice cream starts at the source. No artificial emulsifiers, no hydrogenated oils, just real food crafted with patience and precision.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {INGREDIENTS.map((item) => (
                <div key={item.name} className="p-6 border border-border bg-card rounded-2xl hover:border-primary/30 transition-all group shadow-sm">
                  <h4 className="font-headline text-xl text-foreground mb-2 group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-3">{item.source}</p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group order-1 lg:order-2">
            <img 
              src="https://picsum.photos/seed/cocoa-pure/800/1000" 
              alt="Ingredients" 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              data-ai-hint="dark chocolate cocoa beans"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <p className="font-headline text-3xl text-white italic">"Quality is the only ingredient we never compromise on."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}