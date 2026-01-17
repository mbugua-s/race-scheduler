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

@Controller('tracks')
export class TracksController {
	constructor(
		private readonly tracksService: TracksService,
		private readonly logger: AppLogger,
	) {
		this.logger.setContext(TracksController.name);
	}

	@Get()
	async getAllTracks() {
		this.logger.log('Get all tracks request received');
		return await this.tracksService.getAllTracks();
	}

	@Get(':trackId')
	async getTrackById(
		@Param(ZodParams(getTrackDto.GetTrackParamsSchema))
		params: getTrackDto.GetTrackParams,
	) {
		this.logger.log(`Get track by ID: ${params.trackId} request received`);
		return await this.tracksService.getTrackById(params.trackId);
	}

	@Post()
	async createTrack(@Body() track: CreateTrackDto) {
		this.logger.log('Create track request received');
		return await this.tracksService.createTrack(track);
	}

	@Put(':trackId')
	async updateTrack(
		@Param(ZodParams(getTrackDto.GetTrackParamsSchema))
		params: getTrackDto.GetTrackParams,
		@Body() track: UpdateTrackDto,
	) {
		this.logger.log(
			`Update track with ID: ${params.trackId} request received`,
		);
		return await this.tracksService.updateTrackById(params.trackId, track);
	}

	@Delete(':trackId')
	async deleteTrackById(
		@Param(ZodParams(getTrackDto.GetTrackParamsSchema))
		params: getTrackDto.GetTrackParams,
	) {
		this.logger.log(
			`Delete track with ID: ${params.trackId} request received`,
		);
		return await this.tracksService.deleteTrackById(params.trackId);
	}
}
