/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
export function elementOverflow(element: HTMLElement, container: HTMLElement) {
    const elementRect = element.getBoundingClientRect()
    const parentRect = container.getBoundingClientRect()

    const topOverflow = elementRect.top < parentRect.top
    const bottomOverflow = elementRect.bottom > parentRect.bottom

    return topOverflow && bottomOverflow ? 'both' : topOverflow ? 'top' : bottomOverflow ? 'bottom' : 'none'
}
