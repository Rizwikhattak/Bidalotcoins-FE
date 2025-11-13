import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-[180px] font-bold leading-none text-primary/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/10 rounded-full p-8">
              <Search className="h-20 w-20 text-primary" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2 min-w-[160px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/admin/dashboard")}
            className="gap-2 min-w-[160px]"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Need help? Check out our{" "}
            <button
              onClick={() => navigate("/admin/faqs")}
              className="text-primary hover:underline font-medium"
            >
              FAQ's
            </button>{" "}
            or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
