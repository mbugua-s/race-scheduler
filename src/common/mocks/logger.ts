import { vi } from 'vitest';

export const mockLogger = {
	setContext: vi.fn(),
	log: vi.fn(),
	error: vi.fn(),
	warn: vi.fn(),
	debug: vi.fn(),
	verbose: vi.fn(),
};
