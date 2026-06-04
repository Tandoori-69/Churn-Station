'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating creative and enticing
 * ice cream flavor descriptions and pairing suggestions for Churn Station.
 *
 * - generateFlavorDescription - A function that generates flavor descriptions and pairings.
 * - GenerateFlavorDescriptionInput - The input type for the generateFlavorDescription function.
 * - GenerateFlavorDescriptionOutput - The return type for the generateFlavorDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlavorDescriptionInputSchema = z.object({
  flavorName: z.string().describe('The name of the ice cream flavor.'),
  keyIngredients: z
    .array(z.string())
    .describe('A list of key ingredients in the ice cream flavor.'),
  inspiration: z
    .string()
    .optional()
    .describe(
      'Optional: Any specific inspiration or theme for the flavor (e.g., a season, a cultural reference).'
    ),
});
export type GenerateFlavorDescriptionInput = z.infer<
  typeof GenerateFlavorDescriptionInputSchema
>;

const GenerateFlavorDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A creative and enticing description of the ice cream flavor.'),
  pairingSuggestions: z
    .array(z.string())
    .describe(
      'A list of suggested food or beverage pairings that complement the flavor.'
    ),
});
export type GenerateFlavorDescriptionOutput = z.infer<
  typeof GenerateFlavorDescriptionOutputSchema
>;

export async function generateFlavorDescription(
  input: GenerateFlavorDescriptionInput
): Promise<GenerateFlavorDescriptionOutput> {
  return generateFlavorDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlavorDescriptionPrompt',
  input: {schema: GenerateFlavorDescriptionInputSchema},
  output: {schema: GenerateFlavorDescriptionOutputSchema},
  prompt: `You are a creative marketing expert for Churn Station, a premium Pakistani ice cream brand.
Your goal is to craft an enticing and evocative description for a new ice cream flavor, along with delightful pairing suggestions.
Focus on rich sensory details, the quality of ingredients, and the overall experience, reflecting the brand's Pakistani heritage where appropriate.

Ice Cream Flavor Name: {{{flavorName}}}
Key Ingredients: {{#each keyIngredients}}- {{{this}}}
{{/each}}

{{#if inspiration}}
Inspiration/Theme: {{{inspiration}}}
{{/if}}

Craft a compelling description that makes the flavor irresistible. Then, suggest 2-3 creative pairings that would enhance the experience.
`,
});

const generateFlavorDescriptionFlow = ai.defineFlow(
  {
    name: 'generateFlavorDescriptionFlow',
    inputSchema: GenerateFlavorDescriptionInputSchema,
    outputSchema: GenerateFlavorDescriptionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
