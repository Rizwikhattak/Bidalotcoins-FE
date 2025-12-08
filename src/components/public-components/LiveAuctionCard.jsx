import React, { useEffect, useState } from "react";
import CommonBadge from "../common/CommonBadge";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import LiveAuctionImage from "@/assets/images/live-auction-img.png";
import { cn } from "@/lib/utils";
const LiveAuctionCard = ({ className }) => {
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
    <div className={cn("max-w-sm", className)}>
      <div className="  border bg-card shadow-lg rounded-3xl">
        <div className="p-1 image-container">
          <div className="relative py-2 bg-pale-sage rounded-3xl ">
            <div className="absolute left-0 top-0 z-10 mt-3 w-full px-3">
              <div className="flex gap-2 justify-between items-center w-full">
                <CommonBadge />
                <Badge
                  variant="secondary"
                  className="bg-gray-800 text-white rounded-full"
                >
                  Lot # 236965
                </Badge>
              </div>
            </div>

            <div className="relative flex items-center justify-center  h-64">
              <img
                src={LiveAuctionImage}
                alt=""
                className="  h-64 w-full object-contain "
              />
            </div>

            <div className="absolute bottom-0 mb-6 rounded-xl bg-card p-2 px-6 left-1/2 transform -translate-x-1/2 shadow-lg">
              <CountdownTimer
                days={timeLeft.days}
                hours={timeLeft.hours}
                minutes={timeLeft.minutes}
                seconds={timeLeft.seconds}
              />
            </div>
          </div>
        </div>
        <div className="space-y-3 p-4">
          <h3 className="text-lg font-semibold">
            1943 Steel Cent – BU Grade (Coin Title)
          </h3>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline flex-col">
              <p className="text-sm text-muted-foreground">Current bid:</p>

              <p className="text-2xl font-bold">$6,969.00</p>
            </div>
            <Button className="rounded-full">Bid Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const CountdownTimer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{days}</span>
        <span className="text-xs text-muted-foreground">Days</span>
      </div>
      <div>
        <p className="font-medium text-xl text-gray-500">:</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{hours}</span>
        <span className="text-xs text-muted-foreground">Hours</span>
      </div>
      <div>
        <p className="font-medium text-xl text-gray-500">:</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{minutes}</span>
        <span className="text-xs text-muted-foreground">Minute</span>
      </div>
      <div>
        <p className="font-medium text-xl text-gray-500">:</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{seconds}</span>
        <span className="text-xs text-muted-foreground">Seconds</span>
      </div>
    </div>
  );
};
export default LiveAuctionCard;
