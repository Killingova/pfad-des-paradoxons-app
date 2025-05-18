# Docker-Image: Node.js in schlanker Alpine-Version
FROM node:18-alpine

# Arbeitsverzeichnis im Container setzen
WORKDIR /app

# Kopiere zuerst package.json (und package-lock.json, falls vorhanden)
# Das beschleunigt das Docker-Build, weil npm install gecached werden kann
COPY package.json ./
# TypeScript- und Vite-Konfigs ebenfalls kopieren
COPY tsconfig.json ./
COPY vite.config.ts ./

# Kopiere den Public-Ordner (statische Assets, z.B. index.html)
COPY src/public ./public

# Kopiere den Source-Code
COPY src ./src

# Installiere die Dependencies
RUN npm install

# Vite-Dev-Server-Port öffnen
EXPOSE 5173

# Starte den Entwicklungsserver – mit "--host", damit der Container auch von außen erreichbar ist
CMD ["npm", "run", "dev", "--", "--host"]
