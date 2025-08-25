/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
export const parseImageElement = (imageElement: HTMLImageElement) => {
    const url = imageElement.src || undefined
    const previewWidth = imageElement.width || undefined

    return { url, previewWidth }
}
