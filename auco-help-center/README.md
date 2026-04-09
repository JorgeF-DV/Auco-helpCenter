# Auco Help Center

Frontend SPA del Centro de Ayuda de Auco, construida con React + Vite.

## Stack

- React 19
- Vite 7
- ESLint 9

## Arquitectura

- Tipo de app: SPA sin backend.
- Navegacion: enrutamiento interno por estado (sin React Router).
- Datos: contenido local en JSON.
- Estilos: estilos inline con tokens centralizados en `theme.js`.

Punto de entrada:

- `src/main.jsx` monta `src/help-center/App.jsx`.

Modulo principal:

- `src/help-center/App.jsx` orquesta estado compartido y cambio de vistas.

## Estructura de carpetas

```text
src/
	main.jsx
	help-center/
		App.jsx
		components/
		content/
			faqs.json
			videos.json
			processes.json
			documents.json
			validateContent.js
		pages/
		styles/
			theme.js
```

## Contratos de datos

FAQs (`faqs.json`):

- `id` (number)
- `category` (string)
- `question` (string)
- `answer` (string)

Videos (`videos.json`):

- `id` (number)
- `category` (string)
- `title` (string)
- `description` (string)
- `youtubeId` (string)
- `duration` (string)

Procesos (`processes.json`):

- `slug` (string)
- `category` (string)
- `number` (number)
- `title` (string)
- `description` (string)
- `tip` (string)
- `steps` (array)

Step de proceso (canonico):

- `step_number` (number)
- `action` (string)
- `image` (string, opcional)
- `imageAlt` (string, opcional)

Documentos legales (`documents.json`):

- `id` (number)
- `category` (string)
- `title` (string)
- `description` (string)
- `lastUpdated` (string)
- `size` (string)
- `url` (string)

## Validacion de contenido

Al iniciar la app se valida la estructura de `faqs.json`, `videos.json`, `processes.json` y `documents.json`.

- Archivo: `src/help-center/content/validateContent.js`
- Invocacion: `src/help-center/App.jsx`

Si el contrato es invalido, la app falla con un error explicito para evitar inconsistencias silenciosas.

La búsqueda del home indexa FAQs, videos, procesos y documentos legales.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run check:content
npm run test
npm run test:coverage
npm run check
npm run build
npm run preview
```

`npm run check` ejecuta el pipeline recomendado para PRs:

1. Lint
2. Validacion de contratos de contenido JSON
3. Build de produccion
4. Tests automatizados

## CI

El repositorio incluye workflow en GitHub Actions:

- `.github/workflows/ci.yml`

Se ejecuta en push y pull request, y corre `npm run check`.

Adicionalmente ejecuta cobertura con `npm run test:coverage` y falla si no cumple los umbrales configurados en `vite.config.js`.

## Desarrollo local

Desde la carpeta del proyecto:

```bash
cd C:/Users/Auco/auco-helpcenter/auco-help-center
npm install
npm run dev
```

URL local de Vite:

- `http://localhost:5173/`

## Troubleshooting rapido

Error `Could not read package.json`:

- El comando se ejecuto fuera de la carpeta `auco-help-center`.

Error `vite no se reconoce`:

- Faltan dependencias; ejecuta `npm install` en la carpeta del proyecto.

## Limitaciones conocidas

- No hay deep-linking ni historial real por URL.
- No hay CMS; el contenido se edita manualmente en JSON.
- El chat de soporte es un mock local (sin API real).

