import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z][a-zA-Z]*$/, 'Name must start with uppercase letter'),

    age: z
      .number({ message: 'Age must be a number' })
      .min(0, 'Age cannot be negative'),

    email: z
      .string()
      .min(1, 'Email is required')
      .email({ message: 'Invalid email' }),

    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Muust be at least 6 character')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[^A-Za-z0-9]/, 'Must contain one special character'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),

    gender: z.enum(['male', 'female', 'other']),

    accept: z
      .boolean()
      .refine((val) => val === true, 'You must accept Terms & Conditions'),

    file: z
      .string()
      .min(1, 'File is required')
      .regex(
        /^data:(image\/png|image\/jpeg);base64,[A-Za-z0-9+/=]+$/,
        'File must be a valid base64 PNG or JPEG'
      ),

    country: z.string().min(1, 'Country is required'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords must match',
        path: ['confirmPassword'],
      });
    }
  });

export type FormSchemaType = z.infer<typeof formSchema>;
