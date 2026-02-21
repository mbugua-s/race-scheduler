import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateCarClassSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
});

export class CreateCarClassDto extends createZodDto(CreateCarClassSchema) {}
