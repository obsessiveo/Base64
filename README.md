# Base 64

A simple Base64 library create as a programming excersise.

> There are many much better libraries out there, so use this only if would like to play with the code.

## Features

- Written in Typescript
- Can decode and encode string from/to Base64.

## Installation

```bash
npm i @obsessiveo/base64
```

## Usage

### Base64

### To encode a string use
```javascript
const s = base64Encode(text);
```
This will encode `text` to a Base64 string and adds padding (`=`) if needed. It is assumed `text` is in UTF-8 format.

```javascript
// for example
const s = base64Encode('Hello World');
```
> results in `SGVsbG8gV29ybGQ=`

### To decode a Base64 string use
```javascript
const s = base64Decode('text');
```
This will decode `text` Base64 string

```javascript
// for example
const s = base64Decode('SGFwcHkgZmFjZQ==');
```
> results in `Happy face`
## References