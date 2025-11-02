-- CreateEnum
CREATE TYPE "QualifyingType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "SetupType" AS ENUM ('OPEN', 'FIXED');

-- CreateEnum
CREATE TYPE "TireWarmers" AS ENUM ('ON', 'OFF');

-- CreateEnum
CREATE TYPE "RaceLengthType" AS ENUM ('TIME', 'LAPS');

-- CreateTable
CREATE TABLE "CarClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CarClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "carClassId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackLayout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lengthKm" DOUBLE PRECISION,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "TrackLayout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceSchedule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "trackId" TEXT NOT NULL,
    "layoutId" TEXT,
    "minDriverRating" DOUBLE PRECISION,
    "minSafetyRating" DOUBLE PRECISION,
    "maxTyres" INTEGER,
    "minDrivers" INTEGER,
    "maxDrivers" INTEGER,
    "practiceLength" INTEGER,
    "qualifyingLength" INTEGER,
    "qualifyingType" "QualifyingType" NOT NULL DEFAULT 'PUBLIC',
    "setupType" "SetupType" NOT NULL DEFAULT 'OPEN',
    "tireWarmers" "TireWarmers" NOT NULL DEFAULT 'ON',
    "raceLength" INTEGER,
    "raceLengthType" "RaceLengthType" NOT NULL DEFAULT 'TIME',

    CONSTRAINT "RaceSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceClass" (
    "id" TEXT NOT NULL,
    "raceScheduleId" TEXT NOT NULL,
    "carClassId" TEXT NOT NULL,

    CONSTRAINT "RaceClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceClassCar" (
    "id" TEXT NOT NULL,
    "raceClassId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "allowed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RaceClassCar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarClass_name_key" ON "CarClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RaceClassCar_raceClassId_carId_key" ON "RaceClassCar"("raceClassId", "carId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carClassId_fkey" FOREIGN KEY ("carClassId") REFERENCES "CarClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackLayout" ADD CONSTRAINT "TrackLayout_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceSchedule" ADD CONSTRAINT "RaceSchedule_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceSchedule" ADD CONSTRAINT "RaceSchedule_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "TrackLayout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceClass" ADD CONSTRAINT "RaceClass_raceScheduleId_fkey" FOREIGN KEY ("raceScheduleId") REFERENCES "RaceSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceClass" ADD CONSTRAINT "RaceClass_carClassId_fkey" FOREIGN KEY ("carClassId") REFERENCES "CarClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceClassCar" ADD CONSTRAINT "RaceClassCar_raceClassId_fkey" FOREIGN KEY ("raceClassId") REFERENCES "RaceClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceClassCar" ADD CONSTRAINT "RaceClassCar_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
