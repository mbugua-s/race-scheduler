import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	console.log('Starting seed...');

	// Wipe tables in correct order (FK safe)
	await prisma.raceClassCar.deleteMany();
	await prisma.raceClass.deleteMany();
	await prisma.raceSchedule.deleteMany();
	await prisma.trackLayout.deleteMany();
	await prisma.track.deleteMany();
	await prisma.car.deleteMany();
	await prisma.carClass.deleteMany();

	// -----------------------------
	// CarClasses
	// -----------------------------
	const carClasses = await prisma.$transaction([
		prisma.carClass.create({
			data: { name: 'GT3', description: 'GT3 racing class' },
		}),
		prisma.carClass.create({
			data: { name: 'GT4', description: 'GT4 racing class' },
		}),
		prisma.carClass.create({
			data: { name: 'LMP2', description: 'Prototype racing class' },
		}),
	]);

	// -----------------------------
	// Cars
	// -----------------------------
	const cars = await prisma.$transaction([
		// GT3
		prisma.car.create({
			data: {
				name: 'Porsche 911 GT3 R',
				manufacturer: 'Porsche',
				carClassId: carClasses[0].id,
			},
		}),
		prisma.car.create({
			data: {
				name: 'Ferrari 296 GT3',
				manufacturer: 'Ferrari',
				carClassId: carClasses[0].id,
			},
		}),
		prisma.car.create({
			data: {
				name: 'Mercedes AMG GT3',
				manufacturer: 'Mercedes',
				carClassId: carClasses[0].id,
			},
		}),

		// GT4
		prisma.car.create({
			data: {
				name: 'BMW M4 GT4',
				manufacturer: 'BMW',
				carClassId: carClasses[1].id,
			},
		}),
		prisma.car.create({
			data: {
				name: 'Aston Martin Vantage GT4',
				manufacturer: 'Aston Martin',
				carClassId: carClasses[1].id,
			},
		}),

		// LMP2
		prisma.car.create({
			data: {
				name: 'Oreca 07',
				manufacturer: 'Oreca',
				carClassId: carClasses[2].id,
			},
		}),
	]);

	// -----------------------------
	// Tracks & Layouts
	// -----------------------------
	const track = await prisma.track.create({
		data: {
			name: 'Spa-Francorchamps',
			country: 'Belgium',
			layouts: {
				create: [
					{ name: 'Grand Prix', lengthKm: 7.004 },
					{ name: 'Short', lengthKm: 3.0 },
				],
			},
		},
		include: { layouts: true },
	});

	const layout = track.layouts[0]; // GP layout

	// -----------------------------
	// Race Schedule
	// -----------------------------
	const raceSchedule = await prisma.raceSchedule.create({
		data: {
			name: 'Spa 6 Hours',
			date: new Date('2025-08-03T14:00:00Z'),
			description: 'Endurance multiclass race',
			minDriverRating: 2.5,
			minSafetyRating: 3.0,
			raceLength: 360,
			raceLengthType: 'TIME',
			practiceLength: 60,
			qualifyingLength: 30,
			qualifyingType: 'PUBLIC',
			setupType: 'OPEN',
			tireWarmers: 'ON',
			trackId: track.id,
			layoutId: layout.id,
		},
	});

	// -----------------------------
	// Race Classes (GT3 + LMP2 only)
	// -----------------------------
	const raceClasses = await prisma.$transaction([
		prisma.raceClass.create({
			data: {
				raceScheduleId: raceSchedule.id,
				carClassId: carClasses[0].id,
			},
		}),
		prisma.raceClass.create({
			data: {
				raceScheduleId: raceSchedule.id,
				carClassId: carClasses[2].id,
			},
		}),
	]);

	// -----------------------------
	// Allowed Cars
	// -----------------------------
	for (const rc of raceClasses) {
		const eligibleCars = cars.filter((c) => c.carClassId === rc.carClassId);

		await prisma.$transaction(
			eligibleCars.map((car) =>
				prisma.raceClassCar.create({
					data: {
						raceClassId: rc.id,
						carId: car.id,
						allowed: true,
					},
				}),
			),
		);
	}

	console.log('Seed complete!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
