-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL,
    "titel" TEXT NOT NULL,
    "contant" TEXT,
    "img" TEXT,
    "authorId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_id_key" ON "Blogs"("id");

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
