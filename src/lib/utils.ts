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
      .max(10, "First Name must be at most 10 characters"),
    lastName: z
      .string()
      .min(4, "Last Name must be at least 4 characters")
      .max(10, "Last Name must be at most 10 characters"),
    number: z
      .string()
      .regex(/^\+?[1-9]\d{1,10}$/, "Enter a valid phone number"),
    email: z.string().email("Enter valid email"),
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
  .refine((data) => {
    if (data.positionType === "Developer" && !data.relevantExperience) {
      return {
        relevantExperience:
          "Relevant Experience must be provided for Developer",
      };
    }
    if (data.positionType === "Designer" && !data.portfolioURL) {
      return { portfolioURL: "Portfolio URL must be provided for Designer" };
    }
    if (data.positionType === "Manager" && !data.managementExperience) {
      return {
        managementExperience:
          "Management Experience is required if you are a Manager",
      };
    }
    return true;
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
