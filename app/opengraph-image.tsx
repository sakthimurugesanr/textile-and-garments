import { ImageResponse } from "next/og";
export const alt = "[Company Name] · From fabric to finished product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#eeeee7",
          padding: 90,
          color: "#182b32",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 5,
            color: "#3d6861",
            marginBottom: 35,
          }}
        >
          TEXTILES & GARMENTS · TIRUPPUR
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontFamily: "serif",
            lineHeight: 1.1,
          }}
        >
          Good fabric.
          <br />
          Great garments.
          <br />
          Your signature.
        </div>
        <div style={{ display: "flex", fontSize: 22, marginTop: 35 }}>
          [Company Name] · Editable company preview
        </div>
      </div>
    ),
    size,
  );
}
