import { z } from "zod";
import { APP_CONSTANTS } from "../../utils/Constants";

const addUpdateFaqs = z.object({
  question: z
    .string()
    .min(1, "Question is required")
    .max(500, "Question must not exceed 500 characters"),

  answer: z
    .string()
    .min(1, "Answer is required")
    .max(2000, "Answer must not exceed 2000 characters"),

  status: z.coerce
    .string()
    .min(1, "Status is required")
    .refine(
      (val) =>
        [APP_CONSTANTS.PUBLISHED_STATUS, APP_CONSTANTS.ARCIVED_STATUS].includes(
          val
        ),
      "Status must be either Published or Archived"
    ),
});

export { addUpdateFaqs };
