import { z } from "zod";

const newsUpdatesScheema = z.object({
  name: z.string().min(1, "Tag name is required"),
  color_code: z.string().min(1, "Color code is required"),
});

export { newsUpdatesScheema };
