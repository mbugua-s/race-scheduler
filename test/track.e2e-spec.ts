import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Track } from '@prisma/client';

describe('Tracks', () => {
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
	});

	afterAll(async () => {
		await app.close();
	});

	it('GET /tracks', async () => {
		const res = await request(app.getHttpServer())
			.get('/tracks')
			.expect(200);

		const tracks = res.body as Track[];
		expect(tracks).toBeDefined();
	});

	it('POST /tracks', async () => {
		const res = await request(app.getHttpServer())
			.post('/tracks')
			.send({ name: 'Monza', country: 'Italy' })
			.expect(201);

		const track = res.body as Track;
		expect(track).toBeDefined();
		expect(track.name).toBe('Monza'); // Now properly typed!
	});
});
