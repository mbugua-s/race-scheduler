import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from './config/env.schema';
import { PrismaService } from './prisma/prisma.service';
import { config as dotenvConfig } from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = process.env.NODE_ENV || 'production';
const envFilePaths = [
	`.env.${env}`, // e.g., .env.development or .env.production
];

console.log(`Loading config from: ${envFilePaths[0]}`);
dotenvExpand.expand(dotenvConfig({ path: envFilePaths[0] }));

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: envFilePaths,

			validate: (config) => {
				const parsed = EnvSchema.safeParse(config);
				if (!parsed.success) {
					console.error(
						'Invalid environment variables:',
						parsed.error.issues,
					);
					throw new Error(
						'Invalid environment variables. Check console for details.',
					);
				}
				return parsed.data;
			},
		}),
		// ...other modules
	],
	// PrismaModule,
	controllers: [AppController],
	providers: [AppService, PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
