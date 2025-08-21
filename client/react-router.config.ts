import type { Config } from "@react-router/dev/config";
import type { Smartphone } from "~/types/globals.type";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  async prerender() {
    let response = await fetch(`${process.env.SMARTPHONE_API_URL}/smartphones`)
    if (!response.ok) {
      throw new Error(`Failed to fetch smartphones: ${response.statusText}`);
    }

    const data = await response.json()

    const dynamicPaths = data.phones.map(
    (smartphone: Smartphone) => `/smartphones/${smartphone.name}-${smartphone._id}`)

    return [
      ...dynamicPaths,
    ]
  },
} satisfies Config;