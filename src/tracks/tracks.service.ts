import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { AppLogger } from 'src/common/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

/**
 * Service responsible for managing track domain operations.
 */
@Injectable()
export class TracksService {
	/**
	 * Creates a new instance of TracksService.
	 *
	 * @param prisma Prisma service used to interact with the database.
	 * @param logger Application logger used for contextual logging.
	 */
	constructor(
		private prisma: PrismaService,
		private readonly logger: AppLogger,
	) {
		this.logger.setContext(TracksService.name);
	}

	/**
	 * Retrieves a single track by its unique identifier.
	 *
	 * @param trackId The unique identifier of the track.
	 * @returns {Promise<Track>} The track that matches the provided identifier.
	 */
	async getTrackById(trackId: string): Promise<Track> {
		this.logger.log('Getting single track...');
		const query = {
			where: {
				id: trackId,
			},
		};
		return await this.prisma.track.findFirstOrThrow(query);
	}

	/**
	 * Retrieves all tracks.
	 *
	 * @returns {Promise<Track[]>} A list of all tracks in the data store.
	 */
	async getAllTracks(): Promise<Track[]> {
		this.logger.log('Getting all tracks...');
		return await this.prisma.track.findMany();
	}

	/**
	 * Creates a new track.
	 *
	 * @param track The DTO containing the data required to create a track.
	 * @returns {Promise<Track>} The newly created track.
	 */
	async createTrack(track: CreateTrackDto): Promise<Track> {
		this.logger.log('Creating single track...');
		const query = { data: track };
		return await this.prisma.track.create(query);
	}

	/**
	 * Updates an existing track by its unique identifier.
	 *
	 * @param trackId The unique identifier of the track to update.
	 * @param track The DTO containing the fields to update.
	 * @returns {Promise<Track>} The updated track.
	 */
	async updateTrackById(
		trackId: string,
		track: UpdateTrackDto,
	): Promise<Track> {
		this.logger.log('Updating track...');
		const query = {
			where: {
				id: trackId,
			},
			data: track,
		};
		return await this.prisma.track.update(query);
	}

	/**
	 * Deletes a track by its unique identifier.
	 *
	 * @param trackId The unique identifier of the track to delete.
	 * @returns {Promise<Track>} The deleted track.
	 */
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
