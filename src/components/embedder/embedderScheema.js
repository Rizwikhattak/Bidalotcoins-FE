import z from "zod";

export const embedderScheema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
      "Price must be a valid positive number"
    ),
  tag: z.string().min(1, "Tag is required"),
  image: z.preprocess(
    (val) => {
      // convert FileList to single file; allow undefined/null -> keep as undefined
      if (val instanceof FileList) return val[0];
      if (Array.isArray(val)) return val[0];
      return val;
    },
    z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file.size <= 15_000_000,
        "Image must be less than 15MB"
      )
      .refine(
        (file) =>
          !file ||
          ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
  ),
});
