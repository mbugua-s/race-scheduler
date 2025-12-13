import {
	ConflictException,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class PrismaDuplicateException extends ConflictException {
	constructor(readonly prismaError: Prisma.PrismaClientKnownRequestError) {
		super(`Unique constraint failed`);
	}
}

export class PrismaNotFoundException extends NotFoundException {
	constructor(readonly prismaError: Prisma.PrismaClientKnownRequestError) {
		super(`Record not found`);
	}
}

export class PrismaForeignKeyException extends BadRequestException {
	constructor(readonly prismaError: Prisma.PrismaClientKnownRequestError) {
		super(`Foreign key constraint failed`);
	}
}
