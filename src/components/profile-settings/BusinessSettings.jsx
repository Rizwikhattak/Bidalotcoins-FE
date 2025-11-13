import React, { useState } from "react";
import { TypographyH3 } from "../common/Typography";
import { Button } from "../ui/button";
import { Edit, Eye } from "lucide-react";
import PersonalForm from "./PersonalForm";
import PersonalContent from "./PersonalContent";
import BusinessForm from "./BusinessForm";
import BusinessContent from "./BusinessContent";

const BusinessSettings = () => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  return (
    <div className="py-5">
      <div className="flex items-center justify-between gap-2 mb-6">
        <TypographyH3>Business Details</TypographyH3>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setIsEditEnabled(!isEditEnabled)}
        >
          {!isEditEnabled ? (
            <>
              <Edit className="h-4 w-4" />
              <span>Edit Information</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>View Information</span>
            </>
          )}
        </Button>
      </div>
      {isEditEnabled ? (
        <BusinessForm onSuccess={() => setIsEditEnabled(false)} />
      ) : (
        <BusinessContent />
      )}
    </div>
  );
};

export default BusinessSettings;
