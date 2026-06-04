export const CLOUD_NAME = 'dpepcbdfv';
export const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;

/**
 * Dynamically fetches the list of images associated with a tag from Cloudinary.
 * This requires the "Resource list" setting to be enabled in Cloudinary's Security settings.
 */
export async function fetchImageSequence(tag: string): Promise<string[]> {
  try {
    // Attempt to fetch the client-side asset list for the specific tag
    const response = await fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`);
    
    if (!response.ok) {
      throw new Error(`Cloudinary list API returned ${response.status} for tag: ${tag}`);
    }

    const data = await response.json();
    
    // Sort resources by public_id to ensure they are in the correct sequence (frame_000, frame_001, etc.)
    return data.resources
      .sort((a: any, b: any) => a.public_id.localeCompare(b.public_id))
      .map((res: any) => `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${res.version}/${res.public_id}.${res.format}`);
  } catch (error) {
    console.warn(`Could not fetch dynamic image list for tag ${tag}:`, error);
    return [];
  }
}
