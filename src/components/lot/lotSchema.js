import { z } from "zod";

export const lotFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  // handle FileList or single File (for input type="file")
  front_image: z.preprocess(
    (val) => {
      if (val instanceof FileList) return val.item(0);
      return val;
    },
    z
      .instanceof(File)
      .refine((file) => file.size <= 5_000_000, "Max file size is 5MB")
      .refine(
        (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
  ),

  back_image: z.preprocess(
    (val) => {
      if (val instanceof FileList) return val.item(0);
      return val;
    },
    z
      .instanceof(File)
      .refine((file) => file.size <= 5_000_000, "Max file size is 5MB")
      .refine(
        (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
  ),

  year: z.string().min(1, "Year is required"),
  weight: z.string().min(1, "Weight is required"),
  cost: z.string().min(1, "Cost is required"),
  starting_price: z.string().min(1, "Starting price is required"),

  images: z.preprocess(
    (val) => {
      // convert FileList to array; allow undefined/null -> keep as undefined
      if (val instanceof FileList) return Array.from(val);
      return val;
    },
    z
      .array(z.instanceof(File))
      .optional()
      .refine(
        (files) => !files || files.every((file) => file.size <= 5_000_000),
        "Each file must be less than 5MB"
      )
      .refine(
        (files) =>
          !files ||
          files.every((file) =>
            ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
          ),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
  ),

  country: z.string().min(1, "Country is required"),
  auction: z.string().optional(),
  tag: z.string().optional(),
});
