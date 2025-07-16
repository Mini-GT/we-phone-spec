-- CreateTable
CREATE TABLE "Smartphone" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Smartphone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSmartphoneLike" (
    "userId" TEXT NOT NULL,
    "smartphoneId" TEXT NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSmartphoneLike_pkey" PRIMARY KEY ("userId","smartphoneId")
);

-- AddForeignKey
ALTER TABLE "UserSmartphoneLike" ADD CONSTRAINT "UserSmartphoneLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSmartphoneLike" ADD CONSTRAINT "UserSmartphoneLike_smartphoneId_fkey" FOREIGN KEY ("smartphoneId") REFERENCES "Smartphone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
