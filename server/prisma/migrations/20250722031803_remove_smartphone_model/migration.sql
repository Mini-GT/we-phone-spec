/*
  Warnings:

  - You are about to drop the `Smartphone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSmartphoneLike" DROP CONSTRAINT "UserSmartphoneLike_smartphoneId_fkey";

-- DropTable
DROP TABLE "Smartphone";
