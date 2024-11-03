
// import { env } from '@/env.mjs'
import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  
  export const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    7
  ) // 7-character random string
  


export function createChunkDecoder() {
    const decoder = new TextDecoder()
    return function (chunk: Uint8Array | undefined): string {
      if (!chunk) return ''
      return decoder.decode(chunk, { stream: true })
    }
  }
  