import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ArrowRight, Section } from "lucide-react";
import PlaceholderImage from "@/assets/images/live-auction-img.png";
import SectionHeadings from "../SectionHeadings";
import CarouselCommon from "../../common/CarouselCommon";

const AuctionCard = ({
  title,
  price,
  bgColor,
  labelColor = "oklch(0.77 0.14 91.05)",
  cardFillColor = "#1E1E1E",
  isHot = true,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-8 min-h-[400px] flex flex-col justify-between ${bgColor}`}
    >
      {isHot && (
        <Badge className="absolute right-6 top-6 bg-primary text-black hover:bg-primary/90 rounded-full px-4 py-2 font-semibold">
          HOT
          <br />
          NOW
        </Badge>
      )}

      <div className="relative z-10">
        <h3 className="text-3xl  text-white leading-tight font-[Playfair]">
          {title}
        </h3>
        <p className="mt-4 text-xs text-gray-300 font-light">Coin Price</p>
        <p className="mb-4 text-4xl font-bold ">{price}</p>
      </div>

      <div className="space-y-4 absolute top-0 right-10  z-30">
        <p
          className="text-white h-20 p-2 w-16 rounded-b-full text-center "
          style={{ backgroundColor: labelColor }}
        >
          Hot Now
        </p>
      </div>

      {/* Decorative Coin Image */}
      <div
        className={`absolute right-[-80px] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full flex items-center justify-center z-10 overflow-visible pointer-events-none`}
        style={{ backgroundColor: cardFillColor }}
      >
        <div className="w-[300px] h-[300px] p-4">
          <img
            src={PlaceholderImage}
            alt="Coin"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
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
    <section className="py-16 md:py-24 px-10">
      <div className="">
        {/* Section Header */}
        <div className="mb-12">
          <div>
            <SectionHeadings title="BUY COINS" />
            <h2 className="text-3xl font-semibold md:text-5xl font-[Playfair]">
              Buy Coins{" "}
              <span className="font-normal text-muted-foreground">
                Instantly
              </span>
            </h2>
          </div>
          <div className="py-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <AuctionCard
              title="1964 Kennedy Half Dollar"
              price={<span className="text-primary">$6,367.00</span>}
              bgColor="bg-foreground"
            />
            <AuctionCard
              title="1943 Steel Wheat Penny"
              price={<span className="text-black">$6,367.00</span>}
              bgColor="bg-[#876900]"
              labelColor="black"
              cardFillColor="#9B7D14"
            />
          </div>
        </div>

        {/* Coins Carousel */}
        <div className="px-4">
          {" "}
          <CarouselCommon />
        </div>

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
