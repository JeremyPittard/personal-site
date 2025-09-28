import { defineCollection, z } from "astro:content";
import { HygraphLoader } from "@hygraph/hygraph-astro-loader";

const HeroImageSchema = z.object({
  // Assuming you query id and url for the asset
  id: z.string().optional(),
  url: z.string().url(),
});

// Rich Text Content Schema: The structure for the Rich Text field when querying its 'html'.
const BlogContentSchema = z.object({
  html: z.string(),
});

const thoughts = defineCollection({
  loader: HygraphLoader({
    endpoint: import.meta.env.HYGRAPH,
    operation: "blogs",
    fields: [
      "id",
      "createdAt",
      "updatedAt",

      "title",
      "description",
      "publishDate",
      "isFeatured",
      "tags",
      { heroImage: ["url", "id"] },
      { blogContent: ["html"] },
    ],
  }),

  schema: z.object({
    id: z.string(),
    createdAt: z.string().optional(), // Required date, transformed
    updatedAt: z.string().optional(),
    title: z.string().min(1, "Title is required."),
    description: z.string().nullable().optional(),
    publishDate: z.string().optional(),
    isFeatured: z.boolean().nullable(),
    heroImage: HeroImageSchema.nullable().optional(),
    blogContent: BlogContentSchema.nullable().optional(),
    tags: z.array(z.string()).nullable().optional(),
  }),
});

export const collections = { thoughts };
