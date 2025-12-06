import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CountdownTimer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{days}</span>
        <span className="text-xs text-muted-foreground">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{hours}</span>
        <span className="text-xs text-muted-foreground">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{minutes}</span>
        <span className="text-xs text-muted-foreground">Minute</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{seconds}</span>
        <span className="text-xs text-muted-foreground">Seconds</span>
      </div>
    </div>
  );
};

const FeaturedLot = () => {
  // Mock countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 151,
    hours: 21,
    minutes: 1,
    seconds: 37,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left: Featured Lot Card */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-3xl font-bold">
                  Featured Lot –<br />
                  Live Now
                </h2>
                <p className="text-muted-foreground">
                  This historic coin is currently up for bidding in real time.
                  Don't miss your chance to own a certified artifact of rare
                  value, backed by expert grading and trusted provenance.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                View all Live Auctions
              </Button>
            </div>
          </div>

          {/* Center: Coin Image with Info Card */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md">
              {/* Featured Coin Card */}
              <div className="relative rounded-lg border bg-card p-6 shadow-lg">
                {/* Badges */}
                <div className="absolute left-4 top-4 flex gap-2">
                  <Badge className="bg-red-500 hover:bg-red-600">Live</Badge>
                  <Badge variant="secondary">Lot # 236965</Badge>
                </div>

                {/* Coin Image - Using placeholder circle */}
                <div className="my-8 flex items-center justify-center">
                  <div className="relative h-48 w-48 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 shadow-2xl">
                    <div className="absolute inset-4 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-800">
                      <span className="text-4xl font-bold text-yellow-200">
                        1943
                      </span>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="mb-6">
                  <CountdownTimer
                    days={timeLeft.days}
                    hours={timeLeft.hours}
                    minutes={timeLeft.minutes}
                    seconds={timeLeft.seconds}
                  />
                </div>

                {/* Coin Details */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    1943 Steel Cent – BU Grade (Coin Title)
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">
                      Current bid
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      $6,969.00
                    </span>
                  </div>
                  <Button className="w-full">Bid Now</Button>
                </div>
              </div>

              {/* Large Decorative Coin in Background */}
              <div className="absolute -right-32 top-1/2 -z-10 hidden -translate-y-1/2 xl:block">
                <div className="h-96 w-96 rounded-full bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 opacity-20 blur-sm" />
              </div>
            </div>
          </div>

          {/* Right: Did You Know Card */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">Did you know?</h3>
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
        <div className="mt-16 border-t pt-12">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale">
            <div className="text-lg font-semibold">AMERICAN NUMISMATIC</div>
            <div className="text-2xl font-bold">ebay</div>
            <div className="text-lg font-semibold">NGC</div>
            <div className="text-lg font-semibold">PCGS</div>
            <div className="text-lg font-semibold">AMERICAN NUMISMATIC</div>
            <div className="text-2xl font-bold">ebay</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLot;
