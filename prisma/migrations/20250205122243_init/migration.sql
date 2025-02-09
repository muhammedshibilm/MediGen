/*
  Warnings:

  - You are about to drop the `Appoinment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Upload` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_userId_fkey";

-- DropTable
DROP TABLE "Appoinment";

-- DropTable
DROP TABLE "Upload";
