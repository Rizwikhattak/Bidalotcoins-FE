import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqsColumn1 = [
    {
      id: "1",
      question: "What is an auction?",
      answer:
        "Auctions allow items to be sold to the highest bidder. Participants bid on the item until the highest bid is reached within a set timeframe. The highest bidder wins and pays the bid amount.",
    },
    {
      id: "2",
      question: "How do auctions work?",
      answer:
        "Participants place bids on items they're interested in. Each new bid must be higher than the previous one. When the auction ends, the highest bidder wins the item.",
    },
    {
      id: "3",
      question: "What types of auctions are there?",
      answer:
        "There are several types including live auctions, timed auctions, sealed bid auctions, and reserve auctions. Each has different rules and bidding mechanisms.",
    },
    {
      id: "4",
      question: "Who can participate in auctions?",
      answer:
        "Anyone with a verified account can participate in our auctions. Some premium auctions may require additional verification or deposit.",
    },
  ];

  const faqsColumn2 = [
    {
      id: "5",
      question: "What happens if I win an auction?",
      answer:
        "If you win an auction, you'll receive a notification and invoice. You'll need to complete payment within the specified timeframe to secure your purchase.",
    },
    {
      id: "6",
      question: "Can I sell items at auctions?",
      answer:
        "Yes, registered sellers can list items for auction. Contact our team to learn about the seller verification process and listing requirements.",
    },
    {
      id: "7",
      question: "What are some tips for successful auction?",
      answer:
        "Research items beforehand, set a maximum bid limit, bid strategically near the end, and always verify item authenticity and condition reports.",
    },
    {
      id: "8",
      question: "Are there risks associated buying at auctions?",
      answer:
        "While we verify all items, it's important to review item descriptions, ask questions, and understand that auction sales are typically final.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <HelpCircle className="mr-1 h-3 w-3" />
            QUESTION NOW
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">
            Frequently Asked{" "}
            <span className="relative">
              <span className="text-muted-foreground">Questions</span>
              {/* Circle decoration around 'Q' */}
              <div className="absolute -left-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <span className="text-2xl font-bold text-primary-foreground">Q</span>
              </div>
            </span>
          </h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Column 1 */}
          <Accordion type="single" collapsible defaultValue="1">
            {faqsColumn1.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.id}. {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Column 2 */}
          <Accordion type="single" collapsible>
            {faqsColumn2.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.id}. {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
