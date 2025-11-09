import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TracksController', () => {
	let controller: TracksController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TracksController],
			providers: [TracksService, PrismaService],
		}).compile();

		controller = module.get<TracksController>(TracksController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
