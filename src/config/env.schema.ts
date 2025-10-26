import { z } from 'zod';

export const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	NODE_ENV: z
		.enum(['development', 'production', 'test', 'local'])
		.default('local'),
	PORT: z.coerce.number().default(3000),
	// JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
});

// Infer the TypeScript type from the schema for type-safe access
export type Env = z.infer<typeof EnvSchema>;
