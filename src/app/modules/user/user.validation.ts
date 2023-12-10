import { z } from 'zod';

// Custom Validators
function capitalizeValidator(value: string) {
  const correctValue =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  return value === correctValue;
}

// Validation Schemas
const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).refine(capitalizeValidator, {
    message: 'First name is not in capitalize format',
  }),
  lastName: z.string().min(1).max(20).refine(capitalizeValidator, {
    message: 'Last name is not in capitalize format',
  }),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().min(6).max(12),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
  isDeleted: z.boolean().default(true).optional(),
});

export default userValidationSchema;
