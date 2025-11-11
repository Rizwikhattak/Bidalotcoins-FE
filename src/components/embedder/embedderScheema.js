import z from "zod";

export const embedderScheema = z.object({
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
});
