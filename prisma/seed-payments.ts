// prisma/seed-payments.ts

import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { PrismaClient as PaymentsClient } from "../apps/api/node_modules/.prisma/payments";
const payments = new PaymentsClient();

async function main() {
  console.log("Seeding payments_db...");

  try {
    // Subscription anlegen oder aktualisieren
    const subscription = await payments.subscription.upsert({
      where: { id: "sub_001" },
      update: {},
      create: {
        id: "sub_001",
        userId: "123",
        plan: "pro",
        status: "active",
        createdAt: new Date("2025-06-01T12:39:10.054Z"),
        expiresAt: new Date("2025-07-01T12:39:10.054Z")
      }
    });
    console.log(`Subscription erstellt: ${subscription.id}`);

    // Rechnung anlegen oder aktualisieren
    const invoice = await payments.invoice.upsert({
      where: { id: "inv_001" },
      update: {},
      create: {
        id: "inv_001",
        userId: "123",
        amount: 49.99,
        currency: "EUR",
        status: "paid",
        createdAt: new Date("2025-06-01T13:00:00.000Z")
      }
    });
    console.log(`Rechnung erstellt: ${invoice.id}`);

    // Vorherige Webhook-Log mit fixer ID löschen (optional, nur bei Entwicklung sinnvoll)
    await payments.webhookLog.deleteMany({
      where: { id: "wh_001" }
    });

    // Webhook-Log mit fixer ID einfügen
    const webhookLog = await payments.webhookLog.create({
      data: {
        id: "wh_001",
        eventType: "invoice.paid",
        payload: JSON.stringify({ invoiceId: invoice.id, amount: invoice.amount }),
        receivedAt: new Date("2025-06-01T13:05:00.000Z")
      }
    });
    console.log(`Webhook-Log gespeichert: ${webhookLog.id}`);
  } catch (error) {
    console.error("Fehler beim Seeding payments:", error);
  } finally {
    await payments.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Seeding payments erfolgreich.");
    process.exit(0);
  })
  .catch((e) => {
    console.error("Fehler beim Seeding payments:", e);
    process.exit(1);
  });
