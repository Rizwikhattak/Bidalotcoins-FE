import React, { useEffect } from "react";
import { TypographyH1, TypographyMuted } from "../common/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import {
  ComboboxCommon,
  DateTimePickerCommon,
  FileUploadCommon,
  InputCommon,
  TextAreaCommon,
} from "../common/FormCommons";
import { Button } from "../ui/button";
import { useGetAuctionsQuery } from "../../app/features/auctions/auctionsApi";
import { useNavigate, useParams } from "react-router-dom";
import { GLOBAL_ROUTES } from "../../utils/Constants";
import { lotFormSchema } from "./lotSchema";
import { useGetCountriesQuery } from "../../app/features/commons/commonsApi";
import { useGetTagsQuery } from "../../app/features/tags/tagsApi";
import { useAddLotMutation } from "../../app/features/lots/lotsApi";

const AddNewLot = () => {
  const [addLot, { isLoading: isPostLoading }] = useAddLotMutation();
  const { data: auctionsData, isLoading: isAuctionsLoading } =
    useGetAuctionsQuery();
  const { data: countriesData, isLoading: isGetCountriesLoading } =
    useGetCountriesQuery();
  const { data: tagsData, isLoading: isGetTagsLoading } = useGetTagsQuery();
  const navigate = useNavigate();
  const { id: auctionId } = useParams();
  const initialValues = {
    title: "",
    description: "",
    front_image: undefined,
    back_image: undefined,
    year: "",
    weight: "",
    cost: "",
    starting_price: "",
    images: undefined,
    country: "",
    auction: "",
    tag: "",
  };

  const form = useForm({
    resolver: zodResolver(lotFormSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  useEffect(() => {
    if (!isAuctionsLoading && auctionId) {
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
  }, [auctionsData, isAuctionsLoading, auctionId]);
  const handleFormSubmit = async (submitData) => {
    try {
      const formData = new FormData();
      Object.keys(submitData).forEach((key) => {
        formData.append(key, submitData[key]);
      });
      await addLot(formData).unwrap();
      form.reset(initialValues);
      navigate(GLOBAL_ROUTES.ADMIN_LOTS);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormError = (errors) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <section className="add-new-auctions-section">
      <TypographyH1>Add New Lot</TypographyH1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
          className="space-y-6 py-4"
        >
          <div className="">
            <div>
              <TypographyMuted className="text-lg py-4">Images</TypographyMuted>
              <div className="grid sm:grid-cols-12 gap-2 items-center">
                <FileUploadCommon
                  control={form.control}
                  name="front_image"
                  title="Upload Front Image"
                  accept="image/jpeg,image/png,image/jpg"
                  maxFiles={1} // 1 for single, >1 for multiple
                  maxSize={5} // Max size in MB
                  showPreview={true} // Show image preview
                  className="col-span-4"
                />
                <FileUploadCommon
                  control={form.control}
                  name="back_image"
                  title="Upload Back Image"
                  accept="image/jpeg,image/png,image/jpg"
                  maxFiles={1} // 1 for single, >1 for multiple
                  maxSize={5} // Max size in MB
                  showPreview={true} // Show image preview
                  className="col-span-4"
                />
                <FileUploadCommon
                  control={form.control}
                  name="images"
                  title="Upload Additional Images"
                  accept="image/jpeg,image/png,image/jpg"
                  maxFiles={5} // 1 for single, >1 for multiple
                  maxSize={5} // Max size in MB
                  showPreview={true} // Show image preview
                  className="col-span-4"
                />
              </div>
            </div>

            <div className="pt-6">
              <TypographyMuted className="text-lg">
                Coin Details
              </TypographyMuted>
              <div className="grid grid-cols-6 sm:grid-cols-12  gap-2 items-center">
                <div className="col-span-6 row-span-2">
                  <InputCommon
                    control={form.control}
                    name="title"
                    label="Title *"
                    placeholder="e.g Bidalot Coin Auction"
                    // className="h-16"
                  />
                </div>
                <div className="col-span-6 row-span-3">
                  <TextAreaCommon
                    control={form.control}
                    name="description"
                    label="Description *"
                    placeholder="e.g This coins is 1954 morgan coin made out of silver..."
                  />
                </div>
                <div className="col-span-3 row-span-1">
                  <InputCommon
                    control={form.control}
                    name="year"
                    label="Year *"
                    placeholder="e.g 1923"
                    // className="h-16"
                  />
                </div>
                <div className="col-span-3">
                  <ComboboxCommon
                    control={form.control}
                    name="country"
                    label="Country *"
                    placeholder="Country"
                    items={countriesData?.data || []}
                    isLoading={isGetCountriesLoading}
                  />
                </div>
                <div className="col-span-3">
                  <InputCommon
                    control={form.control}
                    name="weight"
                    label="Weight *"
                    placeholder="e.g 40g"
                    // className="h-16"
                  />
                </div>
                {/* <div className="col-span-3">
                  <ComboboxCommon
                    control={form.control}
                    name="move_to"
                    label="Move to"
                    placeholder="Move to"
                    items={[]}
                    isLoading={false}
                  />
                </div> */}
                <div className="col-span-3">
                  <ComboboxCommon
                    control={form.control}
                    name="auction"
                    label="Auction"
                    placeholder="Auction"
                    items={
                      auctionsData?.data?.map((auction) => ({
                        id: auction?.id,
                        name: auction?.title,
                      })) || []
                    }
                    isLoading={isAuctionsLoading}
                  />
                </div>
                <div className="col-span-3">
                  <InputCommon
                    control={form.control}
                    name="starting_price"
                    label="Starting price *"
                    placeholder="e.g 300$"
                    // className="h-16"
                  />
                </div>
                <div className="col-span-3">
                  <InputCommon
                    control={form.control}
                    name="cost"
                    label="What we paid fo *"
                    placeholder="e.g 5$"
                    // className="h-16"
                  />
                </div>
                <div className="col-span-3">
                  <ComboboxCommon
                    control={form.control}
                    name="tag"
                    label="Tags"
                    placeholder="Tags"
                    items={tagsData?.data || []}
                    isLoading={isGetTagsLoading}
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
              Add Lot
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AddNewLot;
