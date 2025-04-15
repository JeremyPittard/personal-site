// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  experimental: {
    svg: true,
  },

  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },

  integrations: [
    icon(),
    partytown({
      config: { forward: ["goatcounter"] },
    }),
  ],
});
