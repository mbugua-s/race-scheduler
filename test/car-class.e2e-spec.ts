import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CarClass } from '@prisma/client';

describe('CarClasses', () => {
	let app: NestExpressApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication<NestExpressApplication>();
		prisma = app.get(PrismaService);

		await app.init();
	}, 120000);

	beforeEach(async () => {
		await prisma.cleanDatabase();

		// Add two car classes for tests
		await prisma.carClass.create({
			data: {
				name: 'Test Car Class 1',
				description: 'Test Car Class Description 1',
			},
		});

		await prisma.carClass.create({
			data: {
				name: 'Test Car Class 2',
				description: 'Test Car Class Description 2',
			},
		});
	});

	afterAll(async () => {
		await app.close();
	});

	const fetchCarClass = async (): Promise<CarClass> => {
		const all: CarClass[] = await prisma.carClass.findMany();
		return all[0];
	};

	it('GET /car-classes', async () => {
		const res = await request(app.getHttpServer())
			.get('/car-classes')
			.expect(200);

		const carClasses = res.body as CarClass[];
		expect(carClasses).toBeDefined();
		expect(carClasses.length).toBeGreaterThanOrEqual(2);
	});

	it('GET /car-classes/:id', async () => {
		const carClass = await fetchCarClass();

		const res = await request(app.getHttpServer())
			.get(`/car-classes/${carClass.id}`)
			.expect(200);

		const result = res.body as CarClass;
		expect(result).toBeDefined();
		expect(result.id).toBe(carClass.id);
	});

	it('POST /car-classes', async () => {
		const res = await request(app.getHttpServer())
			.post('/car-classes')
			.send({
				name: 'LMP2',
				description: 'Le Mans Prototype 2',
			})
			.expect(201);

		const carClass = res.body as CarClass;
		expect(carClass.name).toBe('LMP2');
	});

	it('PUT /car-classes/:id', async () => {
		const carClass = await fetchCarClass();

		const res = await request(app.getHttpServer())
			.put(`/car-classes/${carClass.id}`)
			.send({
				name: 'Updated Class',
				description: 'Updated Description',
			})
			.expect(200);

		const result = res.body as CarClass;
		expect(result.name).toBe('Updated Class');
	});

	it('DELETE /car-classes/:id', async () => {
		const carClass = await fetchCarClass();

		const res = await request(app.getHttpServer())
			.delete(`/car-classes/${carClass.id}`)
			.expect(200);

		const result = res.body as CarClass;
		expect(result.name).toBeDefined();
	});
});
