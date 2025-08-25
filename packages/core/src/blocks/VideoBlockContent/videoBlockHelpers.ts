/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
export const parseVideoElement = (videoElement: HTMLVideoElement) => {
    const url = videoElement.src || undefined
    const previewWidth = videoElement.width || undefined

    return { url, previewWidth }
}
