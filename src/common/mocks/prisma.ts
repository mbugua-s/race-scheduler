import { Prisma } from 'generated/prisma/client';
import { vi } from 'vitest';

export const mockTrack = {
	id: 'test-id',
	name: 'Test Track',
	country: 'Country',
};

export const mockPrisma = {
	track: {
		findFirstOrThrow: vi.fn(
			(trackId: Prisma.TrackFindFirstOrThrowArgs) => mockTrack,
		),
		findMany: vi.fn(() => [mockTrack]),
		create: vi.fn(
			({ data: track }: Prisma.TrackCreateArgs): object => track,
		),
		update: vi.fn(
			({
				where: { id: trackId },
				data: track,
			}: Prisma.TrackUpdateArgs): object => track,
		),
		delete: vi.fn((trackId: Prisma.TrackDeleteArgs) => mockTrack),
	},
};
