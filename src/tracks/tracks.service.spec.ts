import { Test, TestingModule } from '@nestjs/testing';
import { TracksService } from './tracks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppLogger } from 'src/common/logger/logger.service';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import { LoggingModule } from 'src/common/logger/logger.module';

describe('TracksService', () => {
	let service: TracksService;
	let prisma: PrismaService;

	const fakeTrack = {
		id: 'test-id',
		name: 'Test Track',
		country: 'Country',
	};

	const prismaMock = {
		track: {
			findFirstOrThrow: vi.fn(() => fakeTrack),
		},
	};

	const loggerMock = {
		setContext: vi.fn(),
		log: vi.fn(),
		error: vi.fn(),
		warn: vi.fn(),
		debug: vi.fn(),
		verbose: vi.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TracksService,
				{ provide: PrismaService, useValue: prismaMock },
			],
			imports: [LoggingModule],
		})
			.overrideProvider(AppLogger)
			.useValue(loggerMock)
			.compile();

		service = module.get<TracksService>(TracksService);
		prisma = module.get<PrismaService>(PrismaService);

		// clear mocks before each test
		vi.clearAllMocks();
	});

	test('gets track by ID', async () => {
		const findSpy = vi.spyOn(prisma.track, 'findFirstOrThrow');

		const result = await service.getTrackById(fakeTrack.id);

		expect(result).toEqual(fakeTrack);
		expect(findSpy).toHaveBeenCalledWith({
			where: { id: fakeTrack.id },
		});
	});
});
