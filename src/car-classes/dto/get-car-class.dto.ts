import { z } from 'zod';

export const GetCarClassParamsSchema = z.object({
	carClassId: z.uuid(),
});

export type GetCarClassParams = z.infer<typeof GetCarClassParamsSchema>;
