/*
  Warnings:

  - You are about to drop the `AddressNew` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserNew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserNew" DROP CONSTRAINT "UserNew_addressId_fkey";

-- DropTable
DROP TABLE "AddressNew";

-- DropTable
DROP TABLE "UserNew";

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" SERIAL NOT NULL,
    "balance" DECIMAL(19,4) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
