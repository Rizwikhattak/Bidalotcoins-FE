import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const CoinCard = ({ lotNumber, title, stock, price }) => {
  return (
    <div className="flex-shrink-0 w-full sm:w-64 rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      {/* Lot Number Badge */}
      <Badge variant="secondary" className="mb-3">
        Lot # {lotNumber}
      </Badge>

      {/* Coin Image - Placeholder */}
      <div className="mb-4 flex items-center justify-center">
        <div className="h-40 w-40 rounded-full bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 shadow-lg">
          <div className="flex h-full items-center justify-center">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-amber-700 via-yellow-700 to-amber-800" />
          </div>
        </div>
      </div>

      {/* Coin Details */}
      <div className="space-y-2">
        <h3 className="font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{stock} in stock</p>
        <p className="text-2xl font-bold text-primary">{price}</p>
        <Button className="w-full">Buy Now</Button>
      </div>
    </div>
  );
};

const BuyCoinsSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280; // Card width + gap
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const coins = [
    {
      lotNumber: "236965",
      title: "1881-S Morgan Dollar – MS64 (Coin Title)",
      stock: 97,
      price: "$6,969.00",
    },
    {
      lotNumber: "236965",
      title: "1881-S Morgan Dollar – MS64 (Coin Title)",
      stock: 102,
      price: "$6,969.00",
    },
    {
      lotNumber: "250965",
      title: "1943 Steel Cent – BU Grade (Coin Title)",
      stock: 124,
      price: "$6,969.00",
    },
    {
      lotNumber: "250965",
      title: "1881-S Morgan Dollar – MS64 (Coin Title)",
      stock: 166,
      price: "$6,969.00",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-4">
              <ArrowRight className="mr-1 h-3 w-3" />
              BUY OUR
            </Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Buy Coins{" "}
              <span className="font-normal text-muted-foreground">Instantly</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Coins Carousel */}
        <div
          ref={scrollContainerRef}
          className="mb-8 flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {coins.map((coin, index) => (
            <CoinCard key={index} {...coin} />
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            View More Coins
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BuyCoinsSection;
