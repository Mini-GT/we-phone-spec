/*
  Warnings:

  - You are about to drop the column `id` on the `GlobalNotification` table. All the data in the column will be lost.
  - Added the required column `globalNotificationId` to the `GlobalNotification` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GlobalNotification_id_key";

-- AlterTable
ALTER TABLE "GlobalNotification" DROP COLUMN "id",
ADD COLUMN     "globalNotificationId" TEXT NOT NULL,
ADD CONSTRAINT "GlobalNotification_pkey" PRIMARY KEY ("globalNotificationId");
