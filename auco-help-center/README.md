# Auco Help Center

Frontend SPA del Centro de Ayuda de Auco. Navegación con URLs reales, contenido validado tipadamente, y test coverage completo.

## 🎯 Características

- **URLs reales y deep-linking**: React Router con rutas como `/faqs`, `/videos`, `/processes/:slug`, `/documents`, `/events`
- **Contenido validado con Zod**: Schemas tipados para FAQs, Videos, Procesos, Documentos y Eventos
- **Test coverage**: 35 tests pasando (12 test files) + smoke tests en CI
- **Arquitectura escalable**: Componentes reutilizables, tokens semánticos, selectors layer
- **CI/CD:** GitHub Actions con smoke tests, linting y quality gates

## 📚 Stack

```
React 19.2.0
React Router DOM 6.30.3
Vite 7.3.1 (build)
Vitest 4.1.3 (testing)
Zod 4.3.6 (validation)
@testing-library/react 16.3.2
ESLint 9.39.1
```

## 🏗️ Arquitectura

**Punto de entrada:**
- `src/main.jsx` → `src/help-center/App.jsx` (router principal)

**Estructura:**
```
src/help-center/
├── App.jsx                    # Router + state management
├── App.test.jsx               # 12 tests de navegación + deep-linking
├── smoke.navigation.test.jsx  # Smoke test de navegación principal
│
├── pages/                     # Page components (routing targets)
│   ├── index.jsx              # Home
│   ├── faqs/index.jsx         # FAQs con filtros
│   ├── videos/index.jsx       # Videos con modal + categorías
│   ├── processes/index.jsx    # Listado de procesos
│   ├── processes/[slug].jsx   # Detalle de proceso
│   ├── documents/index.jsx    # Documentos legales
│   └── events/index.jsx       # Eventos
│
├── components/                # Reusable components
│   ├── Layout.jsx
│   ├── FAQItem.jsx
│   ├── ProcessStep.jsx
│   ├── VideoCard.jsx
│   ├── EventCard.jsx
│   ├── Chatbot.jsx            # Soporte
│   └── LinkifiedText.jsx      # Linkificación de URLs en texto
│
├── content/                   # Data layer
│   ├── faqs.json              # 37+ FAQs categorizadas
│   ├── videos.json            # Videos con duración
│   ├── processes.json         # 6+ procesos con pasos
│   ├── documents.json         # Documentos legales
│   ├── events.json            # Eventos (Webinars, Talleres, etc.)
│   ├── schemas.js             # Zod schemas
│   ├── selectors.js           # Filtros y búsqueda centralizados
│   └── validateContentData.js # Validación de contratos
│
├── styles/                    # Design system
│   └── theme.js               # Tokens semánticos + componente helpers
│
└── utils/
    └── search.js              # Búsqueda local
```

## 🌐 Rutas disponibles

| Ruta | Descripción | Query Params |
|------|-------------|--------------|
| `/` | Home | - |
| `/faqs` | FAQs | `q=search_text` (opcional) |
| `/videos` | Videos | `q=search_text`, `category=...`, `videoId=...` (opcionales) |
| `/processes` | Listado de procesos | - |
| `/processes/:slug` | Detalle de proceso | - |
| `/documents` | Documentos legales | - |
| `/events` | Eventos | - |

**Ejemplos de deep-links:**
```
/processes/crear-firma-digital
/faqs?q=usuario
/videos?category=Configuración&videoId=abc123
```

## 📊 Datos y Contratos

**FAQs** (`faqs.json`):
```json
{
  "id": 1,
  "category": "Cuenta",
  "question": "¿Cómo creo una cuenta?",
  "answer": "..."
}
```

**Videos** (`videos.json`):
```json
{
  "id": 1,
  "category": "Seguridad",
  "title": "Firma digital en 3 pasos",
  "youtubeId": "abc123",
  "duration": "5:30"
}
```

**Procesos** (`processes.json`):
```json
{
  "slug": "crear-firma-digital",
  "title": "Crear tu firma digital",
  "category": "Seguridad",
  "steps": [
    {
      "step_number": 1,
      "action": "Abre Configuración",
      "image": "url",
      "imageAlt": "desc"
    }
  ]
}
```

**Documentos** (`documents.json`):
```json
{
  "id": 1,
  "category": "Legal",
  "title": "Términos de Servicio",
  "url": "https://...",
  "size": "2.5 MB"
}
```

**Eventos** (`events.json`):
```json
{
  "id": 1,
  "category": "Webinar",
  "title": "Firma Digital Avanzada",
  "date": "2026-05-15T18:00:00Z"
}
```

Validación con Zod. Ver `src/help-center/content/schemas.js`.

## 🧪 Testing

```bash
# Dev server
npm run dev

# Build
npm run build

# Lint
npm run lint

# Tests unitarios e integración
npm run test              # Watch mode
npm run test:run          # Run once
npm run test:coverage     # Coverage report

# Smoke tests (navegación)
npm run test:smoke        # Solo smoke
npm run smoke:ci           # Build + smoke (como en CI)

# Quality gate liviano de CI
npm run check:ci

# Quality gate (lint + validate + build + test)
npm run check
```

## 📈 Métricas Actuales

- **Tests:** 35/35 pasando (100%)
- **Test files:** 12
- **Lint:** ✅ Sin errores
- **Coverage:** Smoke tests + unit coverage
- **Build size:** ~150KB (gzipped)
- **CI time:** ~1.5min (lint + check:content + smoke + coverage)

## 🚀 Despliegue

Deployado a **Netlify** vía GitHub Actions:
- Branch `main` → Deploy automático
- Deploy previews en cada PR

Configuración:
- `public/_redirects` (Netlify redirects)
- `public/_headers` (Netlify headers)
- `.github/workflows/ci.yml` (CI/CD)

## 📁 Gestión de `public/`

`public/` no es un cajón de archivos genéricos. Solo debe contener recursos que el navegador necesita resolver por URL directa en tiempo de ejecución.

### Debe permanecer en `public/`

- Imágenes y documentos que aparecen en procesos o fichas de contenido.
- Recursos enlazados desde `processes.json` y `documents.json`.
- Archivos de despliegue estático como `_headers` y `_redirects`.
- Branding estático que se usa en la app, por ejemplo `auco_logo.png`.

### No debe permanecer en `public/`

- `coverage/` y otros artefactos generados por build o test.
- Borradores históricos de PRs o documentación temporal.
- Assets de ejemplo que no estén referenciados por la app.

### Criterio práctico

Si un archivo no cumple una de estas condiciones, se debe mover o eliminar:

1. Está referenciado por contenido JSON, HTML o configuración de runtime.
2. Se sirve directamente al usuario final.
3. Es necesario para despliegue o navegación real.

## 🔧 Desarrollo

```bash
# Clone e install
git clone https://github.com/JorgeF-DV/Auco-helpCenter.git
cd Auco-helpCenter/auco-help-center
npm install

# Dev server
npm run dev
# → http://localhost:5173

# Editar contenido
vim src/help-center/content/faqs.json

# Validar cambios
npm run check

# Test una página
npm run test -- src/help-center/pages/faqs

# Commit y push
git add .
git commit -m "feat: descripción clara"
git push origin feat/mi-rama
# → Crear PR en GitHub
```

## 📝 Convenciones

- **Branches:** `feat/descripción`, `fix/descripción`, `refactor/descripción`
- **Commits:** Prefijo tipo: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`
- **PRs:** Máximo 1 responsabilidad por PR
- **Tests:** Suite de regresión para rutas críticas (`App.test.jsx`)

## 👥 Equipo

- **Frontend:** Jorge F. (GitHub: JorgeF-DV)
- **Contenido:** Auco Help Team
- **Soporte:** [Chatbot integrado](src/help-center/components/Chatbot.jsx)

## 📚 Referencias

- [ARCHITECTURE.md](ARCHITECTURE.md) — Reglas de diseño y convenciones
- [Zod Docs](https://zod.dev)
- [React Router Docs](https://reactrouter.com)
- [Vitest Docs](https://vitest.dev)

---

**Última actualización:** 15/04/2026  
**Estado:** ✅ Production-ready

