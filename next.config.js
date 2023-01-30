/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // useFileSystemPublicRoutes: false,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/assets/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/public/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/images/**",
            },
        ],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: "/api/:path*",
    //             destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/:path*",
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
