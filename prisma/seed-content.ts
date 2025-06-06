// prisma/seed-content.ts

import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { PrismaClient as ContentClient } from "../apps/api/node_modules/.prisma/content";
const content = new ContentClient();

async function main() {
  console.log("Seeding content_db...");

  try {
    // Beispielkarte (z. B. Willkommenskarte)
    const card = await content.card.upsert({
      where: { id: "card_001" },
      update: {},
      create: {
        id: "card_001",
        title: "Willkommenskarte",
        content: "Willkommen auf dem Pfad des Paradoxons. Diese Karte markiert den Anfang deiner Reise.",
        imageUrl: "https://example.com/images/welcome.jpg",
        userId: "123",
        createdAt: new Date("2025-06-01T12:00:00Z")
      }
    });
    console.log(`Karte erstellt: ${card.title}`);

    // Beispielartikel
    const article = await content.article.upsert({
      where: { id: "article_001" },
      update: {},
      create: {
        id: "article_001",
        title: "Einführung in das System",
        content: "Dieses System führt dich durch 50 Tore spiritueller Reflexion. Es basiert auf uraltem Wissen, neu interpretiert für die heutige Zeit.",
        authorId: "123",
        createdAt: new Date("2025-06-01T12:30:00Z")
      }
    });
    console.log(`Artikel erstellt: ${article.title}`);

    // Beispiel-Mediadatei
    const mediaAsset = await content.mediaAsset.upsert({
      where: { id: "media_001" },
      update: {},
      create: {
        id: "media_001",
        filename: "intro-video.mp4",
        url: "https://example.com/media/intro-video.mp4",
        uploadedAt: new Date("2025-06-01T12:45:00Z")
      }
    });
    console.log(`MediaAsset erstellt: ${mediaAsset.filename}`);
  } catch (error) {
    console.error("Fehler beim Seeding content:", error);
  } finally {
    await content.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Seeding content erfolgreich.");
    process.exit(0);
  })
  .catch((e) => {
    console.error("Fehler beim Seeding content:", e);
    process.exit(1);
  });
