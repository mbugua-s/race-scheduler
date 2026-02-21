import { Test, TestingModule } from '@nestjs/testing';
import { CarClassesController } from './car-classes.controller';
import { CarClassesService } from './car-classes.service';
import { LoggingModule } from 'src/common/logger/logger.module';
import { AppLogger } from 'src/common/logger/logger.service';
import { expect, test, describe, beforeEach } from 'vitest';
import { mockLogger } from 'src/common/mocks/logger';

describe('CarClassesController', () => {
	let controller: CarClassesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CarClassesController],
			providers: [CarClassesService],
			imports: [LoggingModule],
		})
			.overrideProvider(AppLogger)
			.useValue(mockLogger)
			.overrideProvider(CarClassesService)
			.useValue({})
			.compile();

		controller = module.get<CarClassesController>(CarClassesController);
	});

	test('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
