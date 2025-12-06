import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Mr. Daniel Scoot",
      location: "Texas, USA",
      title: "Great Auction Product!",
      text: "Very professional and great coin selection. I've been collecting for 15 years. Bidalot is my favorite auction houseBid with confidence!",
      image: null, // Placeholder for avatar
    },
    {
      id: 2,
      name: "Sarah Johnson",
      location: "New York, USA",
      title: "Excellent Service!",
      text: "Outstanding platform with authentic coins and transparent processes. The customer service team is incredibly helpful and responsive. Highly recommended!",
      image: null,
    },
    {
      id: 3,
      name: "Michael Chen",
      location: "California, USA",
      title: "Trusted Platform!",
      text: "I've purchased multiple rare coins through Bidalot. Every transaction has been smooth, and the coins are exactly as described. Great experience!",
      image: null,
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            💬 Testimonials
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">
            Praise from Our{" "}
            <span className="text-muted-foreground">Collectors</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Left: User Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl">
                <div className="aspect-[3/4] w-full">
                  {/* Placeholder for user image */}
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
                    <Avatar className="h-32 w-32">
                      <AvatarFallback className="bg-primary text-4xl font-bold text-primary-foreground">
                        {currentTestimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>

              {/* Decorative blur cards in background */}
              <div className="absolute -left-8 top-8 -z-10 h-64 w-48 rounded-2xl bg-gray-200 blur-sm opacity-50" />
              <div className="absolute -left-16 top-16 -z-20 h-64 w-48 rounded-2xl bg-gray-300 blur-md opacity-30" />
            </div>

            {/* Right: Testimonial Content */}
            <div className="space-y-6">
              {/* Quote Icon */}
              <Quote className="h-12 w-12 text-primary" />

              {/* Title */}
              <h3 className="text-2xl font-bold text-primary">
                {currentTestimonial.title}
              </h3>

              {/* Testimonial Text */}
              <p className="text-lg leading-relaxed text-muted-foreground">
                {currentTestimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {currentTestimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
