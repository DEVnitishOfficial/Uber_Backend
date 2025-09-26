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
  }),

  password: z.string({
    required_error: "password is required",
  })
    .min(8, "password must be at least eight characters"),

  // role:
  role: z.enum(["PASSENGER", "DRIVER"]).default("PASSENGER").optional(),

  location: z.object({
    type: z.enum(['Point']).default('Point'),
    coordinates: z.array(z.number()).default([0, 0]),
  }).optional(),
  
  refreshToken: z.string().optional(),
});

const loginUserSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }),

  password: z.string({
    required_error: "password is required",
  })
    .min(8, "password must be at least eight characters"),
});

const userUpdateSchema = z.object({
  userName: z.string().min(5).max(50).optional(),
  email: z.string().email().optional(),
  location: z.object({
    type: z.enum(['Point']).default('Point'),
    coordinates: z.array(z.number()).default([0, 0]),
  }).optional(),

  longitude: z.number({
    invalid_type_error: "Longitude must be a number",
  }).optional(),
  latitude: z.number({
    invalid_type_error: "Latitude must be a number",
  }).optional(),

});

export { createUserSchema, userUpdateSchema, loginUserSchema };
