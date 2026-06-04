"use client";

import { AnimatedFlavorCard } from "@/components/animated-flavor-card";

const ALL_FLAVORS = [
  { 
    name: "Belgian Chocolate", 
    tag: "churn-belgian",
    description: "Deep, dark Belgian chocolate ice cream. Rich, smooth and unforgettable." 
  },
  { 
    name: "Nutella Swirl", 
    tag: "churn-nutella-swirl",
    description: "Creamy Nutella swirled into velvety smooth ice cream. Pure indulgence." 
  },
  { 
    name: "Blueberry Binge", 
    tag: "churn-blueberry",
    description: "Bursting with fresh blueberry flavor. Sweet, tangy and creamy." 
  },
  { 
    name: "Lotus Cheesecake", 
    tag: "churn-lotus",
    description: "Rich cheesecake ice cream with crunchy Lotus biscuit swirls." 
  },
  { 
    name: "Saffron Pistachio", 
    tag: "churn-pista",
    description: "Exotic saffron and roasted pistachio in every scoop." 
  },
  { 
    name: "Lychee Rose", 
    tag: "churn-rose",
    description: "Delicate lychee and rose flavors blended into a light creamy scoop." 
  },
  { 
    name: "Caramel Crunch", 
    tag: "churn-caramel",
    description: "Smooth caramel ice cream with a satisfying crunchy toffee swirl." 
  },
  { 
    name: "Vanilla Bean", 
    tag: "churn-wanila",
    description: "Classic, pure vanilla ice cream made with real vanilla beans." 
  },
];

export function FlavorsSection() {
  return (
    <section 
      id="our-flavors" 
      className="py-40 px-6 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block animate-pulse">
            The Churn Menu
          </span>
          <h2 className="font-headline text-6xl md:text-8xl text-white mb-8 tracking-tighter uppercase font-black">
            OUR FLAVORS
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-8" />
          <p className="font-body text-xl text-white/80 max-w-2xl mx-auto leading-relaxed italic">
            Hand-churned in small batches using only the finest ingredients. Experience the animation of every scoop.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ALL_FLAVORS.map((flavor) => (
            <AnimatedFlavorCard 
              key={flavor.name}
              tag={flavor.tag}
              title={flavor.name}
              description={flavor.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
