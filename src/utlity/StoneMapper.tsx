// stoneMapping.tsx
import BlueSapphire from '@/assets/Stones/BlueSapphire.jpg';
import CatsEye from '@/assets/Stones/CatsEye.png';
import Emerald from '@/assets/Stones/Emerald.jpg';
import Hessonite from '@/assets/Stones/Hessonite.png';
import Opal from '@/assets/Stones/Opal.png';
import Pearl from '@/assets/Stones/Pearl.png';
import RedCoral from '@/assets/Stones/Red_Coral.png';
import Ruby from '@/assets/Stones/Ruby.png';
import YellowSapphire from '@/assets/Stones/YellowSapphire.png';
export interface StoneInfo {
  englishName: string;
  hindiName?: string;
  image: string;
  productUrl: string;
}

// Mapping of English stone names to their info
export const STONE_MAPPING: Record<string, StoneInfo> = {
  'Ruby': {
    englishName: 'Ruby',
    image: Ruby,
    productUrl: '/gemstone/ruby',
  },
  'Pearl': {
    englishName: 'Pearl',
    image: Pearl,
    productUrl: '/gemstone/pearl',
  },
  'Opal':{
    englishName: 'Opal',
    image: Opal,
    productUrl: '/gemstone/opal',
  },
  'Red Coral': {
    englishName: 'Red Coral',
    image: RedCoral,
    productUrl: '/gemstone/red-coral',
  },
  'Coral': {
    englishName: 'Red Coral',
    image: RedCoral,
    productUrl: '/gemstone/red-coral',
  },
  'Emerald': {
    englishName: 'Emerald',
    image: Emerald,
    productUrl: '/gemstone/emerald',
  },
  'Yellow Sapphire': {
    englishName: 'Yellow Sapphire',
    image: YellowSapphire,
    productUrl: '/gemstone/yellow-sapphire',
  },
  'Blue Sapphire': {
    englishName: 'Blue Sapphire',
    image: BlueSapphire,
    productUrl: '/gemstone/blue-sapphire',
  },
  'Hessonite': {
    englishName: 'Hessonite',
    image: Hessonite,
    productUrl: '/gemstone/hessonite',
  },
  'Gomed': {
    englishName: 'Hessonite',
    image: Hessonite,
    productUrl: '/gemstone/hessonite',
  },
  "Cat's Eye": {
    englishName: "Cat's Eye",
    image: CatsEye,
    productUrl: '/gemstone/cats-eye',
  },
  'Cats Eye': {
    englishName: "Cat's Eye",
    image: CatsEye,
    productUrl: '/gemstone/cats-eye',
  },
};

/**
 * Get stone info by English name
 * @param stoneName - Stone name from API (format: "English_name (Hindi_name)" or just "English_name")
 * @returns StoneInfo object or undefined if not found
 */
export const getStoneInfo = (stoneName: string): StoneInfo | undefined => {
  // Extract English name from format "English_name (Hindi_name)"
  const englishName = stoneName.split('(')[0].trim();
  
  // Try direct match first
  if (STONE_MAPPING[englishName]) {
    const info = STONE_MAPPING[englishName];
    // Extract Hindi name if present
    const hindiMatch = stoneName.match(/\((.*?)\)/);
    return {
      ...info,
      hindiName: hindiMatch ? hindiMatch[1] : undefined,
    };
  }
  
  // Try case-insensitive match
  const lowerName = englishName.toLowerCase();
  const matchedKey = Object.keys(STONE_MAPPING).find(
    key => key.toLowerCase() === lowerName
  );
  
  if (matchedKey) {
    const info = STONE_MAPPING[matchedKey];
    const hindiMatch = stoneName.match(/\((.*?)\)/);
    return {
      ...info,
      hindiName: hindiMatch ? hindiMatch[1] : undefined,
    };
  }
  
  return undefined;
};

/**
 * Get all available stone names
 */
export const getAvailableStones = (): string[] => {
  return Object.keys(STONE_MAPPING);
};