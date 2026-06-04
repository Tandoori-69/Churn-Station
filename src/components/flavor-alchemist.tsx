"use client";

import { useState } from "react";
import { generateFlavorDescription, type GenerateFlavorDescriptionOutput } from "@/ai/flows/generate-flavor-description";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

export function FlavorAlchemist() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateFlavorDescriptionOutput | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const output = await generateFlavorDescription({
        flavorName: "Belgian Dark Silk",
        keyIngredients: ["70% Cocoa Belgian Chocolate", "Full-fat Organic Cream", "Sea Salt Swirl", "Caramelized Hazelnuts"],
        inspiration: "A rainy evening in a luxury chocolate shop in Brussels."
      });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
          <Sparkles size={16} />
          <span className="text-xs uppercase font-bold tracking-widest">GenAI Flavor Alchemist</span>
        </div>
        <h3 className="font-headline text-5xl text-foreground mb-6">Create Your Story</h3>
        <p className="font-body text-foreground/70 max-w-xl mx-auto">
          Our AI helps us craft the perfect sensory experience for each scoop. Peek behind the curtain and see how we describe our legendary Belgian Chocolate.
        </p>
      </div>

      <div className="flex flex-col items-center">
        {!result ? (
          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="rounded-full bg-primary text-primary-foreground px-12 py-8 text-lg font-bold hover:scale-105 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : "GENERATE DESCRIPTION"}
          </Button>
        ) : (
          <Card className="bg-card border-primary/20 overflow-hidden animate-in zoom-in duration-500 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="font-headline text-2xl text-primary mb-6 italic">The Description</h4>
                  <p className="font-body text-foreground/90 leading-relaxed text-lg italic">
                    "{result.description}"
                  </p>
                </div>
                <div className="bg-foreground/5 p-8 rounded-2xl border border-foreground/5">
                  <h4 className="font-headline text-xl text-foreground mb-6 uppercase tracking-widest">Chef's Pairings</h4>
                  <ul className="space-y-4">
                    {result.pairingSuggestions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/70 font-body">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="link" 
                    onClick={() => setResult(null)} 
                    className="mt-8 text-primary p-0 h-auto font-bold uppercase tracking-widest text-[10px]"
                  >
                    Reset Alchemist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
