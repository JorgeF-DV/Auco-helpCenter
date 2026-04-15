# Arquitectura del Help Center

Este proyecto debe leerse como una SPA de contenido, no como un frontend experimental. La meta es que cualquier dev nuevo entienda rapido donde vive cada cosa, como se valida el contenido y que reglas evitar para no convertirlo en un ensamblaje frágil.

## Principios

- Contenido como datos: FAQs, videos, procesos, documentos y eventos viven en JSON con contratos explícitos.
- UI como presentacion: los componentes solo renderizan y orquestan interaccion local; no contienen reglas de negocio ocultas.
- Una sola fuente de verdad visual: colores, tipografia, radios y sombras salen de `src/help-center/styles/theme.js`.
- Navegacion predecible: React Router maneja rutas reales y deep-linking desde `App.jsx`.
- Validacion obligatoria: el contenido debe pasar por `validateHelpCenterContent()` y por `npm run check:content`.
- Tests orientados a flujo: cada pantalla critica debe tener pruebas que detecten regresiones de render y navegacion.
- Accesibilidad por defecto: botones reales, textos legibles, imagenes con `alt` y soporte de teclado cuando aplique.
- Responsive primero: la interfaz debe mantenerse util en mobile antes que en desktop amplio.
- Cambios pequeños y aislados: cada ajuste debe tocar la menor cantidad de archivos posible y evitar duplicar logica.

## Flujo de navegacion

- Las rutas principales son `/`, `/faqs`, `/videos`, `/processes`, `/processes/:slug`, `/documents` y `/events`.
- Los filtros compartibles via URL viven en query params (`q`, `category`, `videoId`).
- La ruta invalida redirige a home con fallback controlado.
- El estado de seleccion de UI debe sincronizarse con URL cuando aplique, para evitar drift entre navegacion interna y deep-link.

## Estructura recomendada

- `src/help-center/content/`: contratos y datos editables.
- `src/help-center/components/`: bloques de UI reutilizables.
- `src/help-center/pages/`: pantallas y composición de contenido.
- `src/help-center/styles/`: tokens y utilidades visuales.

## Reglas para evitar un "frankenstein"

- No hardcodear colores, espaciamientos o tipografias fuera de `theme.js` salvo excepciones justificadas.
- No copiar y pegar componentes enteros cuando un prop o una variante resuelve el caso.
- No meter estado global si el estado es de una pantalla o de una interaccion puntual.
- No agregar dependencias nuevas si el proyecto ya resuelve el caso con React y utilidades locales.
- No cambiar el contrato JSON sin actualizar validacion y tests.

## Reglas para `public/`

- `public/` guarda solo archivos servidos directamente por URL en runtime.
- Si un `processes[].steps[].image` o `documents[].url` apunta a un archivo, ese archivo debe existir en `public/`.
- La verificacion de existencia de assets se ejecuta en `npm run check:content`.
- Archivos generados (`coverage/`, builds temporales, borradores) no deben versionarse en `public/`.

Convencion para nuevos assets:

- Usar nombres ASCII en kebab-case, sin tildes ni espacios.
- Agrupar por dominio funcional (por ejemplo `public/processes/...` y `public/legal-docs/...`).
- Mantener compatibilidad con rutas legacy existentes hasta completar una migracion planificada.

## Calidad y CI

- CI corre smoke de navegacion, lint, validacion de contenido y cobertura.
- Evitar ejecutar dos veces la misma suite de tests en CI sin necesidad.
- `npm run check` se mantiene como comando local integral para PR antes de push.

## Criterios de revison

- Si un cambio aumenta claridad, aislacion y validacion, es una mejora.
- Si un cambio introduce dependencia innecesaria, estado oculto o duplicacion visual, es deuda tecnica.
- Si un componente no se puede entender rapido leyendo su archivo y sus props, hay que dividirlo.