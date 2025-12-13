import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
	PrismaDuplicateException,
	PrismaNotFoundException,
	PrismaForeignKeyException,
} from '../exceptions/prisma-exceptions';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(PrismaExceptionFilter.name);
	catch(
		exception: Prisma.PrismaClientKnownRequestError,
		host: ArgumentsHost,
	) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		let nestException: PrismaDuplicateException;

		switch (exception.code) {
			case 'P2002':
				nestException = new PrismaDuplicateException(exception);
				break;
			case 'P2025':
				nestException = new PrismaNotFoundException(exception);
				break;
			case 'P2003':
				nestException = new PrismaForeignKeyException(exception);
				break;
			default:
				// fallback generic error
				nestException = new PrismaNotFoundException(exception);
				break;
		}

		this.logger.error(nestException.prismaError.message);

		// Now delegate to Nest's built-in exception response handler
		const status =
			(nestException.getStatus && nestException.getStatus()) || 500;
		const responseBody = nestException.getResponse
			? nestException.getResponse()
			: { message: nestException.message };

		response.status(status).json(responseBody);
	}
}
