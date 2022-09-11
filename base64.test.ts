/*
Copyright (c) 2022 Obsessiveo
*/

import { base64Encode } from './base64';

describe('Base64 ecoding and decoding', () => {
  it('should encode a string', () => {
    const str = 'I like to ride my bicycle';
    const encoded = base64Encode(str);
    expect(encoded).toBe('SSBsaWtlIHRvIHJpZGUgbXkgYmljeWNsZQ==');
  });
});
