// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { notionLoader, notionPageSchema } from "notion-astro-loader";
import {
  transformedPropertySchema,
  propertySchema,
} from "notion-astro-loader/schemas";

const thoughts = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.NOTION_TOKEN,
    database_id: import.meta.env.NOTION_DATABASE_ID,
    // Use Notion sorting and filtering
    filter: {
      property: "draft",
      checkbox: { equals: false },
    },
  }),
  schema: notionPageSchema({
    properties: z.object({
      Name: transformedPropertySchema.title,
      Draft: transformedPropertySchema.checkbox.optional(),
      Created: transformedPropertySchema.created_time.optional(),
      URL: transformedPropertySchema.rich_text.optional(),
      "Short name": transformedPropertySchema.rich_text.optional(),
      "Last visited": propertySchema.date
        .optional()
        .transform((property) =>
          property?.date?.start ? new Date(property.date.start) : undefined
        ),
      Featured: transformedPropertySchema.checkbox.optional(),
    }),
  }),
});

export const collections = { thoughts };
