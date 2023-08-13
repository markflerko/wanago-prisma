-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");

-- CreateIndex
CREATE INDEX "Post_authorId_title_idx" ON "Post"("authorId", "title");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User" USING HASH ("name");
