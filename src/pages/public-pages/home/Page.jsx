import React from "react";
import HeroSection from "@/components/public-components/home/HeroSection";
import FeaturedLot from "@/components/public-components/home/FeaturedLot";
import LiveAuctionSection from "@/components/public-components/home/LiveAuctionSection";
import BuyCoinsSection from "@/components/public-components/home/BuyCoinsSection";
import FAQSection from "@/components/public-components/home/FAQSection";
import TestimonialsSection from "@/components/public-components/home/TestimonialsSection";
import PublicPagesLayout from "../../../components/layout/PublicPagesLayout";

const Page = () => {
  return (
    <PublicPagesLayout>
      <HeroSection />
      <FeaturedLot />
      <LiveAuctionSection />
      <BuyCoinsSection />
      <FAQSection />
      <TestimonialsSection />
    </PublicPagesLayout>
  );
};

export default Page;
