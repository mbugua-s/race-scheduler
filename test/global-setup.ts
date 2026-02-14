import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';

export default async function () {
	const container = await new PostgreSqlContainer('postgres:15-alpine')
		.withDatabase('test_db')
		.withUsername('test')
		.withPassword('test')
		.withStartupTimeout(120_000)
		.start();

	const databaseUrl = container.getConnectionUri();

	// Expose for tests
	process.env.DATABASE_URL = databaseUrl;

	// Run migrations
	execSync('npx prisma migrate deploy', {
		env: {
			...process.env,
			DATABASE_URL: databaseUrl,
		},
		stdio: 'inherit',
	});

	return async () => {
		await container.stop();
	};
}
