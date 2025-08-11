/*
  Warnings:

  - Added the required column `message` to the `SmartphoneComments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SmartphoneComments" ADD COLUMN     "message" TEXT NOT NULL;
