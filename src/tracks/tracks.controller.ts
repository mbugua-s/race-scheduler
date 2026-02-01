import {
	Body,
	Controller,
	Get,
	Post,
	Param,
	Put,
	Delete,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { AppLogger } from 'src/common/logger/logger.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ZodParams } from 'src/common/validators/params';
import * as getTrackDto from './dto/get-track.dto';
import { Track } from '@prisma/client';

/**
 * Controller responsible for handling HTTP requests related to tracks.
 */
@Controller('tracks')
export class TracksController {
	/**
	 * Creates a new instance of TracksController.
	 *
	 * @param tracksService The service handling track domain operations.
	 * @param logger The application logger.
	 */
	constructor(
		private readonly tracksService: TracksService,
		private readonly logger: AppLogger,
	) {
		this.logger.setContext(TracksController.name);
	}

	/**
	 * Retrieves all tracks.
	 *
	 * @returns {Promise<Track[]>} A list of all tracks.
	 */
	@Get()
	async getAllTracks(): Promise<Track[]> {
		this.logger.log('Get all tracks request received');
		return await this.tracksService.getAllTracks();
	}

	/**
	 * Retrieves a specific track by its unique identifier.
	 *
	 * @param params Validated route parameters containing the track ID.
	 * @returns {Promise<Track>} The requested track.
	 */
	@Get(':trackId')
	async getTrackById(
		@Param(ZodParams(getTrackDto.GetTrackParamsSchema))
		params: getTrackDto.GetTrackParams,
	): Promise<Track> {
		this.logger.log(`Get track by ID: ${params.trackId} request received`);
		return await this.tracksService.getTrackById(params.trackId);
	}

	/**
	 * Creates a new track.
	 *
	 * @param track The DTO containing the properties required to create a track.
	 * @returns {Promise<Track>} The created track.
	 */
	@Post()
	async createTrack(@Body() track: CreateTrackDto): Promise<Track> {
		this.logger.log('Create track request received');
		return await this.tracksService.createTrack(track);
	}

	/**
	 * Updates an existing track identified by its unique identifier.
	 *
	 * @param params Validated route parameters containing the track ID.
	 * @param track The DTO containing fields to update on the existing track.
	 * @returns {Promise<Track>} The updated track.
	 */
	@Put(':trackId')
	async updateTrack(
		@Param(ZodParams(getTrackDto.GetTrackParamsSchema))
		params: getTrackDto.GetTrackParams,
		@Body() track: UpdateTrackDto,
	): Promise<Track> {
		this.logger.log(
			`Update track with ID: ${params.trackId} request received`,
		);
		return await this.tracksService.updateTrackById(params.trackId, track);
	}

	/**
	 * Deletes a specific track by its unique identifier.
	 *
	 * @param params Validated route parameters containing the track ID.
	 * @returns {Promise<Track>} The deleted track.
	 */
	@Delete(':trackId')
	async deleteTrackById(
		@Param(ZodParams(getTrackDto.GetTrackParamsSchema))
		params: getTrackDto.GetTrackParams,
	): Promise<Track> {
		this.logger.log(
			`Delete track with ID: ${params.trackId} request received`,
		);
		return await this.tracksService.deleteTrackById(params.trackId);
	}
}
