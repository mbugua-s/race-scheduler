import { Injectable } from '@nestjs/common';
import { CarClass } from '@prisma/client';
import { AppLogger } from 'src/common/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarClassDto } from './dto/create-car-class.dto';
import { UpdateCarClassDto } from './dto/update-car-class.dto';

/**
 * Service responsible for managing car-class domain operations.
 */
@Injectable()
export class CarClassesService {
	/**
	 * Creates a new instance of CarClassesService.
	 *
	 * @param prisma Prisma service used to interact with the database.
	 * @param logger Application logger used for contextual logging.
	 */
	constructor(
		private prisma: PrismaService,
		private readonly logger: AppLogger,
	) {
		this.logger.setContext(CarClassesService.name);
	}

	/**
	 * Retrieves a single car class by its unique identifier.
	 *
	 * @param carClassId The unique identifier of the car class.
	 * @returns {Promise<CarClass>} The car class that matches the provided identifier.
	 */
	async getCarClassById(carClassId: string): Promise<CarClass> {
		this.logger.log('Getting single car class...');
		const query = {
			where: {
				id: carClassId,
			},
		};
		return await this.prisma.carClass.findFirstOrThrow(query);
	}

	/**
	 * Retrieves all car classes.
	 *
	 * @returns {Promise<CarClass[]>} A list of all car classes in the data store.
	 */
	async getAllCarClasses(): Promise<CarClass[]> {
		this.logger.log('Getting all car classes...');
		return await this.prisma.carClass.findMany();
	}

	/**
	 * Creates a new car class.
	 *
	 * @param carClass The DTO containing the data required to create a car class.
	 * @returns {Promise<CarClass>} The newly created car class.
	 */
	async createCarClass(carClass: CreateCarClassDto): Promise<CarClass> {
		this.logger.log('Creating single car class...');
		const query = { data: carClass };
		return await this.prisma.carClass.create(query);
	}

	/**
	 * Updates an existing car class by its unique identifier.
	 *
	 * @param carClassId The unique identifier of the car class to update.
	 * @param carClass The DTO containing the fields to update.
	 * @returns {Promise<CarClass>} The updated car class.
	 */
	async updateCarClassById(
		carClassId: string,
		carClass: UpdateCarClassDto,
	): Promise<CarClass> {
		this.logger.log('Updating car class...');
		const query = {
			where: {
				id: carClassId,
			},
			data: carClass,
		};
		return await this.prisma.carClass.update(query);
	}

	/**
	 * Deletes a car class by its unique identifier.
	 *
	 * @param carClassId The unique identifier of the car class to delete.
	 * @returns {Promise<CarClass>} The deleted car class.
	 */
	async deleteCarClassById(carClassId: string): Promise<CarClass> {
		// First, delete all cars that belong to this car class
		// Perhaps this should be delegated to the future CarsService
		// that currently doesn't exist
		this.logger.log('Deleting cars that belong to this car class...');
		const deleteCarsQuery = {
			where: {
				carClassId,
			},
		};
		await this.prisma.car.deleteMany(deleteCarsQuery);
		this.logger.log('Deleting car class...');
		const query = {
			where: {
				id: carClassId,
			},
		};
		return await this.prisma.carClass.delete(query);
	}
}
