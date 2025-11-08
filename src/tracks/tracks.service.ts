import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { Track } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
	private readonly logger = new Logger(TracksService.name);

	constructor(private prisma: PrismaService) {}

	async getTrackById(trackId: string): Promise<Track> {
		try {
			this.logger.log('Getting track by ID...');
			const query = {
				where: {
					id: trackId,
				},
			};
			return await this.prisma.track.findFirstOrThrow(query);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				this.logger.error(error.message);
				throw new NotFoundException();
			} else if (error instanceof Error) {
				this.logger.error(error.message);
			} else {
				this.logger.error('Error getting track by ID');
			}
			throw new InternalServerErrorException();
		}
	}

	async getAllTracks(): Promise<Track[]> {
		try {
			this.logger.log('Getting all tracks...');
			return await this.prisma.track.findMany();
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(error.message);
			} else {
				this.logger.error('Error getting all tracks');
			}
			throw new InternalServerErrorException();
		}
	}

	async createTrack(track: Track): Promise<Track> {
		this.logger.log('Creating single track...');
		try {
			const query = { data: track };
			return await this.prisma.track.create(query);
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(error.message);
			} else {
				this.logger.error('Error creating a track');
			}
			throw new InternalServerErrorException();
		}
	}

	async updateTrackById(trackId: string, track: Track): Promise<Track> {
		this.logger.log('Updating track...');
		try {
			const query = {
				where: {
					id: trackId,
				},
				data: track,
			};
			return await this.prisma.track.update(query);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				this.logger.error(error.message);
				throw new NotFoundException();
			} else if (error instanceof Error) {
				this.logger.error(error.message);
			} else {
				this.logger.error('Error updating track by ID');
			}
			throw new InternalServerErrorException();
		}
	}

	async deleteTrackById(trackId: string): Promise<Track> {
		this.logger.log('Deleting track...');
		try {
			const query = {
				where: {
					id: trackId,
				},
			};
			return await this.prisma.track.delete(query);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				this.logger.error(error.message);
				throw new NotFoundException();
			} else if (error instanceof Error) {
				this.logger.error(error.message);
			} else {
				this.logger.error('Error deleting track by ID');
			}
			throw new InternalServerErrorException();
		}
	}
}
