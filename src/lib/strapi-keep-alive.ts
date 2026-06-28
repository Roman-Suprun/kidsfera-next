const DEFAULT_PING_PATH = "/";
const DEFAULT_INTERVAL_MS = 4 * 60 * 1000;

type KeepAliveGlobal = typeof globalThis & {
  __strapiKeepAliveInterval?: ReturnType<typeof setInterval>;
};

const keepAliveGlobal = globalThis as KeepAliveGlobal;

function getPingUrl() {
  const strapiUrl = process.env.STRAPI_URL;

  if (!strapiUrl) {
    throw new Error("STRAPI_URL is not configured.");
  }

  const pingPath = process.env.STRAPI_PING_PATH ?? DEFAULT_PING_PATH;

  return new URL(pingPath, strapiUrl).toString();
}

function getPingInterval() {
  const rawInterval = process.env.STRAPI_PING_INTERVAL_MS;
  const parsedInterval = Number(rawInterval);

  if (!rawInterval || Number.isNaN(parsedInterval) || parsedInterval <= 0) {
    return DEFAULT_INTERVAL_MS;
  }

  return parsedInterval;
}

export function startStrapiKeepAlive() {
  if (keepAliveGlobal.__strapiKeepAliveInterval) {
    return;
  }

  let pingUrl: string;

  try {
    pingUrl = getPingUrl();
  } catch (error) {
    console.warn("[strapi-keep-alive]", error);
    return;
  }

  const ping = async () => {
    try {
      const response = await fetch(pingUrl, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        console.warn(
          `[strapi-keep-alive] Ping failed with status ${response.status}.`,
        );
      }
    } catch (error) {
      console.warn("[strapi-keep-alive] Ping request failed.", error);
    }
  };

  void ping();

  keepAliveGlobal.__strapiKeepAliveInterval = setInterval(() => {
    void ping();
  }, getPingInterval());
}
