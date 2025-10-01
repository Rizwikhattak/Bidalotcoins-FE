import { AlertTriangle, AlertTriangleIcon } from "lucide-react";
import ModalCommon from "./ModalCommon";
import { Alert, AlertDescription } from "../ui/alert";

const AccessRevokedModal = ({ open, onOpenChange, business }) => {
  return (
    <ModalCommon
      open={open}
      onOpenChange={onOpenChange}
      headerTitle="Your Access Has Been Revoked!"
      ModalStyle="sm:max-w-[500px]"
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          <p>
            You have been removed from the business{" "}
            <span className="font-semibold">
              "{business?.business?.business_name}"
            </span>{" "}
            or your account has been deactivated. As a result, you no longer
            have access to this system or its features.
          </p>
        </div>

        <Alert className="border-red-200 bg-red-50">
          <AlertTriangleIcon className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            If you believe this was a mistake or need further clarification,
            please contact your administrator or support team.
          </AlertDescription>
        </Alert>

        <div className="text-sm text-gray-500 pt-2">
          Need help? contact your admin or{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800">
            support
          </a>
          .
        </div>
      </div>
    </ModalCommon>
  );
};

export default AccessRevokedModal;
