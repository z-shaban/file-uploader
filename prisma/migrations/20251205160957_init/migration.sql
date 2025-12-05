-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "foldername" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_foldername_key" ON "Folder"("foldername");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
