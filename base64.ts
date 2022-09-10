import { base64AddPadding } from './base64.common';
import { Base64AlphabetURLLookup, Base64PadChar } from './base64.const';

function encode(str: string, alphabet: Uint8Array): string {
  return Buffer.from(str).toString('base64');
}

function decode(str: string, alphabet: Uint8Array): string {
  // assuming padding has been added. I.e. str.length % 4 === 0
  let retval = '';
  const len = str.length;

  // ok, we have a multiple of 4 characters. Let's decode.
  for (let i = 0; i < len; i += 4) {
    const a = alphabet[str.charCodeAt(i)];
    const b = alphabet[str.charCodeAt(i + 1)];
    const c = alphabet[str.charCodeAt(i + 2)];
    const d = alphabet[str.charCodeAt(i + 3)];
    let byte = 0;

    // the first last 6 bits of a and the first 2 bits of b
    byte = (a << 2) | (b >>> 4);
    retval += String.fromCharCode(byte);

    // the last 4 bits of b and the first 4 bits of c
    if (c !== Base64PadChar) {
      // if c is not padding
      byte = ((b & 0x0f) << 4) | (c >>> 2);
      retval += String.fromCharCode(byte);
    }

    // the last 2 bits of c and all 6 bits of d
    if (d !== 64) {
      // if d is not padding
      byte = ((c & 0x03) << 6) | d;
      retval += String.fromCharCode(byte);
    }
  }

  retval = decodeURIComponent(retval);
  return retval;
}

function base64UrlEncode(str: string): string {
  return '';
}

function base64UrlDecode(str: string): string {
  const inputStr = base64AddPadding(str);
  const retVal = decode(inputStr, Base64AlphabetURLLookup);
  return retVal;
}
