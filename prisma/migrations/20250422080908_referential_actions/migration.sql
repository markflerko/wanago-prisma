-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authorName" TEXT DEFAULT 'anonymous',

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Writer" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Writer_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "Writer"("name") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT;
