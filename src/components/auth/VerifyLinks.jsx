import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyLinkMutation } from "../../app/features/auth/authApi";
import { GLOBAL_ROUTES } from "../../utils/Constants";

const VerifyLinks = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [verifyLink, { isLoading }] = useVerifyLinkMutation();

  useEffect(() => {
    const VerifyTokenLink = async () => {
      try {
        // unwrap() returns the data directly
        const response = await verifyLink({ token }).unwrap();
        console.log("response", response);

        if (response?.data?.redirect_password) {
          navigate(GLOBAL_ROUTES.ADMIN_SET_PASSWORD, {
            state: { token, isActivateAccount: false},
          });
        } else if (response?.data?.redirect_activate_account) {
          navigate(GLOBAL_ROUTES.ADMIN_ACTIVATE_ACCOUNT, {
            state: { token, isActivateAccount: true},
          });
        }
      } catch (err) {
        console.error("Verification error:", err);
        // Optionally navigate to an error page
        // navigate(GLOBAL_ROUTES.ERROR);
      }
    };

    if (token) {
      VerifyTokenLink();
    }
  }, [token, verifyLink, navigate]);

  return <div>{isLoading ? "Verifying..." : "Verification Complete"}</div>;
};

export default VerifyLinks;
