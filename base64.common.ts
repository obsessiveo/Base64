/*
Copyright (c) 2022 Obsessiveo
*/

/**
 * Add padding to a base64 string.
 * @param str The base64 string to add padding to.
 * @returns The base64 string with padding.
 * @example
 * base64AddPadding('aGV'); // 'aGV='
 * base64AddPadding('aG'); // 'aG=='
 */
export function base64AddPadding(str: string): string {
  const mod = str.length & 0x03; // is this faster than % 4? 🤔 Who knows! This is more fun. 😎
  if (mod === 0) {
    return str;
  }
  return str + '===='.slice(mod);
}

/**
 * Remove padding from a base64 string.
 * @param str The base64 string to remove padding from.
 * @returns The base64 string without padding.
 * @example
 * base64RemovePadding('aGV='); // 'aGV'
 */
export function base64RemovePadding(str: string): string {
  return str.replace(/=+$/, '');
}
