import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateTrackSchema = z.object({
	name: z.string().min(1),
	country: z.string().min(1),
});

export class CreateTrackDto extends createZodDto(CreateTrackSchema) {}
