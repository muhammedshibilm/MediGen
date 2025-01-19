-- CreateTable
CREATE TABLE "Appoinment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "medicalcon" TEXT NOT NULL,
    "preferdate" TEXT NOT NULL,
    "doctor" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Appoinment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Appoinment_userId_idx" ON "Appoinment"("userId");

-- AddForeignKey
ALTER TABLE "Appoinment" ADD CONSTRAINT "Appoinment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
