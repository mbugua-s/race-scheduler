import {
	Body,
	Controller,
	Get,
	Post,
	Logger,
	Param,
	Put,
	Delete,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import type { Track } from '@prisma/client';

@Controller('tracks')
export class TracksController {
	private readonly logger = new Logger(TracksController.name);
	constructor(private readonly tracksService: TracksService) {}

	@Get()
	async getAllTracks() {
		this.logger.log('Get all tracks request received');
		return await this.tracksService.getAllTracks();
	}

	@Get(':trackId')
	async getTrackById(@Param('trackId') trackId: string) {
		this.logger.log(`Get track by ID: ${trackId} request received`);
		return await this.tracksService.getTrackById(trackId);
	}

	@Post()
	async createTrack(@Body() track: Track) {
		this.logger.log('Create track request received');
		return await this.tracksService.createTrack(track);
	}

	@Put(':trackId')
	async updateTrack(@Param('trackId') trackId: string, @Body() track: Track) {
		this.logger.log(`Update track with ID: ${trackId} request received`);
		return await this.tracksService.updateTrackById(trackId, track);
	}

	@Delete(':trackId')
	async deleteTrackById(@Param('trackId') trackId: string) {
		this.logger.log(`Delete track with ID: ${trackId} request received`);
		return await this.tracksService.deleteTrackById(trackId);
	}
}
