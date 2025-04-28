import prisma from "@/prismaClient";

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to PostgreSQL!");
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();