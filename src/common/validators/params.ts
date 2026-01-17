import z from 'zod';
import { ZodValidationPipe } from 'nestjs-zod';

export const ZodParams = (schema: z.ZodTypeAny) =>
	new ZodValidationPipe(schema);
export const ZodQuery = (schema: z.ZodTypeAny) => new ZodValidationPipe(schema);
