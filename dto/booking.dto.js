import z from "zod";

export const createBookingSchema = z.object({
  source: z.object({
    latitude: z.number({
      required_error: "Source latitude is required",
    }),
    longitude: z.number({
      required_error: "Source longitude is required",
    }),
  }),

  destination: z.object({
    latitude: z.number({
      required_error: "Destination latitude is required",
    }),
    longitude: z.number({
      required_error: "Destination longitude is required",
    }),
  }),

  distance: z.number().optional(),

  status: z
    .enum(["confirmed", "cancelled", "completed", "pending", "on the way"])
    .default("pending"),

  feedback: z.string().max(500).optional(),

  rating: z.number().min(1).max(5).optional(),
});

export const updateBookingSchema = createBookingSchema.partial();
