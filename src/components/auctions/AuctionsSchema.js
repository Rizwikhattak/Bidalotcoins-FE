import * as z from "zod";

// Zod Schema
const auctionSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title must not exceed 200 characters"),

    description: z
      .string()
      .min(1, "Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(2000, "Description must not exceed 2000 characters"),

    start_date_time: z
      .date({
        required_error: "Start date and time is required",
        invalid_type_error: "Please select a valid date and time",
      })
      .refine((date) => date > new Date(), "Start date must be in the future"),

    end_date_time: z.date({
      required_error: "End date and time is required",
      invalid_type_error: "Please select a valid date and time",
    }),

    image: z
      .any()
      .refine((file) => file !== null && file !== undefined && file !== "", {
        message: "Banner image is required",
      }),

    total_lots: z.coerce
      .string()
      .min(1, "Total coins is required")
      .refine((val) => !isNaN(Number(val)), "Must be a valid number")

      .refine(
        (val) => Number.isInteger(Number(val)),
        "Total coins must be a whole number"
      ),
  })
  .refine(
    (data) => {
      // Check if end_date_time is after start_date_time
      if (data.start_date_time && data.end_date_time) {
        return data.end_date_time > data.start_date_time;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["end_date_time"], // This will show the error on the end_date_time field
    }
  );

export { auctionSchema };
