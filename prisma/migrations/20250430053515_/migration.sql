-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "photoId" INTEGER,
    "articleId" UUID,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Comment"
ADD CONSTRAINT check_only_one_fk CHECK (
  ("photoId" IS NOT NULL AND "articleId" IS NULL) OR
  ("photoId" IS NULL AND "articleId" IS NOT NULL)
);