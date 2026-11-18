import type { NextConfig } from "next";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = process.env.GITHUB_ACTIONS && process.env.NODE_ENV === "production" && repo ? `/${repo}` : "";
const config: NextConfig = {output:"export",basePath,assetPrefix:basePath,images:{unoptimized:true},allowedDevOrigins:["127.0.0.1"]};
export default config;
