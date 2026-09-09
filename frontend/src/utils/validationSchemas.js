import { z } from 'zod';

// --- Auth Schemas ---

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// --- Project Schemas ---

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(100, 'Project name cannot exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
  deadline: z
    .string()
    .optional()
    .or(z.literal('')),
  status: z
    .string()
    .optional(),
});

// --- Task Schemas ---

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .max(200, 'Task title cannot exceed 200 characters'),
  description: z
    .string()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),
  priority: z
    .string()
    .optional(),
  status: z
    .string()
    .optional(),
  dueDate: z
    .string()
    .optional()
    .or(z.literal('')),
  assignedTo: z
    .string()
    .optional()
    .or(z.literal('')),
});
