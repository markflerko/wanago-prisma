/*
  Warnings:

  - Added the required column `createdAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledDate` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP NOT NULL,
ADD COLUMN     "createdAtDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdAtTime" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "scheduledDate" TIMESTAMPTZ NOT NULL;
