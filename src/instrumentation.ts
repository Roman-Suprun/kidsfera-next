import { startStrapiKeepAlive } from "@/lib/strapi-keep-alive";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    startStrapiKeepAlive();
  }
}
