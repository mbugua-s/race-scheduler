import { z } from 'zod';

export const GetTrackParamsSchema = z.object({
	trackId: z.uuid(),
});

export type GetTrackParams = z.infer<typeof GetTrackParamsSchema>;
