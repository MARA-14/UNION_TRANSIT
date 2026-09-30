export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#0E2A5C",
          color: "#fff",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Cette page n&apos;existe pas / This page doesn&apos;t exist
        </p>
        <a
          href="/fr"
          style={{
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
            padding: "0 1.5rem",
            borderRadius: 6,
            background: "#C79A3E",
            color: "#081A3B",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Accueil / Home
        </a>
      </body>
    </html>
  );
}
