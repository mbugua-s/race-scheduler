import { Prisma } from 'generated/prisma/client';
import { vi } from 'vitest';

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
	carClass: {
		findFirstOrThrow: vi.fn(
			(carClassId: Prisma.CarClassFindFirstOrThrowArgs) => mockCarClass,
		),
		findMany: vi.fn(() => [mockCarClass]),
		create: vi.fn(
			({ data: carClass }: Prisma.CarClassCreateArgs): object => carClass,
		),
		update: vi.fn(
			({
				where: { id: carClassId },
				data: carClass,
			}: Prisma.CarClassUpdateArgs): object => carClass,
		),
		delete: vi.fn((carClassId: Prisma.CarClassDeleteArgs) => mockCarClass),
	},
	car: {
		deleteMany: vi.fn((query: Prisma.CarDeleteManyArgs) => {
			return;
		}),
	},
};

export const mockTrack = {
	id: 'test-id',
	name: 'Test Track',
	country: 'Country',
};

export const mockCarClass = {
	id: 'test-id',
	name: 'Test Car Class',
	description: 'Test Description',
};
