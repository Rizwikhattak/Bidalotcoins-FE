import React, { useEffect } from "react";
import DialogCommon from "../common/DialogCommon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputCommon,
  RadioGroupCommon,
  TextAreaCommon,
} from "../common/FormCommons";
import { APP_CONSTANTS } from "../../utils/Constants";
import { addUpdateFaqs } from "./faqsScheema";
import {
  useAddFaqsMutation,
  useUpdateFaqsMutation,
} from "../../app/features/faqs/faqsApi";

const AddUpdateFaqs = ({
  selectedFaq,
  setSelectedFaq,
  openDialog,
  setOpenDialog,
}) => {
  const [addFaqs, { isLoading: isPostLoading }] = useAddFaqsMutation();
  const [updateFaqs, { isLoading: isUpdateLoading }] = useUpdateFaqsMutation();
  const initialValues = {
    question: "",
    answer: "",
    status: "",
  };
  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(addUpdateFaqs),
  });

  useEffect(() => {
    if (selectedFaq) {
      form.reset({
        question: selectedFaq?.question || "",
        answer: selectedFaq?.answer || "",
        status: selectedFaq?.status || "",
      });
    } else {
      form.reset(initialValues);
    }
  }, [selectedFaq, openDialog]);

  const handleFormSubmit = async (formData) => {
    try {
      selectedFaq
        ? await updateFaqs({
            ...formData,
            id: selectedFaq?.id,
          }).unwrap()
        : await addFaqs(formData).unwrap();
    } catch (err) {
      console.error(err);
    }
    setOpenDialog(false);
    setSelectedFaq(null);
    form.reset(initialValues);
  };
  const handleFormError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(!openDialog)}>+ Add FAQ</Button>

      {openDialog && (
        <DialogCommon
          open={openDialog}
          onOpenChange={(val) => {
            setOpenDialog(val);
            if (!val) {
              setSelectedFaq(null);
              form.reset(initialValues);
            }
          }}
          headerTitle="Add FAQ"
          className="sm:max-w-xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
            >
              <InputCommon
                control={form.control}
                name="question"
                label="Question"
                placeholder="e.g How do i place a bid?"
              />
              <TextAreaCommon
                control={form.control}
                name="answer"
                label="Answer"
                placeholder="Enter your answer here..."
              />
              <RadioGroupCommon
                control={form.control}
                name="status"
                label="Status"
                options={[
                  {
                    id: APP_CONSTANTS.PUBLISHED_STATUS,
                    name: APP_CONSTANTS.PUBLISHED_STATUS,
                  },
                  {
                    id: APP_CONSTANTS.ARCIVED_STATUS,
                    name: APP_CONSTANTS.ARCIVED_STATUS,
                  },
                ]}
                type="col"
              />

              <div className="flex items-center justify-between gap-2 mt-5">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={selectedFaq ? isUpdateLoading : isPostLoading}
                >
                  {selectedFaq ? "Update Faq" : "Save Faq"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogCommon>
      )}
    </div>
  );
};

export default AddUpdateFaqs;
