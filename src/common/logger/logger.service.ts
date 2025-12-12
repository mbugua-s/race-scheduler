import {
	Injectable,
	LoggerService,
	ConsoleLogger,
	Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger implements LoggerService {
	protected context = AppLogger.name;

	log(message: string, stackOrContext?: string) {
		super.log(message, stackOrContext);
	}
	warn(message: string, stackOrContext?: string) {
		super.warn(message, stackOrContext);
	}
	debug(message: string, stackOrContext?: string) {
		super.debug(message, stackOrContext);
	}
	error(message: string, stackOrContext?: string) {
		super.error(message, stackOrContext);
	}
	verbose(message: string, stackOrContext?: string) {
		super.verbose(message, stackOrContext);
	}
}
