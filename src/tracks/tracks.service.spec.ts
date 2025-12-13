import { Test, TestingModule } from '@nestjs/testing';
import { TracksService } from './tracks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppLogger } from 'src/common/logger/logger.service';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import { LoggingModule } from 'src/common/logger/logger.module';
import { mockPrisma, mockTrack } from 'src/common/mocks/prisma';
import { mockLogger } from 'src/common/mocks/logger';

describe('TracksService', () => {
	let service: TracksService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TracksService,
				{ provide: PrismaService, useValue: mockPrisma },
			],
			imports: [LoggingModule],
		})
			.overrideProvider(AppLogger)
			.useValue(mockLogger)
			.compile();

		service = module.get<TracksService>(TracksService);

		vi.clearAllMocks();
	});

	test('gets track by ID', async () => {
		const result = await service.getTrackById(mockTrack.id);
		expect(result).toEqual(mockTrack);
	});

	test('gets all tracks', async () => {
		const result = await service.getAllTracks();
		expect(result).toEqual([mockTrack]);
	});

	test('creates a track', async () => {
		const result = await service.createTrack(mockTrack);
		expect(result).toEqual(mockTrack);
	});

	test('updates a track', async () => {
		const result = await service.updateTrackById(mockTrack.id, mockTrack);
		expect(result).toEqual(mockTrack);
	});

	test('deletes a track', async () => {
		const result = await service.deleteTrackById(mockTrack.id);
		expect(result).toEqual(mockTrack);
	});
});
