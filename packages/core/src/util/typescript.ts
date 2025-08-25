/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
export class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`)
    }
}

export function assertEmpty(obj: Record<string, never>, throwError = true) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { 'data-test': dataTest, ...rest } = obj // exclude data-test

    if (Object.keys(rest).length > 0 && throwError) {
        throw new Error('Object must be empty ' + JSON.stringify(obj))
    }
}

// TODO: change for built-in version of typescript 5.4 after upgrade
export type NoInfer<T> = [T][T extends any ? 0 : never]
