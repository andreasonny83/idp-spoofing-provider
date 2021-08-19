import { randomBytes } from 'crypto';

export const normalizeString = (document: string): string => {
  const regex = />(\s*)</g;

  return document
    .replace(/\r\n/g, '') // Windows specific
    .replace(/\n/g, '') // Unix specific
    .replace(regex, '><') // Remove indent
    .trim(); // Remove white spaces
};

export const generateRandomHexString = (): string => randomBytes(16).toString('hex');
