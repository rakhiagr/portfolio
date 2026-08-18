import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0d14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Outer orbit ring */}
        <div
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            borderRadius: 9999,
            border: "1px solid rgba(245,241,232,0.14)",
            display: "flex",
          }}
        />
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: 110,
            height: 110,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(232,160,56,0.35), transparent 70%)",
            display: "flex",
          }}
        />
        {/* Packet core */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 9999,
            background: "#e8a038",
            boxShadow: "0 0 40px rgba(232,160,56,0.7)",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
