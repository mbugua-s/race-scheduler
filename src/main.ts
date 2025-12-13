import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { AppLogger } from './common/logger/logger.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});
	app.useLogger(await app.resolve(AppLogger));
	app.useGlobalFilters(new PrismaExceptionFilter());
	await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line
bootstrap();
