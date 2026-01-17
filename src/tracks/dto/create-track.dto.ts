import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// schema
export const CreateTrackSchema = z.object({
	name: z.string().min(1),
	country: z.string().min(1),
});

// auto DTO class
export class CreateTrackDto extends createZodDto(CreateTrackSchema) {}
