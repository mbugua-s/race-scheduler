import { Module } from '@nestjs/common';
import { CarClassesService } from './car-classes.service';
import { CarClassesController } from './car-classes.controller';
import { LoggingModule } from 'src/common/logger/logger.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	imports: [LoggingModule],
	controllers: [CarClassesController],
	providers: [CarClassesService, PrismaService],
})
export class CarClassesModule {}
