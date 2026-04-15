# Arquitectura del Help Center

Este proyecto debe leerse como una SPA de contenido, no como un frontend experimental. La meta es que cualquier dev nuevo entienda rapido donde vive cada cosa, como se valida el contenido y que reglas evitar para no convertirlo en un ensamblaje frágil.

## Principios

- Contenido como datos: FAQs, videos, procesos, documentos y eventos viven en JSON con contratos explícitos.
- UI como presentacion: los componentes solo renderizan y orquestan interaccion local; no contienen reglas de negocio ocultas.
- Una sola fuente de verdad visual: colores, tipografia, radios y sombras salen de `src/help-center/styles/theme.js`.
- Navegacion predecible: el cambio de vista se maneja por estado dentro de `App.jsx`.
- Validacion obligatoria: el contenido debe pasar por `validateHelpCenterContent()` y por `npm run check:content`.
- Tests orientados a flujo: cada pantalla critica debe tener pruebas que detecten regresiones de render y navegacion.
- Accesibilidad por defecto: botones reales, textos legibles, imagenes con `alt` y soporte de teclado cuando aplique.
- Responsive primero: la interfaz debe mantenerse util en mobile antes que en desktop amplio.
- Cambios pequeños y aislados: cada ajuste debe tocar la menor cantidad de archivos posible y evitar duplicar logica.

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

## Criterios de revison

- Si un cambio aumenta claridad, aislacion y validacion, es una mejora.
- Si un cambio introduce dependencia innecesaria, estado oculto o duplicacion visual, es deuda tecnica.
- Si un componente no se puede entender rapido leyendo su archivo y sus props, hay que dividirlo.