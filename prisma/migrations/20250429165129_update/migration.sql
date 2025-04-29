-- AlterTable
ALTER TABLE "public"."_ArticleToCategory" ADD CONSTRAINT "_ArticleToCategory_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_ArticleToCategory_AB_unique";

-- AlterTable
ALTER TABLE "public"."_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_CategoryToPost_AB_unique";
