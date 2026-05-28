const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]

function ascii(buffer: Buffer, start: number, end: number) {
  return buffer.subarray(start, end).toString('ascii')
}

export function hasValidImageSignature(buffer: Buffer, mimeType: string) {
  if (buffer.length < 12) return false

  if (mimeType === 'image/jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  }

  if (mimeType === 'image/png') {
    return PNG_SIGNATURE.every((byte, index) => buffer[index] === byte)
  }

  if (mimeType === 'image/webp') {
    return ascii(buffer, 0, 4) === 'RIFF' && ascii(buffer, 8, 12) === 'WEBP'
  }

  if (mimeType === 'image/avif') {
    if (ascii(buffer, 4, 8) !== 'ftyp') return false
    const brandArea = ascii(buffer, 8, Math.min(buffer.length, 32))
    return brandArea.includes('avif') || brandArea.includes('avis')
  }

  return false
}
