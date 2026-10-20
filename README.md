# DayZ · Guía de supervivencia

Página estática (armas, objetos, lugares, zonas militares y crafteos) con un servidor Node sin dependencias.

## Local
    npm start          # http://localhost:3000
    npm run images     # opcional: descarga las imágenes a public/img

## Railway
1. Sube esta carpeta a un repositorio de GitHub.
2. En Railway: New Project → Deploy from GitHub repo.
3. Railway detecta `package.json` y ejecuta `npm start`. Luego, en Settings → Networking, pulsa Generate Domain.

## Editar contenido
Todo el contenido está en `public/data.json`. Para cambiar una imagen, usa el nombre de archivo de la wiki en el campo `f` (armas) o `i` (objetos y crafteos).
