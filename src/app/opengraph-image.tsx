import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rakhi Agrawal — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0d14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#f5f1e8",
          position: "relative",
        }}
      >
        {/* Subtle ambient orbit hint */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-15%",
            width: 620,
            height: 620,
            borderRadius: "9999px",
            background:
              "radial-gradient(closest-side, rgba(232,160,56,0.22), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "18%",
            right: "20%",
            width: 88,
            height: 88,
            borderRadius: "9999px",
            background: "#e8a038",
            boxShadow: "0 0 80px rgba(232,160,56,0.55)",
            display: "flex",
          }}
        />

        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8b8778",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#e8a038",
              display: "flex",
            }}
          />
          Toronto, ON · Software Engineer
        </div>

        {/* Name + thesis */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 148,
              lineHeight: 0.95,
              letterSpacing: -3,
              fontWeight: 500,
            }}
          >
            <span>Rakhi</span>
            <span>Agrawal.</span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(245,241,232,0.8)",
            }}
          >
            Four+ years at LinkedIn on distributed systems — Kafka, Flink, MySQL,
            and the quiet parts of reliability.
          </div>
        </div>

        {/* Footer meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#8b8778",
          }}
        >
          <span>rakhi-agr</span>
          <span>rakhiagr</span>
        </div>
      </div>
    ),
    size,
  );
}
