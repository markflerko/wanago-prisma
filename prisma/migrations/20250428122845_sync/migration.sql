/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_data"."User" DROP CONSTRAINT "User_addressId_fkey";

-- DropTable
DROP TABLE "user_data"."Address";

-- DropTable
DROP TABLE "user_data"."User";

-- CreateTable
CREATE TABLE "user_data"."UserNew" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "addressId" INTEGER,

    CONSTRAINT "UserNew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_data"."AddressNew" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "AddressNew_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserNew_email_key" ON "user_data"."UserNew"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserNew_addressId_key" ON "user_data"."UserNew"("addressId");

-- CreateIndex
CREATE INDEX "UserNew_name_idx" ON "user_data"."UserNew" USING HASH ("name");

-- AddForeignKey
ALTER TABLE "user_data"."UserNew" ADD CONSTRAINT "UserNew_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "user_data"."AddressNew"("id") ON DELETE SET NULL ON UPDATE CASCADE;
