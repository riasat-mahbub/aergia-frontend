import { GOOGLE_FONTS } from '@/constants/googleFonts';

export const generateGoogleFontsUrl = (): string => {
  const fontParams = GOOGLE_FONTS.map(font => {
    const fontName = font.replace(/\s+/g, '+');
    return `family=${fontName}:wght@400;600;700`;
  }).join('&');
  
  return `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;
};