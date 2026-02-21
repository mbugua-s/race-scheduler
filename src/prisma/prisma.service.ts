import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Env } from '../common/config/env.schema';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	// Use the Zod-inferred Env type for your config
	constructor(private readonly configService: ConfigService<Env>) {
		// 1. Access the validated and typed DATABASE_URL from the constructor parameter
		const databaseUrl = configService.get('DATABASE_URL', {
			infer: true,
		});

		// 2. Pass the URL programmatically to the PrismaClient constructor
		super({
			datasources: {
				db: {
					url: databaseUrl, // <-- The validated URL is set here
				},
			},
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async cleanDatabase() {
		await this.track.deleteMany();
		await this.car.deleteMany();
		await this.carClass.deleteMany();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
