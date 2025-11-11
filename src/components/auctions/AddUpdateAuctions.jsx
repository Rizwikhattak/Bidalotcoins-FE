import React, { useEffect } from "react";
import { TypographyH1, TypographyMuted } from "../common/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import {
  DateTimePickerCommon,
  FileUploadCommon,
  InputCommon,
  TextAreaCommon,
} from "../common/FormCommons";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { auctionSchema } from "./AuctionsSchema";
import {
  useAddAuctionsMutation,
  useGetAuctionsQuery,
} from "../../app/features/auctions/auctionsApi";
import { useNavigate, useParams } from "react-router-dom";
import { GLOBAL_ROUTES } from "../../utils/Constants";

const AddUpdateAuctions = () => {
  const [addAuction, { isLoading: isPostLoading }] = useAddAuctionsMutation();
  const { data: auctionsData, isLoading: isGetLoading } = useGetAuctionsQuery();
  const navigate = useNavigate();
  const { id: auctionId } = useParams();
  const initialValues = {
    title: "",
    description: "",
    start_date_time: undefined,
    end_date_time: undefined,
    image: "",
    total_lots: "",
  };

  const form = useForm({
    resolver: zodResolver(auctionSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!isGetLoading && auctionId) {
      const selectedAuction =
        auctionsData &&
        auctionsData?.data?.find((item) => item.id === Number(auctionId));
      console.log("selectedAuction", selectedAuction, auctionId);
      form.reset({
        ...selectedAuction,
        start_date_time: new Date(
          `${selectedAuction?.start_date}T${selectedAuction?.start_time}+05:00`
        ),
        end_date_time: new Date(
          `${selectedAuction?.end_date}T${selectedAuction?.end_time}+05:00`
        ),
      });
    }
  }, [auctionsData, isGetLoading, auctionId]);
  const handleFormSubmit = async (data) => {
    try {
      const formattedData = {
        title: data.title,
        description: data.description,
        start_date_time: data.start_date_time.toISOString(),
        end_date_time: data.end_date_time.toISOString(),
        // Or if you need separate date and time:
        start_date: format(data.start_date_time, "yyyy-MM-dd"),
        start_time: format(data.start_date_time, "HH:mm:ss"),
        end_date: format(data.end_date_time, "yyyy-MM-dd"),
        end_time: format(data.end_date_time, "HH:mm:ss"),
        image: data.image,
        total_lots: Number(data.total_lots),
      };
      const formData = new FormData();
      Object.keys(formattedData).forEach((key) => {
        formData.append(key, formattedData[key]);
      });
      await addAuction(formData).unwrap();
      form.reset(initialValues);
      navigate(GLOBAL_ROUTES.ADMIN_AUCTIONS);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormError = (errors) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <section className="add-new-auctions-section">
      <TypographyH1>Add New Auction</TypographyH1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
          className="space-y-6 pt-4 flex flex-col h-full"
        >
          <div className="flex-1">
            <FileUploadCommon
              control={form.control}
              name="image"
              label="Banner Image"
              title="Upload Banner Image"
              accept="image/jpeg,image/png,image/jpg"
              maxFiles={1} // 1 for single, >1 for multiple
              maxSize={5} // Max size in MB
              showPreview={true} // Show image preview
            />

            <div>
              <TypographyMuted className="text-lg">
                Auction Details
              </TypographyMuted>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 items-center">
                <div className="col-span-6">
                  <InputCommon
                    control={form.control}
                    name="title"
                    label="Title"
                    placeholder="e.g Bidalot Coin Auction"
                    className="h-16"
                  />
                </div>
                <div className="col-span-6">
                  <TextAreaCommon
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="e.g This coins is 1954 morgan coin made out of silver..."
                  />
                </div>
              </div>
            </div>

            <div>
              <TypographyMuted className="text-lg">
                Auction Settings
              </TypographyMuted>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 items-center">
                <div className="col-span-4">
                  <InputCommon
                    control={form.control}
                    name="total_lots"
                    label="Total Coins"
                    placeholder="e.g 40"
                  />
                </div>
                <div className="col-span-4">
                  <DateTimePickerCommon
                    control={form.control}
                    name="start_date_time"
                    label="Start Date & Time"
                    placeholder="Select start date and time"
                  />
                </div>
                <div className="col-span-4">
                  <DateTimePickerCommon
                    control={form.control}
                    name="end_date_time"
                    label="End Date & Time"
                    placeholder="Select end date and time"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isPostLoading}>
              Publish Auction
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AddUpdateAuctions;

// import { format } from "date-fns";

// const dateTime = new Date("Wed Oct 15 2025 19:20:00 GMT+0500");

// // Split into separate formatted strings
// const dateOnly = format(dateTime, "yyyy-MM-dd"); // "2025-10-15"
// const timeOnly = format(dateTime, "HH:mm:ss"); // "19:20:00"
// const time12Hour = format(dateTime, "hh:mm aa"); // "07:20 PM"

// // Or other formats
// const dateFormatted = format(dateTime, "PPP"); // "October 15th, 2025"
// const timeFormatted = format(dateTime, "p"); // "7:20 PM"
