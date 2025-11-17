import BidalotLogo from "@/assets/images/Bidalot-primary-logo-dark.png";
import AuctionPana from "@/assets/images/Auction-pana.png";
import CopyrightLogo from "@/assets/images/copyright-logo.png";
import { Link } from "react-router-dom";
import {
  TypographyH2,
  TypographyH3,
  TypographyMuted,
  TypographyP,
} from "../common/Typography";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useTheme } from "../../hooks/useTheme";

const AuthLayout = ({ children, title = "", description = "" }) => {
  return (
    <>
      {/* Desktop Layout - hidden on mobile (lg breakpoint and above) */}
      <div className="hidden lg:flex w-full min-h-screen p-10">
        <div className="flex-1 p-10">
          <div className="login-header">
            <TypographyH2>{title}</TypographyH2>
            <TypographyMuted>{description}</TypographyMuted>
          </div>
          <div className="login-content mt-24 flex flex-col justify-center items-center gap-20">
            <div className="bidalot-logo">
              <img
                src={BidalotLogo}
                alt=""
                className="object-contain w-[134.4px] h-[80px]"
              />
            </div>
            <div className="flex-1 w-1/2">{children}</div>
          </div>
        </div>
        <div className="flex-1 bg-primary rounded-lg flex flex-col p-10 gap-10 text-white">
          <div className="upper-content text-center">
            <TypographyH3>Bidalot Auctions</TypographyH3>
          </div>
          <div className="dummy-img mx-auto">
            <img
              src={AuctionPana}
              alt="Auction pana img"
              className="w-lg h-lg object-contain"
            />
          </div>
          <div className="footer-content flex items-center justify-between">
            <div className="copyright-content flex items-center gap-2">
              <img
                src={CopyrightLogo}
                alt="Copyright logo"
                className="w-5 h-5 object-contain"
              />
              <TypographyP>2025 Bidalot</TypographyP>
            </div>
            <div>
              <TypographyP>
                <Link to="#" className="underline">
                  Privacy Policy
                </Link>
              </TypographyP>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - visible only on mobile (below lg breakpoint) */}
      <div className="lg:hidden min-h-screen w-full flex flex-col p-4 md:p-6 bg-gradient-to-b from-primary/5 to-background">
        {/* Mobile Header with Logo and Brand */}
        <div className="mb-6 text-center">
          <div className="bidalot-logo mx-auto mb-4">
            <img
              src={BidalotLogo}
              alt="Bidalot Logo"
              className="object-contain w-[100px] h-[60px] mx-auto"
            />
          </div>
          <TypographyH3 className="text-primary">Bidalot Auctions</TypographyH3>
        </div>

        {/* Mobile Card Container */}
        <Card className="w-full max-w-md mx-auto shadow-lg border-primary/10">
          <CardHeader className="space-y-1 pb-4">
            <TypographyH2 className="text-2xl md:text-3xl">
              {title}
            </TypographyH2>
            <TypographyMuted>{description}</TypographyMuted>
          </CardHeader>
          <CardContent className="pb-6">{children}</CardContent>
        </Card>

        {/* Mobile Footer */}
        <div className="mt-auto pt-8 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <img
                src={CopyrightLogo}
                alt="Copyright logo"
                className="w-4 h-4 object-contain"
              />
              <span>2025 Bidalot</span>
            </div>
            <Link
              to="#"
              className="underline hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
