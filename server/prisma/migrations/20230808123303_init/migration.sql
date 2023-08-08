-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "noteId" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_label_key" ON "Tag"("label");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
