/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['drive.google.com', 'lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: true
    }
};

export default nextConfig;
