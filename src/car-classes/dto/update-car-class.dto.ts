import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateCarClassSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
});

export class UpdateCarClassDto extends createZodDto(UpdateCarClassSchema) {}
