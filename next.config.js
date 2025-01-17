/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    api: "http://gabriel-delahaye.com",
    mapbox_token:
      "pk.eyJ1Ijoia2FybGR1cG9uY2hlbCIsImEiOiJjbGlicWp2dnUwZzVsM3JtdWZ0OWFxYndhIn0.smBViieSG9CHQiWNrBunAw",
    resend_token: "re_XjH1g4Qu_7KSAXhiC3tH82bzZ7MDicce4",
  },
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "goodfoodstorageimages.blob.core.windows.net",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
