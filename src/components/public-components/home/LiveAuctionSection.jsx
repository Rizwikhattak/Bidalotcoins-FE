import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AuctionCard = ({
  title,
  price,
  bgColor,
  buttonVariant,
  isHot = true,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg p-8  min-h-[300px] flex flex-col justify-between`}
    >
      {isHot && (
        <Badge className="absolute right-4 top-4 bg-black text-white hover:bg-black/90">
          HOT NOW
        </Badge>
      )}

      <div>
        <p className="mb-2 text-sm text-white/80">Coin Price</p>
        <p className="mb-4 text-3xl font-bold text-white">{price}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <Button variant={buttonVariant} className="w-full md:w-auto">
          Buy It Now
        </Button>
      </div>

      {/* Decorative Coin Image - Placeholder */}
      <div className="absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-white/10" />
    </div>
  );
};

const LiveAuctionSection = () => {
  return (
    <section className=" py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Badge variant="outline" className="mb-4">
              🔴 LIVE AUCTION
            </Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Live{" "}
              <span className="font-normal text-muted-foreground">Auction</span>
            </h2>
          </div>
          <Button>Bid Now</Button>
        </div>

        {/* Featured Live Auction */}
        <div className="mb-8 rounded-lg border  p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-6">
              {/* Coin Image */}
              <div className="h-32 w-32 flex-shrink-0 rounded-full bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 shadow-lg">
                <div className="flex h-full items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-700 via-yellow-700 to-amber-800" />
                </div>
              </div>

              {/* Auction Info */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge className="bg-red-500 hover:bg-red-600">Live</Badge>
                  <Badge variant="secondary">Lot # 236965</Badge>
                </div>
                <h3 className="text-xl font-semibold">
                  1881-S Morgan Dollar – MS64 (Coin Title)
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">
                    Current bid
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    $6,969.00
                  </span>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">151</div>
                <div className="text-xs text-muted-foreground">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">21</div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Minute</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">37</div>
                <div className="text-xs text-muted-foreground">Seconds</div>
              </div>
            </div>

            <Button size="lg">Bid Now</Button>
          </div>
        </div>

        {/* Auction Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AuctionCard
            title="1964 Kennedy Half Dollar"
            price="$6,367.00"
            bgColor="bg-gradient-to-br from-gray-900 to-black"
            buttonVariant="default"
          />
          <AuctionCard
            title="1943 Steel Wheat Penny"
            price="$6,367.00"
            bgColor="bg-gradient-to-br from-yellow-700 via-amber-600 to-yellow-800"
            buttonVariant="secondary"
          />
        </div>
      </div>
    </section>
  );
};

export default LiveAuctionSection;
