import { z } from "zod";

export const createAdoptionTypes = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .refine(
      (email) => {
        const allowedTLDs = [".com", ".org", ".edu"];
        return allowedTLDs.some((tld) => email.endsWith(tld));
      },
      { message: "Email must end with .com, .org, or .edu" }
    ),
});
export const createPetSchema = z.object({
  breed: z.string().min(2, {
    message: "Breed must be at least 4 characters.",
  }),
  age: z.string().min(2, {
    message: "Age must be at least 4 characters.",
  }),
  health: z.string().min(2, {
    message: "Health must be at least 4 characters.",
  }),
  species: z.string().min(2, {
    message: "Species must be at least 4 characters.",
  }),
  image: z.string().min(2, {
    message: "image must be at least 4 characters.",
  }),
});
