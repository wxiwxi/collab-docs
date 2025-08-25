/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Ensures that `bn-` prefixed Tailwind classes are recognized as Tailwind
// classes, so they can be merged correctly.
const twMerge = extendTailwindMerge({
    prefix: 'bn-',
})

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
