# Plan de Mejora del Proyecto

Este plan prioriza seguridad, mantenibilidad y escalabilidad sin romper la velocidad de entrega del equipo.

## Objetivos de ingeniería

- Mantener bajo riesgo de regresiones en cambios de contenido.
- Hacer la navegación predecible y compartible (URLs reales).
- Reducir complejidad accidental en UI y estado.
- Subir cobertura funcional en rutas críticas.
- Preparar el proyecto para crecer en secciones sin duplicación.

## Fase 0 (inmediata, 1-2 días)

- Estandarizar checks de PR en CI y local con `npm run check`.
- Definir criterio de PR pequeño: maximo 1 responsabilidad por PR.
- Agregar plantilla de issue técnico para deuda y mejoras.
- Añadir una sección de "Riesgos conocidos" en README con responsable y estado.

## Fase 1 (corto plazo, 3-5 días)

- Migrar navegación por estado a rutas reales (React Router), manteniendo compatibilidad visual actual.
- Soportar deep-linking para procesos, videos y FAQs filtradas.
- Añadir fallback de ruta 404 y redirección a home.
- Preservar scroll y navegación atrás/adelante de navegador.

Resultado esperado:
- Menos fricción para soporte (se pueden compartir links directos).
- Mejor experiencia de usuario y mejor mantenibilidad del flujo de navegación.

Estado actual (2026-04-15):
- Implementado: navegacion con React Router y URLs reales.
- Implementado: deep-linking para procesos (`/processes/:slug`), FAQs (`/faqs?q=...`) y videos (`/videos?q=...&category=...&videoId=...`).
- Implementado: fallback de ruta invalida hacia home.
- Validado: pruebas de rutas y navegacion por historial (`back/forward`) en verde.

## Fase 2 (mediano plazo, 1-2 semanas)

- Introducir esquema de validación tipado (Zod o similar) para contratos JSON.
- Generar tipos a partir del esquema para evitar drift entre contenido y UI.
- Validar también formato de links, imágenes y campos opcionales.
- Crear una capa `content/selectors` para búsquedas y transforms, evitando lógica repetida en páginas.

Resultado esperado:
- Menos errores de contenido en runtime.
- Contratos más claros para el equipo completo.

## Fase 3 (escalabilidad UI, 1 semana)

- Reducir estilos inline críticos y mover estilos compartidos a utilidades/objetos reutilizables.
- Definir variantes de componentes (cards, badges, botones) para evitar duplicación.
- Introducir tokens semánticos adicionales (info, warning, accent, interactiveHover).
- Medir y corregir inconsistencias visuales por componente.

Resultado esperado:
- UI más consistente.
- Menos costo por cambios de diseño global.

## Fase 4 (calidad y observabilidad, continua)

- Subir cobertura de tests en páginas faltantes (faqs, events, process list).
- Añadir tests de regresión de navegación por URL.
- Añadir smoke test de build y navegación principal en CI.
- Definir SLO interno para tiempo de respuesta de búsqueda local.

Resultado esperado:
- Mayor confianza para refactors.
- Menos regresiones silenciosas.

## Backlog técnico priorizado

Prioridad alta:
- Navegación con URLs reales.
- Esquema tipado para contratos de contenido.
- Tests de rutas principales.

Prioridad media:
- Capa de selectors de contenido.
- Reutilización de estilos y variantes.

Prioridad baja:
- Ajustes de micro UX y animaciones.
- Optimización fina de búsqueda para volúmenes altos.

## Métricas de éxito

- 0 errores de contrato en producción por contenido JSON.
- Cobertura de tests en rutas críticas >= 80%.
- 100% de secciones principales con deep-link.
- Tiempo de incorporación de nuevo dev (setup + primera tarea) < 1 día.

## Riesgos y mitigación

- Riesgo: migración de navegación rompe flujos existentes.
  Mitigación: migrar por feature flags internos y test de rutas antes de merge.

- Riesgo: sobre-ingeniería temprana.
  Mitigación: ejecutar por fases y medir impacto por release.

- Riesgo: deuda visual al mezclar inline y estilos reutilizables.
  Mitigación: migración incremental por componente, no por big-bang.
