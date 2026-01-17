import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// schema
export const UpdateTrackSchema = z.object({
	name: z.string().min(1),
	country: z.string().min(1),
});

// auto DTO class
export class UpdateTrackDto extends createZodDto(UpdateTrackSchema) {}
