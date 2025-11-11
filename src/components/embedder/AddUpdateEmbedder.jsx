import React, { useEffect, useState } from "react";
import DialogCommon from "../common/DialogCommon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckboxCommon,
  CheckboxGroupCardsCommon,
  FileUploadCommon,
  InputCommon,
  TextAreaCommon,
} from "../common/FormCommons";
import {
  useAddRoleMutation,
  useGetPermissionsQuery,
  useUpdateRoleMutation,
} from "../../app/features/roles/rolesApi";
import { TypographyMuted } from "../common/Typography";
import {
  useAddTagMutation,
  useUpdateTagMutation,
} from "../../app/features/tags/tagsApi";
import { APP_CONSTANTS } from "../../utils/Constants";
import { embedderScheema } from "./embedderScheema";
import { CloudUpload, Download, Upload } from "lucide-react";
import {
  useAddEmbedderMutation,
  useDownloadCSVQuery,
  useLazyDownloadCSVQuery,
  useUpdateEmbedderMutation,
} from "../../app/features/embedder/embeddersApi";

const AddUpdateEmbedder = ({
  selectedEmbedder,
  setSelectedEmbedder,
  openDialog,
  setOpenDialog,
}) => {
  const [addEmbedder, { isLoading: isPostLoading }] = useAddEmbedderMutation();
  const [downloadCSV, { data, isFetching, isError, error }] =
    useLazyDownloadCSVQuery();
  const [updateEmbedder, { isLoading: isUpdateLoading }] =
    useUpdateEmbedderMutation();
  const initialValues = {
    images: undefined,
  };
  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(embedderScheema),
  });

  useEffect(() => {
    if (selectedEmbedder) {
      form.reset({
        images: selectedEmbedder?.images || [],
      });
    } else {
      form.reset(initialValues);
    }
  }, [selectedEmbedder, openDialog]);

  // Handle CSV download when data is received
  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      convertToCSV(data.data);
    }
  }, [data]);

  const convertToCSV = (dataArray) => {
    if (!dataArray || dataArray.length === 0) {
      console.error("No data to export");
      return;
    }

    // Define CSV headers
    const headers = [
      "ID",
      "Created At",
      "Filename",
      "File Size",
      "Width",
      "Height",
      "Dimensions",
      "HTML Code",
      "Image URL",
      "Created By",
    ];

    // Convert data to CSV rows
    const rows = dataArray.map((item) => [
      item.id,
      item.created_at,
      item.filename,
      item.file_size,
      item.width,
      item.height,
      item.dimensions,
      item.html_code,
      item.image,
      item.created_by,
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `embedder_data_${Date.now()}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  const handleFormSubmit = async (submittedData) => {
    try {
      const formData = new FormData();
      if (submittedData?.images?.length > 0)
        submittedData.images.forEach((image) => {
          formData.append("images", image);
        });
      else formData.append("images", submittedData?.images);

      selectedEmbedder
        ? await updateEmbedder({
            ...formData,
            id: selectedEmbedder?.id,
          }).unwrap()
        : await addEmbedder(formData).unwrap();
    } catch (err) {
      console.error(err);
    }
    setOpenDialog(false);
    setSelectedEmbedder(null);
    form.reset(initialValues);
  };

  const handleFormError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button onClick={() => setOpenDialog(!openDialog)}>
          <CloudUpload /> Upload Images
        </Button>
        <Button
          onClick={() => downloadCSV({ exportCSV: "CSV" })}
          isLoading={isFetching}
        >
          <Download /> Export CSV
        </Button>
      </div>

      {openDialog && (
        <DialogCommon
          open={openDialog}
          onOpenChange={(val) => {
            setOpenDialog(val);
            if (!val) {
              setSelectedEmbedder(null);
              form.reset(initialValues);
            }
          }}
          headerTitle="Add Images"
          className="sm:max-w-xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
            >
              <FileUploadCommon
                control={form.control}
                name="images"
                title="Upload Images"
                accept="image/jpeg,image/png,image/jpg"
                maxFiles={20}
                maxSize={5}
                showPreview={true}
                className="col-span-4"
              />

              <div className="flex items-center justify-between gap-2 mt-5">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={selectedEmbedder ? isUpdateLoading : isPostLoading}
                >
                  {selectedEmbedder ? "Update Image" : "Upload Images"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogCommon>
      )}
    </div>
  );
};

export default AddUpdateEmbedder;
