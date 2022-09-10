import { base64AddPadding } from './base64.common';
import { Base64AlphabetURLLookup, Base64PadChar } from './base64.const';

function encode(str: string, alphabet: Uint8Array): string {
  let retVal = '';

  const mod = str.length % 3; // 1
  const len = str.length - mod; // 4

  for (let i = 0; i < len; i += 3) {
    const byte1 = str.charCodeAt(i);
    const byte2 = str.charCodeAt(i + 1);
    const byte3 = str.charCodeAt(i + 2);

    const a = byte1 >>> 2;
    const b = ((byte1 & 0x03) << 4) | (byte2 >>> 4);
    const c = ((byte2 & 0x0f) << 2) | (byte3 >>> 6);
    const d = byte3 & 0x3f;

    retVal += String.fromCharCode(alphabet[a], alphabet[b], alphabet[c], alphabet[d]);
  }

  if (mod === 1) {
    const byte1 = str.charCodeAt(len);
    const a = byte1 >>> 2;
    const b = (byte1 & 0x03) << 4;

    retVal += String.fromCharCode(alphabet[a], alphabet[b], Base64PadChar, Base64PadChar);
  } else if (mod === 2) {
    const byte1 = str.charCodeAt(len);

    const byte2 = str.charCodeAt(len + 1);
    const a = byte1 >>> 2;

    const b = ((byte1 & 0x03) << 4) | (byte2 >>> 4);
    const c = (byte2 & 0x0f) << 2;

    retVal += String.fromCharCode(alphabet[a], alphabet[b], alphabet[c], Base64PadChar);
  }

  return retVal;
}

function decode(str: string, alphabet: Uint8Array): string {
  let retval = '';
  const len = str.length;

  for (let i = 0; i < len - 3; i += 4) {
    const a = alphabet[str.charCodeAt(i)];
    const b = alphabet[str.charCodeAt(i + 1)];
    const c = alphabet[str.charCodeAt(i + 2)];
    const d = alphabet[str.charCodeAt(i + 3)];

    // the first last 6 bits of a and the first 2 bits of b
    let byte = (a << 2) | (b >>> 4);
    retval += String.fromCharCode(byte);

    // the last 4 bits of b and the first 4 bits of c
    if (str.charCodeAt(i + 2) !== Base64PadChar) {
      byte = ((b & 0x0f) << 4) | (c >>> 2);
      retval += String.fromCharCode(byte);
    }

    // the last 2 bits of c and all 6 bits of d
    if (str.charCodeAt(i + 3) !== Base64PadChar) {
      byte = ((c & 0x03) << 6) | d;
      retval += String.fromCharCode(byte);
    }
  }

  retval = decodeURIComponent(retval);
  return retval;
}

export function base64Encode(str: string): string {
  return encode(str, Base64AlphabetURLLookup);
}

export function base64Decode(str: string): string {
  return decode(str, Base64AlphabetURLLookup);
}

export function base64UrlEncode(str: string): string {
  const retVal = encode(str, Base64AlphabetURLLookup);
  return retVal;
}

export function base64UrlDecode(str: string): string {
  const retVal = decode(str, Base64AlphabetURLLookup);
  return retVal;
}
