-- AlterTable
ALTER TABLE "GlobalNotification" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "UserNotification" ADD COLUMN     "description" TEXT;
