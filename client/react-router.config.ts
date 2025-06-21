import type { Config } from "@react-router/dev/config";
import type { Smartphone } from "~/types/globals.type";

const smartphoneUrl = process.env.SMARTPHONE_API_URL || "http://localhost:3000/"

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  async prerender() {
    let response = await fetch(`${smartphoneUrl}/smartphones`)
    const data = await response.json()
    const dynamicPaths = data.phones.map(
    (smartphone: Smartphone) => `/smartphones/${smartphone.id}`)

    return [
      "/",
      "/about",
      "/smartphones",
      ...dynamicPaths
    ]
  },
} satisfies Config;