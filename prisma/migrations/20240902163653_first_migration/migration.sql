-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PRESIDENT', 'ATHLETE', 'COUCH', 'REFEREE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "photo" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "licenseId" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "presidentId" TEXT NOT NULL,

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license" (
    "id" TEXT NOT NULL,
    "no" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,

    CONSTRAINT "license_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "user_licenseId_key" ON "user"("licenseId");

-- CreateIndex
CREATE UNIQUE INDEX "club_presidentId_key" ON "club"("presidentId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "license"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club" ADD CONSTRAINT "club_presidentId_fkey" FOREIGN KEY ("presidentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
