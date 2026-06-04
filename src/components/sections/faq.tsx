"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { q: "Is your ice cream vegetarian?", a: "Yes, all our flavors are 100% vegetarian. We do not use any animal fats or gelatin in our production process. Our base is strictly premium dairy cream and plant-based stabilizers where necessary." },
  { q: "Do you offer home delivery?", a: "Absolutely. We deliver across Islamabad, Rawalpindi, and Lahore via our dedicated fleet and partner apps like Foodpanda. We use specialized insulated bags and dry ice to ensure your order stays perfectly frozen until it reaches your door." },
  { q: "What makes your Belgian Chocolate unique?", a: "We use a proprietary blend of 70% dark Belgian cocoa solids and local premium cream, churned at a significantly slower speed to prevent excess air (overrun). This results in a denser, richer texture that we call 'Silk'." },
  { q: "Are there any sugar-free options?", a: "We are currently developing a keto-friendly range. Stay tuned for our Sugar-Free Vanilla and Dark Cocoa launches later this year. Currently, all our flavors contain natural raw cane sugar or Belgian chocolate sugars." },
  { q: "Do you host events?", a: "Yes! We offer catering for weddings, corporate events, and private parties. Contact our Islamabad office for a custom churn menu quote." },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-32 bg-secondary/5 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Help Center</span>
          <h2 className="font-headline text-5xl md:text-7xl text-foreground mb-8 font-black uppercase tracking-tighter">Common Questions</h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">Everything you need to know about our churn process and delivery.</p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border bg-card rounded-[2rem] px-8 md:px-12 shadow-sm overflow-hidden transition-all duration-300 data-[state=open]:border-primary/30">
              <AccordionTrigger className="font-headline text-xl md:text-2xl text-foreground hover:text-primary hover:no-underline transition-colors py-8 text-left leading-tight">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed pb-10">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}