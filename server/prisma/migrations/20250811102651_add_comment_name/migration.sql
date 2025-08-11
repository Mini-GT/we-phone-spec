/*
  Warnings:

  - Added the required column `name` to the `SmartphoneComments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SmartphoneComments" ADD COLUMN     "name" TEXT NOT NULL;
