# PR Draft: Fase 1 - Navegación con URLs reales y cobertura de deep-linking

## Título sugerido
Fase 1: migración a React Router + pruebas de deep-linking e historial

## Contexto
Este PR implementa la primera fase del plan técnico para hacer la navegación compartible, predecible y testeable con URLs reales.

## Qué cambia
- Migra la navegación principal de estado local a rutas reales con React Router.
- Agrega rutas para home, FAQs, videos, procesos, detalle de proceso, documentos y eventos.
- Soporta deep-linking con parámetros de query para FAQs y videos.
- Agrega fallback de ruta desconocida hacia home.
- Aumenta cobertura de pruebas de integración sobre rutas críticas.

## Archivos principales
- [src/help-center/App.jsx](src/help-center/App.jsx)
- [src/help-center/App.test.jsx](src/help-center/App.test.jsx)
- [README.md](README.md)

## Cobertura añadida en tests
En [src/help-center/App.test.jsx](src/help-center/App.test.jsx):
- Deep-link a detalle de proceso por slug.
- Deep-link de FAQs con query param q.
- Deep-link de videos con query params q, category y videoId.
- Navegación por historial (simulación de back/forward con popstate).
- Redirección de rutas desconocidas al home.

## Resultado esperado
- Los links de soporte y documentación pueden apuntar a vistas específicas.
- Mejor UX con historial real del navegador.
- Menor riesgo de regresión al navegar entre vistas y filtros.

## Validación ejecutada
- `npm run test -- --run src/help-center/App.test.jsx`
- `npm run test -- --run`

Resultado:
- 10/10 tests en App.
- 18/18 tests en suite completa.

## Riesgo y mitigación
Riesgo:
- Diferencias de comportamiento en inicialización de filtros por ruta vs estado interno.

Mitigación:
- Pruebas explícitas de query params y transición por historial.
- Fallback controlado de rutas desconocidas.

## Checklist
- [x] Rutas principales implementadas.
- [x] Deep-linking de FAQs y videos.
- [x] Fallback de rutas inválidas.
- [x] Cobertura de tests en navegación crítica.
- [x] Suite completa en verde.

## Notas para reviewer
El repositorio actualmente tiene cambios adicionales no relacionados (contenido/estilos/documentos). Para mantener bajo riesgo en revisión, se recomienda que este PR incluya únicamente los archivos listados en "Archivos principales".
