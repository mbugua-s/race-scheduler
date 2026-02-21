import {
	Body,
	Controller,
	Get,
	Post,
	Param,
	Put,
	Delete,
} from '@nestjs/common';
import { AppLogger } from 'src/common/logger/logger.service';
import { ZodParams } from 'src/common/validators/params';
import { CarClassesService } from './car-classes.service';
import { CreateCarClassDto } from './dto/create-car-class.dto';
import { UpdateCarClassDto } from './dto/update-car-class.dto';
import * as getCarClassDto from './dto/get-car-class.dto';
import { CarClass } from '@prisma/client';

/**
 * Controller responsible for handling HTTP requests related to car classes.
 */
@Controller('car-classes')
export class CarClassesController {
	/**
	 * Creates a new instance of CarClassesController.
	 *
	 * @param carClassService The service handling car class domain operations.
	 * @param logger The application logger.
	 */
	constructor(
		private readonly carClassesService: CarClassesService,
		private readonly logger: AppLogger,
	) {}

	/**
	 * Retrieves all car classes.
	 *
	 * @returns {Promise<CarClass[]>} A list of all car classes.
	 */
	@Get()
	async getAllCarClasses(): Promise<CarClass[]> {
		this.logger.log('Get all car classes request received');
		return await this.carClassesService.getAllCarClasses();
	}

	/**
	 * Retrieves a specific car class by its unique identifier.
	 *
	 * @param params Validated route parameters containing the car class ID.
	 * @returns {Promise<CarClass>} The requested car class.
	 */
	@Get(':carClassId')
	async getCarClassById(
		@Param(ZodParams(getCarClassDto.GetCarClassParamsSchema))
		params: getCarClassDto.GetCarClassParams,
	): Promise<CarClass> {
		this.logger.log(
			`Get car class by ID: ${params.carClassId} request received`,
		);
		return await this.carClassesService.getCarClassById(params.carClassId);
	}

	/**
	 * Creates a new car class.
	 *
	 * @param carClass The DTO containing the properties required to create a car class.
	 * @returns {Promise<CarClass>} The created car class.
	 */
	@Post()
	async createCarClass(
		@Body() carClass: CreateCarClassDto,
	): Promise<CarClass> {
		this.logger.log('Create car class request received');
		return await this.carClassesService.createCarClass(carClass);
	}

	/**
	 * Updates an existing car class identified by its unique identifier.
	 *
	 * @param params Validated route parameters containing the car class ID.
	 * @param carClass The DTO containing fields to update on the existing car class.
	 * @returns {Promise<CarClass>} The updated car class.
	 */
	@Put(':carClassId')
	async updateCarClass(
		@Param(ZodParams(getCarClassDto.GetCarClassParamsSchema))
		params: getCarClassDto.GetCarClassParams,
		@Body() carClass: UpdateCarClassDto,
	): Promise<CarClass> {
		this.logger.log(
			`Update car class with ID: ${params.carClassId} request received`,
		);
		return await this.carClassesService.updateCarClassById(
			params.carClassId,
			carClass,
		);
	}

	/**
	 * Deletes a specific car class by its unique identifier.
	 *
	 * @param params Validated route parameters containing the car class ID.
	 * @returns {Promise<CarClass>} The deleted car class.
	 */
	@Delete(':carClassId')
	async deleteCarClassById(
		@Param(ZodParams(getCarClassDto.GetCarClassParamsSchema))
		params: getCarClassDto.GetCarClassParams,
	): Promise<CarClass> {
		this.logger.log(
			`Delete car class with ID: ${params.carClassId} request received`,
		);
		return await this.carClassesService.deleteCarClassById(
			params.carClassId,
		);
	}
}
