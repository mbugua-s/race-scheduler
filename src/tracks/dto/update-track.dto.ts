import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateTrackSchema = z.object({
	name: z.string().min(1),
	country: z.string().min(1),
});

export class UpdateTrackDto extends createZodDto(UpdateTrackSchema) {}
