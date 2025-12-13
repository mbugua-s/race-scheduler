import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { AppLogger } from 'src/common/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
	constructor(
		private prisma: PrismaService,
		private readonly logger: AppLogger,
	) {
		this.logger.setContext(TracksService.name);
	}

	async getTrackById(trackId: string): Promise<Track> {
		this.logger.log('Getting single track...');
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
