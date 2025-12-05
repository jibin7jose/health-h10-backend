import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const email = "jibinabhram@gmail.com";
  const plainPassword = "123456";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.superAdmin.update({
    where: { email },
    data: { password_hash: hashedPassword },
  });

  console.log("✅ Password hashed and updated successfully");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
