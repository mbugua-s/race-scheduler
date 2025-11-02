import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
	constructor(private prisma: PrismaService) {}
	async getAllTracks(): Promise<Track[]> {
		return await this.prisma.track.findMany();
	}
}
