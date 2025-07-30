-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR', 'DEMO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('verified', 'unverified', 'banned', 'pending', 'suspended');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('newDevice', 'maintenance', 'roleUpdate');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'unverified',
    "verifyToken" TEXT,
    "verifyTokenExpiry" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "name" TEXT,
    "password" TEXT,
    "profileImage" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSmartphoneLike" (
    "userId" TEXT NOT NULL,
    "smartphoneId" TEXT NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSmartphoneLike_pkey" PRIMARY KEY ("userId","smartphoneId")
);

-- CreateTable
CREATE TABLE "GlobalNotification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'newDevice',
    "name" TEXT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserNotification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "globalNotificationId" TEXT,
    "type" "NotificationType" NOT NULL DEFAULT 'newDevice',
    "name" TEXT,
    "title" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalNotification_id_key" ON "GlobalNotification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserNotification_userId_globalNotificationId_key" ON "UserNotification"("userId", "globalNotificationId");

-- AddForeignKey
ALTER TABLE "UserSmartphoneLike" ADD CONSTRAINT "UserSmartphoneLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
