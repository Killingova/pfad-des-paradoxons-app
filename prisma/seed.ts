// .env laden
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { PrismaClient as AuthClient } from "../apps/api/node_modules/.prisma/auth";
const auth = new AuthClient();

async function main() {
  console.log("Seeding Daten...");

  try {
    // Beispielrolle "Admin"
    const adminRole = await auth.role.upsert({
      where: { name: "Admin" },
      update: {},
      create: { id: "1", name: "Admin" }
    });
    console.log(`Rolle erstellt: ${adminRole.name}`);

    // Beispielrolle "User"
    const userRole = await auth.role.upsert({
      where: { name: "User" },
      update: {},
      create: { id: "2", name: "User" }
    });
    console.log(`Rolle erstellt: ${userRole.name}`);

    // Admin User
    const adminUser = await auth.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        id: "123",
        email: "admin@example.com",
        password: "admin123",
        roleId: "1"
      }
    });
    console.log(`Admin User erstellt: ${adminUser.email}`);

    console.log("Seeding abgeschlossen.");
  } catch (error) {
    console.error("Fehler beim Seeding:", error);
  } finally {
    await auth.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Seeding erfolgreich.");
    process.exit(0);
  })
  .catch((e) => {
    console.error("Fehler beim Seeding:", e);
    process.exit(1);
  });
