/*
  Warnings:

  - The primary key for the `SmartphoneComments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."SmartphoneComments" DROP CONSTRAINT "SmartphoneComments_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SmartphoneComments_pkey" PRIMARY KEY ("id");
