/*
Copyright (c) 2022 Obsessiveo
*/

import {
  Base64Alphabet,
  Base64AlphabetLookup,
  Base64AlphabetURL,
  Base64AlphabetURLLookup,
  Base64PadChar,
  Base64PadCharCode,
} from './base64.const';

function encode(str: string, alphabet: string): string {
  let retVal = '';

  const mod = str.length % 3;
  const len = str.length - mod;

  for (let i = 0; i < len; i += 3) {
    const byte1 = str.charCodeAt(i);
    const byte2 = str.charCodeAt(i + 1);
    const byte3 = str.charCodeAt(i + 2);

    const a = byte1 >>> 2;
    const b = ((byte1 & 0x03) << 4) | (byte2 >>> 4);
    const c = ((byte2 & 0x0f) << 2) | (byte3 >>> 6);
    const d = byte3 & 0x3f;

    const char1 = alphabet[a];
    const char2 = alphabet[b];
    const char3 = alphabet[c];
    const char4 = alphabet[d];

    retVal += char1 + char2 + char3 + char4;
  }

  if (mod === 1) {
    const byte1 = str.charCodeAt(len);
    const a = byte1 >>> 2;
    const b = (byte1 & 0x03) << 4;
    const char1 = alphabet[a];
    const char2 = alphabet[b];
    retVal += char1 + char2 + Base64PadChar + Base64PadChar;
  } else if (mod === 2) {
    const byte1 = str.charCodeAt(len);
    const byte2 = str.charCodeAt(len + 1);
    const a = byte1 >>> 2;
    const b = ((byte1 & 0x03) << 4) | (byte2 >>> 4);
    const c = (byte2 & 0x0f) << 2;

    const char1 = alphabet[a];
    const char2 = alphabet[b];
    const char3 = alphabet[c];
    retVal += char1 + char2 + char3 + Base64PadChar;
  }

  return retVal;
}

function decode(str: string, lookupTable: Uint8Array): string {
  let retval = '';
  const len = str.length;

  for (let i = 0; i < len - 3; i += 4) {
    const a = lookupTable[str.charCodeAt(i)];
    const b = lookupTable[str.charCodeAt(i + 1)];
    const c = lookupTable[str.charCodeAt(i + 2)];
    const d = lookupTable[str.charCodeAt(i + 3)];

    // the first last 6 bits of a and the first 2 bits of b
    let byte = (a << 2) | (b >>> 4);
    retval += String.fromCharCode(byte);

    // the last 4 bits of b and the first 4 bits of c
    if (str.charCodeAt(i + 2) !== Base64PadCharCode) {
      byte = ((b & 0x0f) << 4) | (c >>> 2);
      retval += String.fromCharCode(byte);
    }

    // the last 2 bits of c and all 6 bits of d
    if (str.charCodeAt(i + 3) !== Base64PadCharCode) {
      byte = ((c & 0x03) << 6) | d;
      retval += String.fromCharCode(byte);
    }
  }

  retval = decodeURIComponent(retval);
  return retval;
}

export function base64Encode(str: string): string {
  return encode(str, Base64Alphabet);
}

export function base64Decode(str: string): string {
  return decode(str, Base64AlphabetLookup);
}

export function base64UrlEncode(str: string): string {
  return encode(str, Base64AlphabetURL);
}

export function base64UrlDecode(str: string): string {
  return decode(str, Base64AlphabetURLLookup);
}
