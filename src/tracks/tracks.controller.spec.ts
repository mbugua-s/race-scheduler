import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { LoggingModule } from 'src/common/logger/logger.module';
import { AppLogger } from 'src/common/logger/logger.service';
import { expect, test, vi, describe, beforeEach } from 'vitest';

const loggerMock = {
	setContext: vi.fn(),
	log: vi.fn(),
	error: vi.fn(),
	warn: vi.fn(),
	debug: vi.fn(),
	verbose: vi.fn(),
};

describe('TracksController', () => {
	let controller: TracksController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TracksController],
			providers: [TracksService],
			imports: [LoggingModule],
		})
			.overrideProvider(AppLogger)
			.useValue(loggerMock)
			.overrideProvider(TracksService)
			.useValue({})
			.compile();

		controller = module.get<TracksController>(TracksController);
	});

	test('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
