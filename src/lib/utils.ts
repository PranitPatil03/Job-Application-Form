import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(4, "First Name must be at least 4 characters")
      .max(15, "First Name must be at most 15 characters"),
    lastName: z
      .string()
      .min(4, "Last Name must be at least 4 characters")
      .max(15, "Last Name must be at most 15 characters"),
    number: z
      .string()
      .regex(/^\+?[1-9]\d{1,10}$/, "Enter a valid phone number"),
    email: z.string().email("Enter a valid email"),
    positionType: z.enum(["Developer", "Designer", "Manager"]),
    relevantExperience: z
      .number()
      .min(1, "Relevant Experience must be at least 1")
      .optional(),
    portfolioURL: z.string().optional(),
    managementExperience: z.string().optional(),
    additionalSkills: z
      .array(z.enum(["JavaScript", "CSS", "Python", "React", "Typescript"]))
      .min(1, "Please select at least one additional skill"),
    interviewDate: z.string(),
    interviewTime: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.positionType === "Developer" && !data.relevantExperience) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Relevant Experience is required for Developer",
        path: ["relevantExperience"],
      });
    }

    if (
      data.positionType === "Designer" &&
      (!data.relevantExperience || !data.portfolioURL)
    ) {
      if (!data.relevantExperience) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Relevant Experience is required for Designer",
          path: ["relevantExperience"],
        });
      }
      if (!data.portfolioURL) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Portfolio URL is required for Designer",
          path: ["portfolioURL"],
        });
      }
    }

    if (data.positionType === "Manager" && !data.managementExperience) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Management Experience is required for Manager",
          path: ["managementExperience"],
        });
      }
  });

export const items = [
  {
    id: "JavaScript",
    label: "JavaScript",
  },
  {
    id: "CSS",
    label: "CSS",
  },
  {
    id: "Python",
    label: "Python",
  },
  {
    id: "Typescript",
    label: "Typescript",
  },
  {
    id: "React",
    label: "React",
  },
] as const;
