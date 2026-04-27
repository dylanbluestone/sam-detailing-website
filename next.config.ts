import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG placeholders in /public/gallery/. CSP below blocks any inline
    // scripts within SVG, so this is safe for our own assets.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
