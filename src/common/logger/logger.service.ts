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
		if (stackOrContext) {
			super.log(message, stackOrContext);
		} else {
			super.log(message);
		}
	}
	warn(message: string, stackOrContext?: string) {
		if (stackOrContext) {
			super.warn(message, stackOrContext);
		} else {
			super.warn(message);
		}
	}
	debug(message: string, stackOrContext?: string) {
		if (stackOrContext) {
			super.debug(message, stackOrContext);
		} else {
			super.debug(message);
		}
	}
	error(message: string, stackOrContext?: string) {
		if (stackOrContext) {
			super.error(message, stackOrContext);
		} else {
			super.error(message);
		}
	}
	verbose(message: string, stackOrContext?: string) {
		if (stackOrContext) {
			super.verbose(message, stackOrContext);
		} else {
			super.verbose(message);
		}
	}
}
