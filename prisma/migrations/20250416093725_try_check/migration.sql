-- AlterTable
ALTER TABLE
  "Product"
ADD
  COLUMN "price" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE
  "Product"
ADD
  CHECK(price >= 0);