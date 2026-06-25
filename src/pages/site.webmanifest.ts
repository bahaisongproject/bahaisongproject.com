export function GET() {
  return new Response(
    JSON.stringify({
      name: "bahá'í song project",
      short_name: "bsp",
      start_url: "/",
      background_color: "#f8fbfb",
      theme_color: "#0f9185",
      display: "standalone",
      icons: [
        {
          src: "/images/logo_100x100.png",
          sizes: "100x100",
          type: "image/png",
        },
        {
          src: "/images/logo_500x500.png",
          sizes: "500x500",
          type: "image/png",
        },
      ],
    }),
    {
      headers: {
        "content-type": "application/manifest+json",
      },
    },
  )
}
