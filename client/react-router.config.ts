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

    if (!Array.isArray(data.phones)) {
      console.error("Unexpected API response:", data);
      return ["/", "/smartphones"];
    } 

    const dynamicPaths = data.phones.map(
    (smartphone: Smartphone) => `/smartphones/${smartphone._id}`)

    return [
      "/",
      "/about",
      "/smartphones",
      ...dynamicPaths
    ]
  },
} satisfies Config;