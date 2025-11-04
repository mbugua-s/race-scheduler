import { Body, Controller, Get, Post } from '@nestjs/common';
import { TracksService } from './tracks.service';
import type { Track } from '@prisma/client';

@Controller('tracks')
export class TracksController {
	constructor(private readonly tracksService: TracksService) {}

	@Get()
	async getAllTracks() {
		return await this.tracksService.getAllTracks();
	}

	@Post('track')
	async createTrack(@Body() track: Track) {
		return await this.tracksService.createTrack(track);
	}
}
