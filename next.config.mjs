/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are served from /public; no remote loaders configured.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
