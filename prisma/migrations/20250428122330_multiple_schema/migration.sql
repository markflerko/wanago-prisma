/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user_data";


-- CreateTable
CREATE TABLE "user_data"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "addressId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_data"."Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user_data"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_addressId_key" ON "user_data"."User"("addressId");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "user_data"."User" USING HASH ("name");

-- AddForeignKey
ALTER TABLE "user_data"."User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "user_data"."Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
