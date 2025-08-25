/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
import { assertEmpty } from '@wangx-doc/core'
import { ComponentProps } from '@wangx-doc/react'
import { forwardRef } from 'react'

import { cn } from '../lib/utils'

export const SuggestionMenuLabel = forwardRef<HTMLDivElement, ComponentProps['SuggestionMenu']['Label']>((props, ref) => {
    const { className, children, ...rest } = props

    assertEmpty(rest)

    return (
        <div
            // Styles from ShadCN DropdownMenuLabel component
            className={cn('bn-px-2 bn-py-1.5 bn-text-sm bn-font-semibold', className)}
            ref={ref}
        >
            {children}
        </div>
    )
})
