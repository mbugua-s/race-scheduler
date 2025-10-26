import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from './config/env.schema';
import { PrismaService } from './prisma/prisma.service';
// import { PrismaModule } from './prisma/prisma.module';

// 1. Determine the environment
const env = process.env.NODE_ENV || 'production';

// 2. Build the array containing ONLY the specific environment file
const envFilePaths = [
	`.env.${env}`, // e.g., .env.development or .env.production
];

// Optional: Log the file path for debugging
console.log(`Loading config from: ${envFilePaths[0]}`);

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,

			// Pass the array with only the specific file path
			envFilePath: envFilePaths,

			// Optional: Set 'ignoreEnvFile' to 'false' (default) to ensure it uses the file.
			// Setting 'ignoreEnvFile: true' would ignore the file and only use process.env.

			// Important: Your Zod validation (next step) handles "always set" check
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
