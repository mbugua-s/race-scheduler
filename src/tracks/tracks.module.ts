import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingModule } from 'src/common/logger/logger.module';

@Module({
	controllers: [TracksController],
	providers: [TracksService, PrismaService],
	imports: [LoggingModule],
})
export class TracksModule {}
