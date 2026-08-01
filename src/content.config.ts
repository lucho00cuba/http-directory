import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const status = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/status" }),
  schema: z.object({
    code: z.number(),
    title: z.string(),
    slug: z.string(),
    category: z.enum([
      "informational",
      "success",
      "redirection",
      "client-error",
      "server-error",
    ]),
    description: z.string(),
    updated: z.string().optional(),
    created: z.string().optional(),
    seeAlso: z.array(z.string()).default([]),
    referenceUrl: z.string().url(),
  }),
});

export const collections = { status };
