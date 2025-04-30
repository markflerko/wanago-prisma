/*
  Warnings:

  - The primary key for the `_ArticleToCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CategoryToPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_ArticleToCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CategoryToPost` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."_ArticleToCategory" DROP CONSTRAINT "_ArticleToCategory_AB_pkey";

-- AlterTable
ALTER TABLE "public"."_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToCategory_AB_unique" ON "public"."_ArticleToCategory"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "public"."_CategoryToPost"("A", "B");
