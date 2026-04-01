import { useState } from "react";
import { colors, radius, typography } from "../styles/theme";
import faqs from "../content/faqs.json";

export default function SupportChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleQuestionClick = (answer) => {
    alert(answer);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Mensaje enviado: "${message}"\n\nEsta funcionalidad se conectará próximamente con el chatbot inteligente RAG.`);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {isChatOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            right: "0",
            width: "320px",
            maxHeight: "500px",
            background: colors.white,
            borderRadius: radius.lg,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: colors.dark,
              color: colors.white,
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span style={{ fontSize: typography.sm, fontWeight: typography.semibold }}>
                Chat de Soporte
              </span>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: "16px",
                padding: "2px",
                borderRadius: radius.sm,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              ×
            </button>
          </div>

          <div style={{ padding: "16px", flex: 1, overflowY: "auto", minHeight: 0 }}>
            <div
              style={{
                background: colors.primaryBg,
                borderRadius: radius.md,
                padding: "12px",
                marginBottom: "16px",
                border: `1px solid ${colors.primary}20`,
              }}
            >
              <p style={{ margin: 0, fontSize: typography.sm, color: colors.text, lineHeight: 1.4 }}>
                ¡Hola querido Auquero! ¿En qué puedo ayudarte?
              </p>
            </div>

            <div>
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: typography.sm,
                  fontWeight: typography.semibold,
                  color: colors.text,
                }}
              >
                Preguntas frecuentes:
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {faqs.slice(0, 5).map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleQuestionClick(faq.answer)}
                    style={{
                      background: "none",
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.md,
                      padding: "10px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: typography.xs,
                      color: colors.text,
                      fontFamily: typography.fontFamily,
                      transition: "all 0.15s ease",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.primaryBg;
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${colors.border}`,
              padding: "12px 16px",
              background: colors.surface,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje aquí..."
                style={{
                  flex: 1,
                  minHeight: "36px",
                  maxHeight: "80px",
                  padding: "8px 12px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                  fontSize: typography.sm,
                  fontFamily: typography.fontFamily,
                  color: colors.text,
                  background: colors.white,
                  resize: "none",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: message.trim() ? colors.primary : colors.border,
                  border: "none",
                  color: colors.white,
                  cursor: message.trim() ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (message.trim()) {
                    e.currentTarget.style.background = colors.dark;
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (message.trim()) {
                    e.currentTarget.style.background = colors.primary;
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
                title="Enviar mensaje"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22,2 15,22 11,13 2,9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: colors.dark,
          border: "none",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "all 0.2s ease",
          transform: isChatOpen ? "rotate(45deg)" : "rotate(0deg)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = isChatOpen ? "rotate(45deg) scale(1.05)" : "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isChatOpen ? "rotate(45deg)" : "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
        }}
        title={isChatOpen ? "Cerrar chat" : "Abrir chat de soporte"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
}
