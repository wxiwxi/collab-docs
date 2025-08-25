/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
export interface EventSourceOptions {
    url: string
}

export interface EventSourceState<T> {
    data: T | null
    error: Error | null
    isLoading: boolean
}
