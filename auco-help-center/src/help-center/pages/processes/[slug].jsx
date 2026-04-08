// ─────────────────────────────────────────────────────────────
// pages/processes/[slug].jsx — Detalle de un proceso
//
// Recibe el slug del proceso (ej: "enviar-documento") y muestra
// todos sus pasos con el componente ProcessStep.
//
// En Next.js este archivo se accede vía /processes/enviar-documento.
// En esta implementación con router simple, recibe el slug como prop.
//
// Props:
//   slug              (string) — Identificador único del proceso
//   setPage           (func)   — Para navegar a otras páginas
//   setSelectedProcess(func)   — Para resetear el proceso seleccionado
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Layout from "../../components/Layout";
import ProcessStep from "../../components/ProcessStep";
import { colors, typography, radius, styles } from "../../styles/theme";
import processes from "../../content/processes.json";

export default function ProcessDetailPage({ slug, setPage, setSelectedProcess }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Busca el proceso en el JSON usando el slug como clave
  const process = processes.find((p) => p.slug === slug);

  // Si el slug no existe, muestra un estado de error con navegación de regreso
  if (!process) {
    return (
      <Layout onNavigate={setPage}>
        <div
          style={{
            ...styles.card,
            padding: "60px 40px",
            textAlign: "center",
            fontFamily: typography.fontFamily,
          }}
        >
          <p style={{ color: colors.textMuted, fontSize: typography.base, marginBottom: "20px" }}>
            El proceso solicitado no existe.
          </p>
          <button
            onClick={() => setPage("processes")}
            style={backButtonStyle}
          >
            Volver a procesos
          </button>
        </div>
      </Layout>
    );
  }

  const currentStep = process.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === process.steps.length - 1;
  const currentProcessIndex = processes.findIndex((p) => p.slug === process.slug);
  const previousProcess = currentProcessIndex > 0 ? processes[currentProcessIndex - 1] : null;
  const nextProcess = currentProcessIndex >= 0 ? processes[currentProcessIndex + 1] : null;

  return (
    <Layout onNavigate={setPage}>
      {/* ── Botón de regreso ── */}
      <button
        onClick={() => setPage("processes")}
        style={{
          ...processNavLinkButtonStyle,
          marginBottom: "20px",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Volver a procesos
      </button>

      {/* ── Cabecera del proceso ── */}
      <div
        style={{
          background: `linear-gradient(140deg, ${colors.dark} 0%, #1a3a6b 100%)`,
          borderRadius: radius.lg,
          padding: "32px 36px",
          marginBottom: "28px",
          color: colors.white,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decoración geométrica */}
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.07)",
            pointerEvents: "none",
          }}
        />

        {/* Badge de categoría */}
        <span
          style={{
            ...styles.badge,
            background: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.85)",
            marginBottom: "14px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {process.category}
        </span>

        <h1
          style={{
            color: colors.white,
            fontSize: typography.xxl,
            fontWeight: typography.bold,
            margin: "10px 0 10px",
            fontFamily: typography.fontFamily,
            letterSpacing: "-0.3px",
            position: "relative",
          }}
        >
          {process.title}
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: typography.base,
            margin: "0 0 16px",
            fontFamily: typography.fontFamily,
            maxWidth: 560,
            lineHeight: 1.6,
            position: "relative",
          }}
        >
          {process.description}
        </p>

        {/* Indicador de cantidad de pasos */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: radius.full,
            padding: "5px 14px",
            fontSize: typography.sm,
            color: "rgba(255,255,255,0.8)",
            fontFamily: typography.fontFamily,
            fontWeight: typography.medium,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {process.steps.length} pasos
        </div>
      </div>

      {/* ── Carrusel de pasos ── */}
      <div
        style={{
          ...styles.card,
          padding: "32px 36px",
        }}
      >
        <h2
          style={{
            color: colors.text,
            fontSize: typography.lg,
            fontWeight: typography.semibold,
            margin: "0 0 28px",
            fontFamily: typography.fontFamily,
            paddingBottom: "16px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          Pasos del proceso
        </h2>

        <div style={{ display: "flex", alignItems: "stretch", gap: "10px" }}>
          <button
            type="button"
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={isFirstStep}
            aria-label="Paso anterior"
            style={carouselArrowButtonStyle(isFirstStep)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 12px", color: colors.textLight, fontSize: typography.sm, fontFamily: typography.fontFamily }}>
              Paso {currentStepIndex + 1} de {process.steps.length}
            </p>

            <ProcessStep
              number={currentStep.step_number}
              action={currentStep.action}
              image={currentStep.image}
              imageAlt={currentStep.imageAlt}
              tip={currentStepIndex === 0 ? process.tip : null}
              isLast={true}
            />

            <div style={{ display: "flex", gap: "6px", marginTop: "18px", flexWrap: "wrap" }}>
              {process.steps.map((step, index) => (
                <button
                  type="button"
                  key={step.step_number}
                  onClick={() => setCurrentStepIndex(index)}
                  aria-label={`Ir al paso ${step.step_number}`}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background: index === currentStepIndex ? colors.primary : colors.border,
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCurrentStepIndex((prev) => Math.min(process.steps.length - 1, prev + 1))}
            disabled={isLastStep}
            aria-label="Paso siguiente"
            style={carouselArrowButtonStyle(isLastStep)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {(previousProcess || nextProcess) && (
          <div
            style={{
              marginTop: "24px",
              paddingTop: "18px",
              borderTop: `1px solid ${colors.border}`,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {previousProcess ? (
              <button
                type="button"
                onClick={() => setSelectedProcess(previousProcess.slug)}
                style={processNavLinkButtonStyle}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Proceso anterior
              </button>
            ) : <span />}

            {nextProcess ? (
              <button
                type="button"
                onClick={() => setSelectedProcess(nextProcess.slug)}
                style={processNavLinkButtonStyle}
              >
                Siguiente proceso
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            ) : <span />}
          </div>
        )}
      </div>
    </Layout>
  );
}

function carouselArrowButtonStyle(disabled) {
  return {
    width: "32px",
    minWidth: "32px",
    height: "32px",
    borderRadius: radius.sm,
    border: "none",
    background: "transparent",
    color: disabled ? colors.textLight : colors.dark,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    opacity: disabled ? 0.45 : 1,
    transition: "opacity 0.15s ease, color 0.15s ease",
  };
}

const backButtonStyle = {
  background: colors.primary,
  border: "none",
  color: colors.white,
  cursor: "pointer",
  fontSize: typography.sm,
  fontWeight: typography.semibold,
  fontFamily: typography.fontFamily,
  padding: "10px 20px",
  borderRadius: radius.md,
};

const processNavLinkButtonStyle = {
  border: "none",
  background: "transparent",
  color: colors.dark,
  fontSize: typography.sm,
  fontWeight: typography.semibold,
  fontFamily: typography.fontFamily,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: 0,
};
