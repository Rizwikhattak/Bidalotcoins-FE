import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeadings from "../SectionHeadings";
import LiveAuctionCard from "../LiveAuctionCard";

const LiveAuctionSection = () => {
  return (
    <section className="px-10">
      <div className="">
        {/* Section Header */}
        <div className="flex  justify-between flex-wrap">
          <div className="mb-12 flex flex-col items-start gap-4 ">
            <div>
              <SectionHeadings title="LIVE AUCTION" />
              <h2 className="text-3xl font-semibold md:text-5xl font-[Playfair]">
                Live{" "}
                <span className="font-normal text-muted-foreground">
                  Auction
                </span>
              </h2>
            </div>
            <div>
              <p>
                Bid in real-time and secure your next rare collectible. Join
                active auctions with <br /> collectors from around the world.
              </p>
            </div>
            <Button variant="outline-primary" className="">
              Bid Now
            </Button>
          </div>

          <div className="flex-1 flex justify-end">
            <LiveAuctionCard className="w-full max-w-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveAuctionSection;
