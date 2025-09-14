import { z } from "zod";

const createUserSchema = z.object({
  userName: z.string({
    required_error: "user name is Required",
  })
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be less than 50 characters")
    .trim()
    .toLowerCase(),

  email: z.string({
    required_error: "Email is required",
  })
    .email("please enter a valid email address")
    .toLowerCase(),

  password: z.string({
    required_error: "password is required",
  })
    .min(8, "password must be at least eight characters"),

  // role:
  role: z.enum(["RIDER", "DRIVER"]).default("RIDER").optional(),
});


const userUpdateSchema = createUserSchema.partial();

export { createUserSchema, userUpdateSchema };
