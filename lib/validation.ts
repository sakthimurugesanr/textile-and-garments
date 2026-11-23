import { z } from "zod";
const text = z
  .string()
  .trim()
  .max(2000, "Please use 2,000 characters or fewer.");
export const inquirySchema = z.object({
  name: text.min(2, "Enter your full name."),
  company: text.min(2, "Enter your company name."),
  email: z.email("Enter a valid business email.").max(254),
  phone: z
    .string()
    .trim()
    .max(50)
    .refine(
      (v) => !v || /^[+\d\s().-]{6,50}$/.test(v),
      "Enter a valid phone number.",
    ),
  country: text.min(2, "Enter your country."),
  category: text.min(1, "Select a product category."),
  fabric: text,
  quantity: z
    .string()
    .trim()
    .regex(/^[1-9]\d{0,8}$/, "Enter a quantity greater than zero."),
  sizes: text,
  decoration: text,
  branding: text,
  packaging: text,
  date: z
    .string()
    .max(10)
    .refine(
      (v) =>
        !v || (/^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))),
      "Enter a valid date.",
    ),
  message: text.min(
    10,
    "Please describe your requirements in at least 10 characters.",
  ),
  consent: z.boolean().refine((v) => v, "Please accept the privacy policy."),
  website: z.string().max(0, "Spam protection triggered."),
  products: z.array(z.string().max(100)).max(50),
  sample: z.boolean(),
});
export type InquiryValues = z.infer<typeof inquirySchema>;
export const fileTypes = ["application/pdf", "image/jpeg", "image/png"];
export const maxFileSize = 5 * 1024 * 1024;
