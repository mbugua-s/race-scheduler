import { Test, TestingModule } from '@nestjs/testing';
import { CarClassesService } from './car-classes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppLogger } from 'src/common/logger/logger.service';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import { LoggingModule } from 'src/common/logger/logger.module';
import { mockPrisma, mockCarClass } from 'src/common/mocks/prisma';
import { mockLogger } from 'src/common/mocks/logger';

describe('CarClassesService', () => {
	let service: CarClassesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CarClassesService,
				{ provide: PrismaService, useValue: mockPrisma },
			],
			imports: [LoggingModule],
		})
			.overrideProvider(AppLogger)
			.useValue(mockLogger)
			.compile();

		service = module.get<CarClassesService>(CarClassesService);

		vi.clearAllMocks();
	});

	test('gets car class by ID', async () => {
		const result = await service.getCarClassById(mockCarClass.id);
		expect(result).toEqual(mockCarClass);
	});

	test('gets all car classes', async () => {
		const result = await service.getAllCarClasses();
		expect(result).toEqual([mockCarClass]);
	});

	test('creates a car class', async () => {
		const result = await service.createCarClass(mockCarClass);
		expect(result).toEqual(mockCarClass);
	});

	test('updates a car class', async () => {
		const result = await service.updateCarClassById(
			mockCarClass.id,
			mockCarClass,
		);
		expect(result).toEqual(mockCarClass);
	});

	test('deletes a car class', async () => {
		const result = await service.deleteCarClassById(mockCarClass.id);
		expect(result).toEqual(mockCarClass);
	});
});
