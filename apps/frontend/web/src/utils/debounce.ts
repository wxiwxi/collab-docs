/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
/**
 * 防抖函数
 * @param func
 * @param wait
 * @returns
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, wait = 300) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>): Promise<ReturnType<T>> =>
        new Promise(resolve => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                resolve(func(...args))
            }, wait)
        })
}
