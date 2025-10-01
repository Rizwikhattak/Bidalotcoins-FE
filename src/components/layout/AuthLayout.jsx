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
import { useTheme } from "../../hooks/useTheme";
const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen p-10">
      <div className="flex-1 p-10">
        <div className="login-header">
          <TypographyH2>Login</TypographyH2>
          <TypographyMuted>Enter email and password</TypographyMuted>
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
      <div className="flex-1 bg-primary rounded-lg flex flex-col p-10 gap-10  text-white">
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
  );
};

export default AuthLayout;
