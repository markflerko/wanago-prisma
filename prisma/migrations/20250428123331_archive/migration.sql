-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "archive";

-- CreateTable
CREATE TABLE "archive"."Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
