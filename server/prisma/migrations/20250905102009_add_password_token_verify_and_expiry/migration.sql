/*
  Warnings:

  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "verifyToken",
DROP COLUMN "verifyTokenExpiry",
ADD COLUMN     "emailVerifyToken" TEXT,
ADD COLUMN     "emailVerifyTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "forgotPassTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "forgotPassVerifyToken" TEXT;
