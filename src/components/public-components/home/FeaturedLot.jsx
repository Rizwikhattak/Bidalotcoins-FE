import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import PartnerLogo1 from "@/assets/images/Partner-1.svg";
import PartnerLogo2 from "@/assets/images/Partner-2.svg";
import PartnerLogo3 from "@/assets/images/Partner-3.svg";
import PartnerLogo4 from "@/assets/images/Partner-4.svg";
import LiveAuctionCard from "../LiveAuctionCard";


const FeaturedLot = () => {
  // Mock countdown timer




  return (
    <section className="py-16 md:py-24 min-h-[55rem] bg-[url('src/assets/images/Hero-bg-image.png')] bg-contain bg-no-repeat bg-center">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 px-10 gap-4 lg:grid-cols-12">
          {/* Left: Featured Lot Card */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-4xl font-[Playfair] font-medium">
                  Featured Lot –<br />
                  Live Now
                </h2>
                <p className="text-muted-foreground">
                  This historic coin is currently up for bidding in real time.
                  Don't miss your chance to own a certified artifact of rare
                  value, backed by expert grading and trusted provenance.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-white"
              >
                View all Live Auctions
              </Button>
            </div>
          </div>

          {/* Center: Coin Image with Info Card */}
          <div className="lg:col-span-3 ml-10 ">
            <LiveAuctionCard/>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-end items-start">
            <div className=" relative z-10 rounded-2xl px-4 py-6 max-w-sm  backdrop-blur-xs  border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col text-white">
                  <p className="font-semibold text-4xl text-center">100+</p>
                  <p>Successful Auctions</p>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-12">
                  <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/maxleiter.png"
                        alt="@maxleiter"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Did You Know Card */}
          <div className="lg:col-span-3 flex flex-col justify-end">
            <div>
              <h3 className="mb-4 font-semibold font-[Playfair] text-4xl">
                Did you know?
              </h3>
              <p className="mb-4 text-muted-foreground">
                The first coins were minted in Lydia (modern-day Turkey) around
                600 BC. They were made of electrum, a naturally occurring mix of
                gold and silver.
              </p>
              <button className="text-primary hover:underline">
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16 border-t p-12 backdrop-blur-sm  border-b overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12 ">
            <img
              src={PartnerLogo1}
              alt="partner-logo-1"
              className="object-contain"
            />
            <img
              src={PartnerLogo2}
              alt="partner-logo-1"
              className="object-contain"
            />
            <img
              src={PartnerLogo3}
              alt="partner-logo-1"
              className="object-contain"
            />
            <img
              src={PartnerLogo4}
              alt="partner-logo-1"
              className="object-contain"
            />
            <img
              src={PartnerLogo1}
              alt="partner-logo-1"
              className="object-contain"
            />
            <img
              src={PartnerLogo2}
              alt="partner-logo-1"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLot;
