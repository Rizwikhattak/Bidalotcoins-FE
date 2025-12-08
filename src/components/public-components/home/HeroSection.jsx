import React from "react";
import { Button } from "@/components/ui/button";
import MoveDownRightIcon from "@/assets/images/icons/move-down-right.svg";
const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="mb-6 font-[Playfair] text-4xl font-semibold  md:text-5xl lg:text-6xl">
            <span className="text-primary ">Discover</span>{" "}
            <span className="text-foreground">
              One Historic Coin at a Time.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl">
            Explore rare, historical, and certified coins from trusted sellers
            <br className="hidden sm:block" />
            around the world. Bid with confidence on a secure and modern
            platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className=" rounded-full">
              Browse Upcoming Auctions
              <img src={MoveDownRightIcon} alt="" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border border-primary rounded-full text-primary"
            >
              Start a Bid
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
