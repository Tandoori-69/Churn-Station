"use client";

import { Star, Quote } from "lucide-react";

const REVIEWS = [
  { name: "Zainab Khan", city: "Islamabad", text: "The Belgian Chocolate is hands down the best in the city. The texture is so dense and rich, it feels like actual silk on your palate.", rating: 5 },
  { name: "Ahmed Raza", city: "Lahore", text: "Finally, an ice cream shop that stays open till 3 AM in DHA! Perfect for those late-night cravings after a movie.", rating: 5 },
  { name: "Sania Malik", city: "Rawalpindi", text: "Truly premium quality. You can tell they use real ingredients. Churn Station is my go-to dessert spot now.", rating: 4 },
  { name: "Umar Farooq", city: "Islamabad", text: "Lotus Cheesecake is a revelation. The crunch combined with that smooth cheese base is perfection.", rating: 5 },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-32 bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-1 mb-8 text-primary">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              <span className="ml-4 text-white font-bold text-2xl">4.7 / 5.0</span>
            </div>
            <h2 className="font-headline text-5xl md:text-8xl text-white font-black uppercase tracking-tighter leading-none">Loved by the Churn <br/>Community.</h2>
          </div>
          <div className="text-left lg:text-right">
            <p className="font-body text-xl text-white/70 max-w-sm mb-6 leading-relaxed italic">"Verified testimonials from our loyal fans across Pakistan's major cities."</p>
            <p className="text-xs text-primary font-bold tracking-[0.2em] uppercase underline decoration-2 underline-offset-8 cursor-pointer hover:text-primary/80 transition-all">Read All 1,200+ Reviews</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REVIEWS.map((review, i) => (
            <div key={i} className="p-10 bg-[#0A0A0A] backdrop-blur-sm rounded-[2.5rem] border border-white/10 flex flex-col justify-between hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 shadow-xl relative overflow-hidden group">
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
              <p className="font-body text-xl text-white mb-12 italic leading-relaxed relative z-10">
                "{review.text}"
              </p>
              <div className="relative z-10">
                <p className="font-headline text-xl text-white font-bold">{review.name}</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">{review.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
