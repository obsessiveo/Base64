/*
Copyright (c) 2022 Obsessiveo
*/

import { base64Decode, base64Encode, base64UrlDecode, base64UrlEncode } from './base64';

const cases = [
  {
    input: 'Hello World',
    output: 'SGVsbG8gV29ybGQ=',
    outopt: 'SGVsbG8gV29ybGQ',
  },
  {
    input: 'Hello World!',
    output: 'SGVsbG8gV29ybGQh',
    outopt: 'SGVsbG8gV29ybGQh',
  },
  {
    input: 'Hello World!!',
    output: 'SGVsbG8gV29ybGQhIQ==',
    outopt: 'SGVsbG8gV29ybGQhIQ',
  },
  {
    input: 'Hello World!!!',
    output: 'SGVsbG8gV29ybGQhISE=',
    outopt: 'SGVsbG8gV29ybGQhISE',
  },
  {
    input: 'Hello World!!!!',
    output: 'SGVsbG8gV29ybGQhISEh',
    outopt: 'SGVsbG8gV29ybGQhISEh',
  },
  {
    input: 'Happy face',
    output: 'SGFwcHkgZmFjZQ==',
    outopt: 'SGFwcHkgZmFjZQ',
  },
];

describe('Base64 ecoding', () => {
  test.each(cases)('encode Base64 and Base64Url', ({ input, output, outopt }) => {
    expect(base64Encode(input)).toBe(output);
    expect(base64UrlEncode(input)).toBe(outopt);
  });
});

describe('Base64 decoding', () => {
  test.each(cases)('decode Base64 and Base64Url', ({ input, output, outopt }) => {
    expect(base64Decode(output)).toBe(input);
    expect(base64UrlDecode(outopt)).toBe(input);
  });
});
