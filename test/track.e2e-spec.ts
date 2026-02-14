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

		// Add two tracks for the tests
		await prisma.track.create({
			data: {
				name: 'Test Track 1',
				country: 'Test Country 1',
			},
		});

		await prisma.track.create({
			data: {
				name: 'Test Track 2',
				country: 'Test Country 2',
			},
		});
	});

	afterAll(async () => {
		await app.close();
	});

	const fetchTrack = async (): Promise<Track> => {
		const allTracks: Track[] = await prisma.track.findMany();
		return allTracks[0];
	};

	it('GET /tracks', async () => {
		const res = await request(app.getHttpServer())
			.get('/tracks')
			.expect(200);

		const tracks = res.body as Track[];
		expect(tracks).toBeDefined();
	});

	it('GET /track/:id', async () => {
		const track = await fetchTrack();
		const res = await request(app.getHttpServer())
			.get(`/tracks/${track.id}`)
			.expect(200);

		const result = res.body as Track;
		expect(result).toBeDefined();
	});

	it('POST /tracks', async () => {
		const res = await request(app.getHttpServer())
			.post('/tracks')
			.send({ name: 'Monza', country: 'Italy' })
			.expect(201);

		const track = res.body as Track;
		expect(track.name).toBe('Monza');
	});

	it('PUT /tracks', async () => {
		const track = await fetchTrack();
		const res = await request(app.getHttpServer())
			.put(`/tracks/${track.id}`)
			.send({ name: 'Monza', country: 'Italy' })
			.expect(200);

		const result = res.body as Track;
		expect(result.name).toBe('Monza');
	});

	it('DELETE /tracks', async () => {
		const track = await fetchTrack();
		const res = await request(app.getHttpServer())
			.delete(`/tracks/${track.id}`)
			.expect(200);

		const result = res.body as Track;
		expect(result.name).toBeDefined();
	});
});
