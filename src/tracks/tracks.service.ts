import { Injectable, Logger } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
	private readonly logger = new Logger(TracksService.name);

	constructor(private prisma: PrismaService) {}

	async getTrackById(trackId: string): Promise<Track> {
		const query = {
			where: {
				id: trackId,
			},
		};
		return await this.prisma.track.findFirstOrThrow(query);
	}

	async getAllTracks(): Promise<Track[]> {
		this.logger.log('Getting all tracks...');
		return await this.prisma.track.findMany();
	}

	async createTrack(track: Track): Promise<Track> {
		this.logger.log('Creating single track...');
		const query = { data: track };
		return await this.prisma.track.create(query);
	}

	async updateTrackById(trackId: string, track: Track): Promise<Track> {
		this.logger.log('Updating track...');
		const query = {
			where: {
				id: trackId,
			},
			data: track,
		};
		return await this.prisma.track.update(query);
	}

	async deleteTrackById(trackId: string): Promise<Track> {
		this.logger.log('Deleting track...');
		const query = {
			where: {
				id: trackId,
			},
		};
		return await this.prisma.track.delete(query);
	}
}
