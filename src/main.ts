import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new ConsoleLogger({
			json: true,
			colors: true,
		}),
	});
	app.useGlobalFilters(new PrismaExceptionFilter());
	await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line
bootstrap();
