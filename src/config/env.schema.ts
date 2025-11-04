import { z } from 'zod';

export const EnvSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test', 'local'])
		.default('local'),
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z.url(),
	DATABASE_USER: z.string(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_NAME: z.string(),
	DATABASE_PORT: z.coerce.number().default(3000),
	DATABASE_HOST: z.string().default('localhost'),
});

// Infer the TypeScript type from the schema for type-safe access
export type Env = z.infer<typeof EnvSchema>;
