-- CreateTable
CREATE TABLE "UserNew" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "addressId" INTEGER,

    CONSTRAINT "UserNew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressNew" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "AddressNew_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserNew_email_key" ON "UserNew"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserNew_addressId_key" ON "UserNew"("addressId");

-- CreateIndex
CREATE INDEX "UserNew_name_idx" ON "UserNew" USING HASH ("name");

-- AddForeignKey
ALTER TABLE "UserNew" ADD CONSTRAINT "UserNew_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "AddressNew"("id") ON DELETE SET NULL ON UPDATE CASCADE;
